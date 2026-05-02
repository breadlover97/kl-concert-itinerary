function joinTitle(lines) {
  return lines.join("<br>");
}

function renderTags(tags) {
  if (!tags || !tags.length) return "";
  return `<div class="tags">${tags.map((tag) => `<span class="tag tag-${tag.type}">${tag.label}</span>`).join("")}</div>`;
}

function renderLink(link) {
  if (!link) return "";
  return `<a class="event-link" href="${link.url}" target="_blank" rel="noopener">${link.label}</a>`;
}

function renderRoute(route) {
  return route.map((stop, index) => {
    const arrow = index < route.length - 1 ? "<span>&rarr;</span>" : "";
    return `<span class="route-stop">${stop}</span>${arrow}`;
  }).join("");
}

function getHotelKey(hotel) {
  return hotel.priceKey || hotel.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function getHotelPriceSearchLinks(hotel) {
  const query = encodeURIComponent(hotel.name + " Kuala Lumpur");
  const checkIn = tripData.priceSearch.checkIn;
  const checkOut = tripData.priceSearch.checkOut;
  const adults = tripData.priceSearch.adults;
  const rooms = tripData.priceSearch.rooms;

  return [
    {
      label: "Booking",
      url: `https://www.booking.com/searchresults.html?ss=${query}&checkin=${checkIn}&checkout=${checkOut}&group_adults=${adults}&no_rooms=${rooms}&group_children=0`
    },
    {
      label: "Agoda",
      url: `https://www.agoda.com/search?textToSearch=${query}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&rooms=${rooms}`
    },
    {
      label: "Trip.com",
      url: `https://www.trip.com/hotels/list?city=315&searchword=${query}&checkin=${checkIn}&checkout=${checkOut}&adults=${adults}&rooms=${rooms}`
    },
    {
      label: "Expedia",
      url: `https://www.expedia.com/Hotel-Search?destination=${query}&startDate=${checkIn}&endDate=${checkOut}&rooms=${rooms}&adults=${adults}`
    }
  ];
}

function renderHotelPriceShell(hotel) {
  const key = getHotelKey(hotel);
  const links = getHotelPriceSearchLinks(hotel).map((link) => (
    `<a href="${link.url}" target="_blank" rel="noopener">${link.label}</a>`
  )).join("");

  return `
    <div class="hotel-price" data-hotel-key="${key}">
      <div class="price-main">Checking cached rates</div>
      <div class="price-meta">21-22 Jun 2026 / 2 adults</div>
      <div class="price-sources">${links}</div>
    </div>
  `;
}

function renderTimelineItem(item) {
  if (item.type === "travel") {
    return `<div class="travel-row"><span class="travel-pill">${item.pill}</span><span>${item.text}</span></div>`;
  }

  if (item.type === "note") {
    return `<div class="note-box note-${item.noteType}">${item.text}</div>`;
  }

  return `
    <article class="event ${item.category}">
      <div class="event-time">${item.time}</div>
      <div>
        <div class="event-name">${item.name}</div>
        ${renderLink(item.link)}
        ${renderTags(item.tags)}
        <p class="event-note">${item.note}</p>
      </div>
    </article>
  `;
}

function renderDay(day) {
  return `
    <section class="day-block">
      <div class="day-index">
        <div class="day-number">${day.number}</div>
        <div class="day-date">${day.date}</div>
      </div>
      <div>
        <h2 class="day-title">${day.title}</h2>
        <div class="route-bar">${renderRoute(day.route)}</div>
        <div class="timeline">${day.items.map(renderTimelineItem).join("")}</div>
      </div>
    </section>
  `;
}

function renderHotel(hotel) {
  const classes = hotel.recommended ? "hotel-card recommended" : "hotel-card";
  return `
    <article class="${classes}">
      <div class="mini-meta">${hotel.tags.map((tag) => `<span class="chip">${tag}</span>`).join("")}</div>
      <h3>${hotel.name}</h3>
      <p>${hotel.description}</p>
      <p>${hotel.meta}</p>
      ${renderHotelPriceShell(hotel)}
      <a href="${hotel.url}" target="_blank" rel="noopener">Open map</a>
    </article>
  `;
}

function renderPackingSection(section) {
  return `
    <section class="pack-section">
      <h3>${section.title}</h3>
      <div class="pack-items">
        ${section.items.map((item) => `
          <button class="pack-item" type="button" aria-pressed="false">
            <div class="pack-box"><span>&check;</span></div>
            <div class="pack-text">${item}</div>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function setActiveSection(id) {
  document.querySelectorAll(".tab-btn").forEach((button) => {
    const isActive = button.dataset.section === id;
    button.classList.remove("active");
    button.setAttribute("aria-current", "false");
    if (isActive) {
      button.classList.add("active");
      button.setAttribute("aria-current", "true");
    }
  });
}

function scrollToSection(id) {
  const section = document.getElementById("section-" + id);
  const navHeight = document.querySelector(".tab-nav").offsetHeight;
  const top = window.scrollY + section.getBoundingClientRect().top - navHeight;

  window.scrollTo({ top, behavior: "smooth" });
  setActiveSection(id);
}

function updateActiveSectionFromScroll() {
  const sections = Array.from(document.querySelectorAll(".scroll-section"));
  const focusLine = window.innerHeight * 0.38;
  let activeId = sections[0]?.id.replace("section-", "");
  let closestDistance = Infinity;

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= focusLine && rect.bottom > focusLine) {
      activeId = section.id.replace("section-", "");
      closestDistance = 0;
      return;
    }

    const distance = Math.abs(rect.top - focusLine);
    if (distance < closestDistance || (index === sections.length - 1 && rect.top < focusLine)) {
      closestDistance = distance;
      activeId = section.id.replace("section-", "");
    }
  });

  setActiveSection(activeId);
}

