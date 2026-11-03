/**
 * k.explore — Client Event Manager & RSVP Engine
 * Free of third-party runtime dependencies. Fully accessible & persisted.
 */

// 1. Curated Gathering Data (Realistic, Human, Relevant)
const EVENTS = [
  {
    id: "evt-01",
    title: "Odisha FOSS & Systems Day 2026",
    category: "Tech & Code",
    date: "2026-11-21T10:00:00",
    venue: "KIIT Campus Auditorium 3, Bhubaneswar",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000&auto=format&fit=crop&q=80",
    summary: "Hands-on discussions on C runtime internals, Linux kernel tracing, and self-hosted cloud toolchains.",
    description: "An informal unconference gathering systems programmers, algorithm geeks, and open-source contributors. We skip marketing slide decks in favor of real terminal workflows, memory profilers, and architecture reviews. Lunch and stickers provided."
  },
  {
    id: "evt-02",
    title: "Mechanical Keyboard & Workspace Meetup",
    category: "Culture",
    date: "2026-11-29T14:30:00",
    venue: "The Common Room Cafe, Saheed Nagar",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=1000&auto=format&fit=crop&q=80",
    summary: "Bring your custom boards, solder stations, lubed linear switches, and desktop setups.",
    description: "Whether you run a 65% compact or an ergonomic split board, join fellow keyboard enthusiasts for sound tests, switch comparisons, keycap trades, and desk ergonomic advice."
  },
  {
    id: "evt-03",
    title: "Late Autumn Acoustic & Rooftop Strings",
    category: "Music",
    date: "2026-12-05T18:00:00",
    venue: "Echo Terrace, Infocity Area",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&auto=format&fit=crop&q=80",
    summary: "Intimate indie instrumental sets under the evening sky, accompanied by warm chai.",
    description: "A cozy evening unplugged from loud screens. Featuring three live acoustic guitar and violin artists playing classical-fusion and indie compositions. Limited floor-cushion seating."
  },
  {
    id: "evt-04",
    title: "Design Critique: Typography & Fluid Systems",
    category: "Design",
    date: "2026-12-12T11:00:00",
    venue: "Kalinga Studio Gallery + Online Stream",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&auto=format&fit=crop&q=80",
    summary: "Bring an in-progress Figma wireframe or portfolio for kind, brutally honest feedback.",
    description: "A constructive clinic breaking down real websites. We analyze hierarchy, responsive typography scaling, WCAG color contrast, and why intuitive affordances matter more than flashy animations."
  },
  {
    id: "evt-05",
    title: "Local Founders: First 100 Paying Users",
    category: "Tech & Code",
    date: "2026-12-18T16:00:00",
    venue: "O-Hub Incubator, Patia",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&auto=format&fit=crop&q=80",
    summary: "Honest stories from indie software builders about distribution, churn, and cold outreach.",
    description: "Three bootstrapping indie hackers discuss how they found their first revenue customers without venture checks. Practical playbook covering landing page conversion, Cold emails, and API monetization."
  },
  {
    id: "evt-06",
    title: "Street Photography Walk: Old Town Temples",
    category: "Culture",
    date: "2026-12-24T06:30:00",
    venue: "Bindu Sagar Lake Point, Old Town",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1000&auto=format&fit=crop&q=80",
    summary: "Golden hour photowalk capturing sandstone textures, morning rituals, and reflection play.",
    description: "A relaxed dawn walking session around centuries-old architecture. Any camera works—whether you shoot 35mm film, modern mirrorless, or a smartphone. Concludes with breakfast and photo sharing."
  }
];

// 2. Application State
const appState = {
  activeCategory: "all",
  searchQuery: "",
  theme: localStorage.getItem("kexplore_theme") || "dark"
};

// 3. Select DOM Nodes
const themeToggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const searchInput = document.getElementById("eventSearchInput");
const clearSearchBtn = document.getElementById("clearSearch");
const categoryGroup = document.getElementById("categoryGroup");
const eventsGrid = document.getElementById("eventsGrid");

// Drawers & Modals
const eventDrawer = document.getElementById("eventDrawer");
const closeDrawerBtn = document.getElementById("closeDrawerBtn");
const passesDrawer = document.getElementById("passesDrawer");
const openPassesBtn = document.getElementById("openPassesBtn");
const closePassesDrawerBtn = document.getElementById("closePassesDrawerBtn");
const passesCount = document.getElementById("passesCount");
const passesList = document.getElementById("passesList");

// Modal Elements
const modalPoster = document.getElementById("modalPoster");
const modalCategoryBadge = document.getElementById("modalCategoryBadge");
const modalEventTitle = document.getElementById("modalEventTitle");
const modalDate = document.getElementById("modalDate");
const modalVenue = document.getElementById("modalVenue");
const modalCountdown = document.getElementById("modalCountdown");
const modalDescription = document.getElementById("modalDescription");
const rsvpEventId = document.getElementById("rsvpEventId");

