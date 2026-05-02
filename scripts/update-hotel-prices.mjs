import fs from "node:fs/promises";
import vm from "node:vm";

const TIMEOUT_MS = 12000;
const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36";

const args = new Set(process.argv.slice(2));
const noFetch = args.has("--no-fetch");
const limitArg = process.argv.find((arg) => arg.startsWith("--limit="));
const limit = limitArg ? Number(limitArg.split("=")[1]) : Infinity;

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function loadTripData() {
  const source = await fs.readFile("data.js", "utf8");
  const context = {};
  return vm.runInNewContext(source + "\ntripData;", context, { timeout: 1000 });
}

function getPriceSettings(tripData) {
  return {
    checkIn: tripData.priceSearch?.checkIn || "2026-06-21",
    checkOut: tripData.priceSearch?.checkOut || "2026-06-22",
    adults: tripData.priceSearch?.adults || 2,
    rooms: tripData.priceSearch?.rooms || 1
  };
}

function buildSources(hotel, settings) {
  const query = encodeURIComponent(hotel.name + " Kuala Lumpur");
  const { checkIn, checkOut, adults, rooms } = settings;

  return [
    {
      source: "Google Hotels",
      url: `https://www.google.com/travel/hotels?q=${query}&checkin=${checkIn}&checkout=${checkOut}&adults=${adults}`
    },
    {
      source: "Booking.com",
      url: `https://www.booking.com/searchresults.html?ss=${query}&checkin=${checkIn}&checkout=${checkOut}&group_adults=${adults}&no_rooms=${rooms}&group_children=0`
    },
    {
      source: "Agoda",
      url: `https://www.agoda.com/search?textToSearch=${query}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&rooms=${rooms}`
    },
    {
      source: "Trip.com",
      url: `https://www.trip.com/hotels/list?city=315&searchword=${query}&checkin=${checkIn}&checkout=${checkOut}&adults=${adults}&rooms=${rooms}`
    }
  ];
}

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x2F;/g, "/")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function stripHtml(html) {
  return decodeEntities(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hotelNameAppears(text, hotelName) {
  const normalized = text.toLowerCase();
  const terms = hotelName
    .toLowerCase()
    .replace(/\b(kuala lumpur|klcc|kl)\b/g, "")
    .split(/[^a-z0-9]+/)
    .filter((term) => term.length >= 3);

  if (!terms.length) return false;
  return terms.every((term) => normalized.includes(term));
}

function extractPrices(text) {
  const patterns = [
    /\b(SGD|MYR|RM|S\$)\s*([0-9][0-9,.]*)/gi,
    /\b([0-9][0-9,.]*)\s*(SGD|MYR|RM)\b/gi
  ];
  const prices = [];

  patterns.forEach((pattern) => {
    for (const match of text.matchAll(pattern)) {
      const currencyRaw = Number.isNaN(Number(match[1].replace(/,/g, ""))) ? match[1] : match[2];
      const amountRaw = Number.isNaN(Number(match[1].replace(/,/g, ""))) ? match[2] : match[1];
      const amount = Number(amountRaw.replace(/,/g, ""));
      if (!Number.isFinite(amount) || amount < 80 || amount > 8000) continue;

      const currency = currencyRaw.toUpperCase().replace("S$", "SGD").replace("RM", "MYR");
      prices.push({ currency, amount });
    }
  });

  return prices;
}

async function fetchText(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "user-agent": USER_AGENT,
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "accept-language": "en-SG,en;q=0.9"
      }
    });
    return { ok: response.ok, status: response.status, text: await response.text() };
  } finally {
    clearTimeout(timer);
  }
}

async function scrapeSource(hotel, sourceConfig) {
  if (noFetch) {
    return { ...sourceConfig, status: "not-run" };
  }

  try {
    const response = await fetchText(sourceConfig.url);
    if (!response.ok) {
      return { ...sourceConfig, status: "http-" + response.status };
    }

    const text = stripHtml(response.text);
    const hasHotelName = hotelNameAppears(text, hotel.name);
    const prices = hasHotelName ? extractPrices(text) : [];
    const best = prices.sort((a, b) => a.amount - b.amount)[0];

    if (!best) {
      return { ...sourceConfig, status: hasHotelName ? "no-price-found" : "hotel-not-found" };
    }

    return {
      ...sourceConfig,
      status: "ok",
      currency: best.currency,
      amount: best.amount,
      confidence: "low"
    };
  } catch (error) {
    return { ...sourceConfig, status: error.name === "AbortError" ? "timeout" : "error" };
  }
}

function sortOffers(offers) {
  return offers.sort((a, b) => {
    if (a.currency === b.currency) return a.amount - b.amount;
    return a.currency.localeCompare(b.currency);
  });
}

async function main() {
  const tripData = await loadTripData();
  const settings = getPriceSettings(tripData);
  const hotels = tripData.hotels.slice(0, limit);
  const snapshot = {
    generatedAt: noFetch ? null : new Date().toISOString(),
    checkIn: settings.checkIn,
    checkOut: settings.checkOut,
    adults: settings.adults,
    rooms: settings.rooms,
    status: noFetch ? "not-run" : "complete",
    hotels: {}
  };

  for (const hotel of hotels) {
    const key = hotel.priceKey || slugify(hotel.name);
    const sources = buildSources(hotel, settings);
    const checkedSources = [];

    for (const source of sources) {
      checkedSources.push(await scrapeSource(hotel, source));
    }

    const offers = sortOffers(checkedSources
      .filter((source) => source.status === "ok")
      .map((source) => ({
        source: source.source,
        currency: source.currency,
        amount: source.amount,
        confidence: source.confidence,
        url: source.url
      })));

    snapshot.hotels[key] = {
      name: hotel.name,
      status: offers.length ? "priced" : "unavailable",
      best: offers[0] || null,
      offers,
      sources: checkedSources
    };
  }

  await fs.writeFile("hotel-prices.json", JSON.stringify(snapshot, null, 2) + "\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
