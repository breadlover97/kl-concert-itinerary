const tripData = {
  brandMark: "01",
  brandName: "KL concert run",
  eventLink: {
    label: "Event site",
    url: "https://www.ticketmelon.com/POST/luvsic-hex-kl"
  },
  priceSearch: {
    checkIn: "2026-06-21",
    checkOut: "2026-06-22",
    adults: 2,
    rooms: 1,
    displayCurrency: "SGD"
  },
  hero: {
    eyebrow: "Singapore to Kuala Lumpur / self-drive weekender",
    titleLines: ["KL", "Concert", "Run"],
    copy: "KL Speedrun: drive up, catch the concert, run in KLCC Park, eat well, drink good coffee, head home.",
    stats: [
      { label: "Dates", value: "Sun 21 Jun to Mon 22 Jun 2026" },
      { label: "Travellers", value: "Tai Zhi + Sherwin" },
      { label: "Base", value: "KLCC / Platinum Park" },
      { label: "Transport", value: "Self-drive from Singapore" }
    ]
  },
  marquee: [
    "drive early",
    "check in before show",
    "walk to Vox Live",
    "run KLCC Park",
    "brunch + coffee",
    "home late evening"
  ],
  legend: [
    { label: "Drive", color: "var(--blue)" },
    { label: "Food", color: "var(--amber)" },
    { label: "Coffee", color: "var(--pink)" },
    { label: "Concert", color: "var(--acid)" },
    { label: "Hotel", color: "var(--violet)" },
    { label: "Run", color: "var(--mint)" },
    { label: "Admin", color: "var(--paper)" },
    { label: "Watch-outs", color: "#ff8a65" }
  ],
  hotels: [
    {
      recommended: true,
      priceKey: "ascott-star-klcc",
      tags: ["Best fit", "Serviced apt", "~5-8 min walk"],
      name: "Ascott Star KLCC",
      description: "Strong match for the brief: serviced-apartment feel, KLCC location, easy post-concert walk, likely more comfortable for showering after the morning run.",
      meta: "Tel: +60 3 2705 8000",
      url: "https://maps.google.com/?q=Ascott+Star+KLCC+Kuala+Lumpur"
    },
    {
      priceKey: "four-seasons-kl",
      tags: ["Hotel", "~8-12 min walk"],
      name: "Four Seasons KL",
      description: "Premium and extremely convenient for KLCC Park, Suria KLCC, and a low-friction concert night. Usually pricier, but very smooth for a one-night trip.",
      meta: "Address: 145 Jalan Ampang",
      url: "https://maps.google.com/?q=Four+Seasons+Hotel+Kuala+Lumpur"
    },
    {
      priceKey: "ibis-klcc",
      tags: ["Value", "~10-15 min walk"],
      name: "ibis KLCC",
      description: "Practical city hotel option if you want to keep spend reasonable and stay close enough to walk or take a short Grab.",
      meta: "Tel: +60 3 2778 3333",
      url: "https://maps.google.com/?q=ibis+Kuala+Lumpur+City+Centre"
    },
    {
      priceKey: "element-kl",
      tags: ["Comfort", "~12-18 min walk"],
      name: "Element KL",
      description: "Good serviced-hotel style option near Ampang Park. Slightly further, but simple access to KLCC and easier than driving around concert traffic.",
      meta: "Address: Ilham Tower, Jalan Binjai",
      url: "https://maps.google.com/?q=Element+Kuala+Lumpur"
    },
    {
      priceKey: "w-kuala-lumpur",
      tags: ["Closest", "~3-6 min walk"],
      name: "W Kuala Lumpur",
      description: "Very close to Platinum Park and strong for a one-night concert stay. Good if you want the least friction after the show.",
      meta: "Address: 121 Jalan Ampang",
      url: "https://maps.google.com/?q=W+Kuala+Lumpur"
    },
    {
      priceKey: "intercontinental-kl",
      tags: ["Reliable", "~8-12 min walk"],
      name: "InterContinental KL",
      description: "Polished, business-hotel reliable, and close to Ampang Park. Good option if room rates are better than the luxury KLCC hotels.",
      meta: "Address: 165 Jalan Ampang",
      url: "https://maps.google.com/?q=InterContinental+Kuala+Lumpur"
    },
    {
      priceKey: "corus-hotel-kl",
      tags: ["Practical", "~10-14 min walk"],
      name: "Corus Hotel KL",
      description: "Older but convenient and often more affordable. Useful if the priority is location, parking, and getting to KLCC Park easily.",
      meta: "Address: Jalan Ampang",
      url: "https://maps.google.com/?q=Corus+Hotel+Kuala+Lumpur"
    },
    {
      priceKey: "traders-hotel-kl",
      tags: ["View", "~15-20 min walk"],
      name: "Traders Hotel KL",
      description: "Great KLCC Park access and skyline views. Slightly further from Vox Live, but the morning run logistics are excellent.",
      meta: "Address: Kuala Lumpur City Centre",
      url: "https://maps.google.com/?q=Traders+Hotel+Kuala+Lumpur"
    },
    {
      priceKey: "mandarin-oriental-kl",
      tags: ["Premium", "~12-16 min walk"],
      name: "Mandarin Oriental KL",
      description: "Classic premium pick beside KLCC Park. Expensive, but very comfortable for the shower-run-checkout rhythm.",
      meta: "Address: Kuala Lumpur City Centre",
      url: "https://maps.google.com/?q=Mandarin+Oriental+Kuala+Lumpur"
    }
  ],
  notes: [
    {
      type: "info",
      text: "<strong>Venue anchor:</strong> Vox Live KL is listed at Level 50, Naza Tower @ Platinum Park, 10 Persiaran KLCC, 50450 Kuala Lumpur. Venue contact listed publicly: +60 12 628 9876. Use this as the hotel-search center point."
    },
    {
      type: "info",
      text: "<strong>Holiday check:</strong> 21-22 June 2026 does not appear on the checked Singapore or Kuala Lumpur public holiday lists. Still plan around Sunday border traffic, Monday KL office-hour traffic, and concert-area congestion."
    }
  ],
  days: [
    {
      number: "01",
      date: "Sunday, 21 June",
      title: "Drive In / Check In / Concert",
      route: ["Khatib", "Woodlands Checkpoint meetup", "North-South Expressway", "Char Siew Yoong", "Transparent Coffee", "KLCC hotel", "Vox Live KL"],
      items: [
        {
          type: "event",
          category: "drive",
          time: "04:45 SGT",
          name: "Sherwin Grabs to Woodlands Checkpoint",
          link: { label: "Holland Ave to Woodlands", url: "https://maps.google.com/?q=12+Holland+Avenue+Singapore+272012+to+Woodlands+Checkpoint" },
          tags: [{ label: "Grab", type: "parking" }, { label: "Early start", type: "warn" }],
          note: "Sherwin leaves from 12 Holland Ave and meets Tai Zhi at Woodlands before crossing into Malaysia together."
        },
        {
          type: "event",
          category: "drive",
          time: "05:00 SGT",
          name: "Tai Zhi drives from Khatib to Woodlands",
          link: { label: "Khatib to Woodlands", url: "https://maps.google.com/?q=Khatib+Singapore+to+Woodlands+Checkpoint" },
          tags: [{ label: "Self-drive", type: "parking" }],
          note: "Load bags, top up water, and reach Woodlands with enough buffer for the pickup and checkpoint queue."
        },
        {
          type: "event",
          category: "drive",
          time: "05:30 SGT",
          name: "Meet at Woodlands, cross into Johor",
          link: { label: "Woodlands to KLCC", url: "https://maps.google.com/?q=Woodlands+Checkpoint+to+Naza+Tower+Platinum+Park+Kuala+Lumpur" },
          tags: [{ label: "Border buffer", type: "warn" }, { label: "Tai Zhi + Sherwin", type: "parking" }],
          note: "Aim to clear customs before the late-morning wave. Total road time can swing widely with border and KL traffic, so treat 6.5 to 8 hours from Woodlands to KLCC as the planning range."
        },
        { type: "travel", pill: "Drive + border buffer", text: "Singapore to KLCC, with 1 fuel/toilet stop and 1 food stop if needed." },
        {
          type: "event",
          category: "food",
          time: "10:00-10:45",
          name: "Highway breakfast / kopi stop",
          link: { label: "Pagoh R&amp;R option", url: "https://maps.google.com/?q=Pagoh+R%26R+Northbound" },
          tags: [{ label: "Flexible", type: "tbc" }],
          note: "Keep the stop short so you reach KL with enough time to park, check in, shower, and reset before the concert."
        },
        {
          type: "event",
          category: "hotel",
          time: "13:30-14:30",
          name: "Arrive KL, park or drop bags",
          link: { label: "KLCC / hotel area", url: "https://maps.google.com/?q=Naza+Tower+Platinum+Park+10+Persiaran+KLCC" },
          tags: [{ label: "Ask parking", type: "parking" }, { label: "Hotel TBC", type: "tbc" }],
          note: "When booking, ask the hotel about overnight parking, check-in timing, and late checkout. If the room is not ready, leave bags and keep the car parked or move only once for lunch and coffee."
        },
        {
          type: "event",
          category: "food",
          time: "14:30-15:30",
          name: "Lunch: Restoran Char Siew Yoong",
          link: { label: "Char Siew Yoong map", url: "https://maps.app.goo.gl/ZPzxf4cn898ZLqjM9" },
          tags: [{ label: "Preferred lunch", type: "booked" }, { label: "Non-halal", type: "pork" }, { label: "May queue", type: "warn" }],
          note: "Post-drive lunch before Transparent Coffee. Expect roast pork/char siew style food and a possible queue; keep the stop tight so the concert prep window survives."
        },
        {
          type: "event",
          category: "coffee",
          time: "15:45-16:30",
          name: "Coffee stop: Transparent Coffee",
          link: { label: "Transparent Coffee map", url: "https://maps.app.goo.gl/WF1eFHf22p12dayA7" },
          tags: [{ label: "Preferred", type: "booked" }, { label: "City parking", type: "parking" }],
          note: "Coffee after lunch, before returning to the hotel. If parking is annoying, leave the car at the hotel and Grab between stops."
        },
        {
          type: "event",
          category: "admin",
          time: "16:45-18:00",
          name: "Hotel rest, shower, concert prep",
          tags: [{ label: "Concert booked", type: "booked" }],
          note: "Download ticket QR, charge phones, pack ID/passport, and bring a small crossbody bag. Keep the car parked overnight."
        },
        { type: "travel", pill: "Walk / Grab 5-15 min", text: "Hotel to Naza Tower. Walk if staying in KLCC; Grab if raining or dressed for the show." },
        {
          type: "event",
          category: "concert",
          time: "Evening, time TBC",
          name: "POST Presents: Luv(sic) Hexalogy",
          link: { label: "Ticketmelon event page", url: "https://www.ticketmelon.com/POST/luvsic-hex-kl" },
          tags: [{ label: "Ticket bought", type: "booked" }, { label: "Confirm doors", type: "tbc" }],
          note: "Venue: Vox Live KL, Level 50, Naza Tower @ Platinum Park. Arrive 45-60 minutes before the listed door time once Ticketmelon confirms final timing."
        },
        {
          type: "event",
          category: "food",
          time: "Post-show",
          name: "Light supper or straight back to hotel",
          link: { label: "Nearby supper search", url: "https://maps.google.com/?q=restaurants+near+Naza+Tower+Platinum+Park+KLCC" },
          tags: [{ label: "Do not drive tired", type: "warn" }],
          note: "If hungry, keep it walking-distance or order delivery. Save the proper food crawl for Monday brunch before driving home."
        },
        {
          type: "note",
          noteType: "warn",
          text: "<strong>Concert timing warning:</strong> public listings verified the date and Vox Live KL venue, but not a dependable show time. Recheck the Ticketmelon ticket closer to travel and shift lunch/rest/concert arrival accordingly."
        }
      ]
    },
    {
      number: "02",
      date: "Monday, 22 June",
      title: "Run / Brunch / Coffee / Home",
      route: ["Hotel", "KLCC Park", "Shower + checkout", "Hai Kah Lang", "Seremban R&amp;R", "Singapore"],
      items: [
        {
          type: "event",
          category: "run",
          time: "07:00-08:00",
          name: "50-minute easy run at KLCC Park",
          link: { label: "KLCC Park map", url: "https://maps.google.com/?q=KLCC+Park+jogging+track" },
          tags: [{ label: "Jogging track", type: "run" }],
          note: "Keep it conversational and easy before the heat builds. KLCC Park works well for laps, and a nearby hotel keeps showering and checkout painless."
        },
        { type: "travel", pill: "Walk 5-15 min", text: "KLCC hotel to park and back, depending on final accommodation." },
        {
          type: "event",
          category: "hotel",
          time: "08:15-10:30",
          name: "Shower, pack, checkout",
          tags: [{ label: "Ask late checkout", type: "warn" }],
          note: "Ask for 12:00 checkout or luggage hold. If late checkout is expensive, still keep a simple shower-and-pack window before brunch."
        },
        {
          type: "event",
          category: "food",
          time: "11:00-12:15",
          name: "Lunch: Hai Kah Lang Seafood Noodle",
          link: { label: "Hai Kah Lang map", url: "https://maps.app.goo.gl/oVKpQCNxKWtPti3s8" },
          tags: [{ label: "Preferred lunch", type: "booked" }, { label: "May queue", type: "warn" }],
          note: "Saved-list pick in Cheras for seafood noodle and fish head noodle. It is southeast of KLCC, so it works as a lunch stop before pointing the car toward Seremban and the North-South Expressway."
        },
        {
          type: "event",
          category: "drive",
          time: "12:30-13:00",
          name: "Start drive toward Seremban R&amp;R, then Singapore",
          link: { label: "Lunch to Seremban R&amp;R", url: "https://maps.google.com/?q=Hai+Kah+Lang+Seafood+Noodle+to+R%26R+Seremban+South+Bound" },
          tags: [{ label: "Reach late evening", type: "warn" }],
          note: "From Cheras, route south toward Seremban. Fuel before leaving the city or near Seremban, then continue down the North-South Expressway after the R&amp;R break."
        },
        { type: "travel", pill: "Drive 6.5-8.5 hr", text: "KL to Singapore including traffic, dinner/rest stop, and immigration buffer." },
        {
          type: "event",
          category: "food",
          time: "15:15-15:45",
          name: "Planned break: R&amp;R Seremban South Bound",
          link: { label: "Pinned stop", url: "https://maps.app.goo.gl/zV8bCRQJKRhkcoAL6" },
          tags: [{ label: "Preferred stop", type: "booked" }],
          note: "Good early reset after leaving KL: toilet, drink, stretch, and driver check-in before the longer southern stretch."
        },
        {
          type: "event",
          category: "food",
          time: "17:30-18:15",
          name: "Backup R&amp;R options southbound",
          link: { label: "Ayer Keroh R&amp;R", url: "https://maps.google.com/?q=Ayer+Keroh+R%26R+Southbound" },
          tags: [{ label: "Flexible", type: "tbc" }],
          note: "Decent alternatives if timing shifts: Ayer Keroh R&amp;R Southbound for a bigger stop, Pagoh R&amp;R Southbound for food/fuel, Machap R&amp;R Southbound for a later Johor-side reset, or Gelang Patah R&amp;R if you want one final pause before Singapore."
        },
        {
          type: "event",
          category: "drive",
          time: "22:00-23:30 SGT",
          name: "Target arrival back in Singapore",
          tags: [{ label: "Border variable", type: "warn" }],
          note: "Late evening arrival is realistic if you leave KL after lunch. Keep Tuesday morning gentle if possible."
        }
      ]
    }
  ],
  todos: [
    { title: "01 Book the hotel", text: "Prioritise Ascott Star KLCC, W KL, Four Seasons, InterContinental, ibis KLCC, Element, Corus, Traders, or Mandarin Oriental. Confirm overnight parking and walking route to Naza Tower." },
    { title: "02 Verify show timing", text: "Ticketmelon/event pages confirm 21 June 2026 at Vox Live KL, but final doors/show time should be checked before locking dinner and arrival." },
    { title: "03 Car prep", text: "Touch 'n Go/RFID, VEP, insurance, passport validity, fuel, tyre pressure, charger cable, and offline map route." },
    { title: "04 Food list slot", text: "Sunday: Char Siew Yoong lunch, then Transparent Coffee. Monday: Hai Kah Lang lunch before Seremban R&amp;R." }
  ],
  packingSections: [
    {
      title: "Documents & Money",
      items: ["Passport", "Concert ticket QR / Ticketmelon login", "Hotel booking confirmation", "Driving licence, insurance, VEP / RFID / Touch 'n Go", "MYR cash, cards, small notes for parking"]
    },
    {
      title: "Clothing",
      items: ["Concert outfit", "Comfortable shoes for walking / queueing", "Sleepwear", "Fresh outfit for Monday brunch", "Underwear and socks"]
    },
    {
      title: "Toiletries",
      items: ["Toothbrush and toothpaste", "Face wash and moisturiser", "Deodorant", "Sunscreen for KLCC run", "Medication / plasters / motion sickness tablets"]
    },
    {
      title: "Tech & Gadgets",
      items: ["Phone and charging cable", "Power bank", "Car charger / USB-C cable", "Offline Google Maps / Waze route", "Malaysia roaming / eSIM"]
    },
    {
      title: "Run & Activities",
      items: ["Running shoes", "Running top and shorts", "Running socks", "Cap / sunglasses", "Small towel / laundry bag"]
    },
    {
      title: "Car & Road Trip",
      items: ["Water bottles", "Snacks for the drive", "Tissues / wet wipes", "Sunglasses for driver", "Reusable bag for coffee and snacks"]
    }
  ],
  footer: "KL Concert Run / 2 pax / Vox Live KL / built as a standalone HTML itinerary"
};