let scrollSpyFrame = null;
let scrollSpyTimer = null;

function scheduleActiveSectionUpdate() {
  clearTimeout(scrollSpyTimer);
  scrollSpyTimer = setTimeout(updateActiveSectionFromScroll, 140);

  if (scrollSpyFrame) return;
  scrollSpyFrame = requestAnimationFrame(() => {
    scrollSpyFrame = null;
    updateActiveSectionFromScroll();
  });
}

function updatePacking() {
  const all = document.querySelectorAll(".pack-item");
  const done = document.querySelectorAll(".pack-item.checked");
  const pct = all.length ? Math.round(done.length / all.length * 100) : 0;
  document.getElementById("packBar").style.width = pct + "%";
  document.getElementById("packLabel").textContent = done.length + " of " + all.length + " packed";
}

function resetPacking() {
  document.querySelectorAll(".pack-item").forEach((item) => {
    item.classList.remove("checked");
    item.setAttribute("aria-pressed", "false");
  });
  updatePacking();
}

function formatPrice(value) {
  return new Intl.NumberFormat("en-SG", { maximumFractionDigits: 0 }).format(value);
}

function formatUpdatedAt(value) {
  if (!value) return "Not checked yet";
  return new Intl.DateTimeFormat("en-SG", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function renderPriceContent(priceData, snapshot) {
  const offers = priceData?.offers || [];
  const best = priceData?.best || offers[0];

  if (best) {
    const sourceText = offers.slice(0, 3).map((offer) => offer.source).join(" / ");
    return `
      <div class="price-main">From ${best.currency} ${formatPrice(best.amount)}</div>
      <div class="price-meta">${sourceText || "Cached scrape"} / checked ${formatUpdatedAt(snapshot.generatedAt)}</div>
      <div class="price-caveat">Snapshot only. Confirm final taxes and room terms on the booking site.</div>
    `;
  }

  if (snapshot?.generatedAt) {
    return `
      <div class="price-main muted-price">No cached price found</div>
      <div class="price-meta">Checked ${formatUpdatedAt(snapshot.generatedAt)} / use source links below</div>
    `;
  }

  return `
    <div class="price-main muted-price">No cached price yet</div>
    <div class="price-meta">Run the hotel price workflow or use source links below</div>
  `;
}

async function loadHotelPrices() {
  try {
    const response = await fetch("hotel-prices.json?ts=" + Date.now(), { cache: "no-store" });
    if (!response.ok) throw new Error("Price snapshot unavailable");
    const snapshot = await response.json();

    document.querySelectorAll(".hotel-price").forEach((node) => {
      const key = node.dataset.hotelKey;
      const sourceLinks = node.querySelector(".price-sources")?.outerHTML || "";
      node.innerHTML = renderPriceContent(snapshot.hotels?.[key], snapshot) + sourceLinks;
    });
  } catch (error) {
    document.querySelectorAll(".hotel-price").forEach((node) => {
      const sourceLinks = node.querySelector(".price-sources")?.outerHTML || "";
      node.innerHTML = `
        <div class="price-main muted-price">Price snapshot unavailable</div>
        <div class="price-meta">Use source links below to check live rates</div>
        ${sourceLinks}
      `;
    });
  }
}

function bindInteractions() {
  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.addEventListener("click", () => scrollToSection(button.dataset.section));
  });

  document.querySelectorAll(".pack-item").forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("checked");
      item.setAttribute("aria-pressed", item.classList.contains("checked") ? "true" : "false");
      updatePacking();
    });
  });

  document.getElementById("packReset").addEventListener("click", resetPacking);
  window.addEventListener("scroll", scheduleActiveSectionUpdate, { passive: true });
  window.addEventListener("resize", scheduleActiveSectionUpdate);
}

