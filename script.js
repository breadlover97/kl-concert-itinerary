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
  document.getElementById("section-" + id).scrollIntoView({ behavior: "smooth", block: "start" });
  setActiveSection(id);
}

function updateActiveSectionFromScroll() {
  const sections = Array.from(document.querySelectorAll(".scroll-section"));
  const navHeight = document.querySelector(".tab-nav").offsetHeight;
  const probeLine = navHeight + 90;
  let activeId = sections[0].id.replace("section-", "");

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= probeLine) {
      activeId = section.id.replace("section-", "");
    }
  });

  setActiveSection(activeId);
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
  window.addEventListener("scroll", updateActiveSectionFromScroll, { passive: true });
  window.addEventListener("resize", updateActiveSectionFromScroll);
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
}

document.addEventListener("DOMContentLoaded", renderPage);