// Form Elements
const rsvpForm = document.getElementById("rsvpForm");
const attendeeName = document.getElementById("attendeeName");
const attendeeEmail = document.getElementById("attendeeEmail");
const attendeePhone = document.getElementById("attendeePhone");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const toastHub = document.getElementById("toastHub");

// 4. Visual Theme Handler
function initTheme(theme) {
  appState.theme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("kexplore_theme", theme);

  if (theme === "dark") {
    themeIcon.className = "ph ph-sun";
  } else {
    themeIcon.className = "ph ph-moon";
  }
}

themeToggleBtn.addEventListener("click", () => {
  const next = appState.theme === "dark" ? "light" : "dark";
  initTheme(next);
});

// 5. Countdown Formatter (Ticking Engine)
function formatRemainingTime(isoDateStr) {
  const target = new Date(isoDateStr).getTime();
  const diff = target - Date.now();

  if (diff <= 0) return "Session Started";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);

  if (days > 0) return `${days}d ${hours}h remaining`;
  return `${hours}h ${mins}m remaining`;
}

// 6. Card Grid Renderer
function renderCards() {
  const q = appState.searchQuery.toLowerCase();

  const filtered = EVENTS.filter(ev => {
    const matchesCategory = appState.activeCategory === "all" || ev.category === appState.activeCategory;
    const matchesSearch = ev.title.toLowerCase().includes(q) ||
                          ev.venue.toLowerCase().includes(q) ||
                          ev.summary.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    eventsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <p style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--text-title);">No matching sessions found</p>
        <p style="font-size: 0.88rem;">Try clearing your search query or picking "All" categories.</p>
      </div>
    `;
    return;
  }

  eventsGrid.innerHTML = filtered.map(ev => {
    const readableDate = new Date(ev.date).toLocaleDateString("en-IN", {
      month: "short", day: "numeric", weekday: "short"
    });

    return `
      <article class="card">
        <div class="card-hero-image">
          <img src="${ev.image}" alt="${ev.title}" loading="lazy" />
          <span class="tag-category">${ev.category}</span>
          <span class="tag-countdown" id="ticker-${ev.id}">
            <i class="ph ph-clock"></i> ${formatRemainingTime(ev.date)}
          </span>
        </div>
        <div class="card-details">
          <div class="card-meta-line">
            <i class="ph ph-calendar"></i> ${readableDate} • <i class="ph ph-map-pin"></i> ${ev.venue.split(",")[0]}
          </div>
          <h3 class="card-title">${ev.title}</h3>
          <p class="card-blurb">${ev.summary}</p>
          <button class="card-cta-btn" onclick="openEventDetails('${ev.id}')">
            <span>View details & RSVP</span>
            <i class="ph ph-arrow-right"></i>
          </button>
        </div>
      </article>
    `;
  }).join("");
}

// 7. Interval Ticker (Auto updates live countdowns every 30 seconds)
setInterval(() => {
  EVENTS.forEach(ev => {
    const ticker = document.getElementById(`ticker-${ev.id}`);
    if (ticker) {
      ticker.innerHTML = `<i class="ph ph-clock"></i> ${formatRemainingTime(ev.date)}`;
    }
  });
  if (eventDrawer.classList.contains("is-open") && rsvpEventId.value) {
    const current = EVENTS.find(e => e.id === rsvpEventId.value);
    if (current) modalCountdown.textContent = formatRemainingTime(current.date);
  }
}, 30000);

// 8. Event Modal Drawer Controls
window.openEventDetails = function(eventId) {
  const ev = EVENTS.find(e => e.id === eventId);
  if (!ev) return;

  modalPoster.src = ev.image;
  modalCategoryBadge.textContent = ev.category;
  modalEventTitle.textContent = ev.title;
  modalDate.textContent = new Date(ev.date).toLocaleString("en-IN", {
    dateStyle: "medium", timeStyle: "short"
  });
  modalVenue.textContent = ev.venue;
  modalCountdown.textContent = formatRemainingTime(ev.date);
  modalDescription.textContent = ev.description;
  rsvpEventId.value = ev.id;

  clearFormErrors();
  eventDrawer.classList.add("is-open");
  document.body.style.overflow = "hidden";
};

function closeAllDrawers() {
  eventDrawer.classList.remove("is-open");
  passesDrawer.classList.remove("is-open");
  document.body.style.overflow = "auto";
}

closeDrawerBtn.addEventListener("click", closeAllDrawers);
closePassesDrawerBtn.addEventListener("click", closeAllDrawers);
[eventDrawer, passesDrawer].forEach(overlay => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeAllDrawers();
  });
});

// 9. Client-Side Validation Logic
function clearFormErrors() {
  [attendeeName, attendeeEmail, attendeePhone].forEach(i => i.classList.remove("invalid"));
  nameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";
}

function validateRSVP() {
  let passed = true;
  clearFormErrors();

  const nameVal = attendeeName.value.trim();
  const emailVal = attendeeEmail.value.trim();
  const phoneVal = attendeePhone.value.trim().replace(/\s+/g, "");

  // Real Name validation (min 3 chars, alphabet characters & spaces only)
  if (nameVal.length < 3 || !/^[a-zA-Z\s.]+$/.test(nameVal)) {
    attendeeName.classList.add("invalid");
    nameError.textContent = "Please enter your real full name (at least 3 characters).";
    passed = false;
  }

  // Email format validation (standard RFC regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(emailVal)) {
    attendeeEmail.classList.add("invalid");
    emailError.textContent = "Please enter a valid personal or university email address.";
    passed = false;
  }

  // 10-digit Indian/International phone check
  const phoneRegex = /^\+?[0-9]{10,14}$/;
  if (!phoneRegex.test(phoneVal)) {
    attendeePhone.classList.add("invalid");
    phoneError.textContent = "Please provide a valid 10-digit mobile number.";
    passed = false;
  }

  return passed;
}

// 10. Pass Reservation & LocalStorage Persistence
rsvpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validateRSVP()) return;

  const evId = rsvpEventId.value;
  const ev = EVENTS.find(item => item.id === evId);

  const storedPasses = JSON.parse(localStorage.getItem("kexplore_passes") || "[]");

  // Duplicate Check
  const alreadyRegistered = storedPasses.some(
    p => p.eventId === evId && p.email.toLowerCase() === attendeeEmail.value.trim().toLowerCase()
  );

  if (alreadyRegistered) {
    attendeeEmail.classList.add("invalid");
    emailError.textContent = "A pass has already been issued to this email for this event.";
    return;
  }

  const newPass = {
    passId: "KP-" + Math.floor(100000 + Math.random() * 900000),
    eventId: evId,
    eventTitle: ev ? ev.title : "Community Gathering",
    venue: ev ? ev.venue : "Bhubaneswar",
    date: ev ? ev.date : new Date().toISOString(),
    name: attendeeName.value.trim(),
    email: attendeeEmail.value.trim(),
    phone: attendeePhone.value.trim(),
    issuedAt: new Date().toISOString()
  };

  storedPasses.unshift(newPass);
  localStorage.setItem("kexplore_passes", JSON.stringify(storedPasses));

  rsvpForm.reset();
  closeAllDrawers();
  syncPassBadge();
  triggerToast(`Pass confirmed! Ticket Ref: ${newPass.passId}`);
});

// 11. Pass Cancellation & Storage Management
function syncPassBadge() {
  const passes = JSON.parse(localStorage.getItem("kexplore_passes") || "[]");
  passesCount.textContent = passes.length;
}

function renderWalletPasses() {
  const passes = JSON.parse(localStorage.getItem("kexplore_passes") || "[]");

  if (passes.length === 0) {
    passesList.innerHTML = `
      <div style="text-align: center; padding: 2rem 0; color: var(--text-muted);">
        <i class="ph ph-ticket" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
        <p>No active reservations yet.</p>
      </div>
    `;
    return;
  }

  passesList.innerHTML = passes.map(p => `
    <div class="ticket-stub">
      <button class="ticket-delete-btn" onclick="cancelPass('${p.passId}')" title="Cancel this pass" aria-label="Cancel this pass">
        <i class="ph ph-trash"></i>
      </button>
      <h4 class="ticket-title">${p.eventTitle}</h4>
      <p class="ticket-meta"><i class="ph ph-map-pin"></i> ${p.venue}</p>
      <p class="ticket-meta"><i class="ph ph-user"></i> ${p.name} • ${p.email}</p>
      <span class="ticket-code">TICKET #${p.passId}</span>
    </div>
  `).join("");
}

window.cancelPass = function(passId) {
  let passes = JSON.parse(localStorage.getItem("kexplore_passes") || "[]");
  passes = passes.filter(item => item.passId !== passId);
  localStorage.setItem("kexplore_passes", JSON.stringify(passes));

  syncPassBadge();
  renderWalletPasses();
  triggerToast("Pass successfully cancelled.");
};

openPassesBtn.addEventListener("click", () => {
  renderWalletPasses();
  passesDrawer.classList.add("is-open");
  document.body.style.overflow = "hidden";
});

// 12. Lightweight Toast Notifications
function triggerToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-notice";
  toast.innerHTML = `<i class="ph ph-check-circle" style="color: var(--success); font-size: 1.1rem;"></i> <span>${message}</span>`;
  toastHub.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.25s ease";
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

// 13. Search & Category Listeners
searchInput.addEventListener("input", (e) => {
  appState.searchQuery = e.target.value.trim();
  clearSearchBtn.style.display = appState.searchQuery ? "block" : "none";
  renderCards();
});

clearSearchBtn.addEventListener("click", () => {
  searchInput.value = "";
  appState.searchQuery = "";
  clearSearchBtn.style.display = "none";
  renderCards();
});

categoryGroup.addEventListener("click", (e) => {
  const pill = e.target.closest(".cat-pill");
  if (!pill) return;

  document.querySelectorAll(".cat-pill").forEach(p => p.classList.remove("active"));
  pill.classList.add("active");
  appState.activeCategory = pill.dataset.cat;
  renderCards();
});

// 14. Initialize System
initTheme(appState.theme);
renderCards();
syncPassBadge();