function renderPage() {
  document.getElementById("brandMark").textContent = tripData.brandMark;
  document.getElementById("brandName").textContent = tripData.brandName;
  document.getElementById("eventLink").textContent = tripData.eventLink.label;
  document.getElementById("eventLink").href = tripData.eventLink.url;
  document.getElementById("eyebrow").textContent = tripData.hero.eyebrow;
  document.getElementById("heroTitle").innerHTML = joinTitle(tripData.hero.titleLines);
  document.getElementById("heroCopy").textContent = tripData.hero.copy;
  document.getElementById("stats").innerHTML = tripData.hero.stats.map((stat) => (
    `<div class="stat"><span>${stat.label}</span><strong>${stat.value}</strong></div>`
  )).join("");
  document.getElementById("marqueeTrack").innerHTML = [...tripData.marquee, ...tripData.marquee]
    .map((item) => `<span>${item}</span>`)
    .join("");
  document.getElementById("legend").innerHTML = tripData.legend.map((item) => (
    `<div class="legend-item"><span class="pip" style="background:${item.color}"></span> ${item.label}</div>`
  )).join("");

  document.getElementById("dayOneContent").innerHTML = `
    <div class="section-kicker">Hotel shortlist / walking distance to Vox Live KL</div>
    <div class="hotel-grid">${tripData.hotels.map(renderHotel).join("")}</div>
    ${tripData.notes.map((note) => `<div class="note-box note-${note.type}">${note.text}</div>`).join("")}
    ${renderDay(tripData.days[0])}
  `;

  document.getElementById("dayTwoContent").innerHTML = `
    ${renderDay(tripData.days[1])}
    <div class="section-kicker">Before you leave / to book now</div>
    <div class="todo-grid">
      ${tripData.todos.map((todo) => `
        <article class="todo-card">
          <h3>${todo.title}</h3>
          <p>${todo.text}</p>
        </article>
      `).join("")}
    </div>
  `;

  document.getElementById("packingSections").innerHTML = tripData.packingSections
    .map(renderPackingSection)
    .join("");
  document.getElementById("footerText").textContent = tripData.footer;

  bindInteractions();
  updatePacking();
  updateActiveSectionFromScroll();
  loadHotelPrices();
}

document.addEventListener("DOMContentLoaded", renderPage);
