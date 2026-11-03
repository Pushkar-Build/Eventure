# K Explore — Modern Responsive Event Management Platform

A curated, modern web platform designed to discover local community meetups, tech summits, design critiques, and cultural sessions. Built using vanilla web standards with responsive layouts, client-side validation, live event countdown tickers, dark/light themes, and offline pass management.

---

## 🔗 Live Links

- **Live Deployed Application:** `https://YOUR-DEPLOYED-SITE-URL.netlify.app` *(Replace with your Netlify/Vercel URL)*
- **GitHub Repository:** `https://github.com/YOUR_GITHUB_USERNAME/k-explore-events` *(Replace with your GitHub repo URL)*

---

## 🌟 Key Features

### 1. Interactive Hero & Event Discovery
- **Hero Section:** Clean editorial layout presenting upcoming session highlights and quick RSVP entry points.
- **Live Search & Filter:** Instant search indexing event titles, locations, and blurbs with category filtering (Code & Systems, Design, Music, Culture) without page reloads[cite: 1].
- **Responsive Event Cards:** Cards displaying high-resolution media, category badges, dynamic countdowns, date, venue, and descriptions[cite: 1].

### 2. Event Details & RSVP Modal
- **Detailed Specifications:** Deep-dive modal window detailing session goals, full descriptions, and schedule meta[cite: 1].
- **Client-Side Form Validation:** Enforces strict RFC 5322 email patterns, non-empty alphabet-only name checking (min 3 chars), and numerical phone checks (10+ digits) before submission[cite: 1].
- **Instant Boarding Pass Generation:** Generates an authentic ticket reference ID upon successful registration and prevents duplicate entries with immediate visual feedback[cite: 1].

### 3. Bonus Challenges Implemented
- **🌓 Dark / Light Theme Engine:** Smooth theme switching with visual state persistence using browser storage[cite: 1].
- **⏳ Real-Time Countdown Tickers:** Dynamic countdowns calculating remaining days, hours, and minutes until each event begins, updating automatically every 30 seconds[cite: 1].
- **🎟️ Local Storage Pass Wallet:** Offline persistence of issued passes with a slide-out ticket drawer and individual pass cancellation/deletion capabilities[cite: 1, 2].
- **✨ Accessible Micro-Interactions:** Custom focus rings, modal backdrop filters, and toast notifications[cite: 1].

---

## 🛠️ Tech Stack & Architecture

- **Markup:** Semantic HTML5 (Custom modal dialogs, accessible forms, meta viewport tags)[cite: 1]
- **Styling:** CSS3 Custom Properties (Design Tokens), Flexbox, CSS Grid, Media Queries, Backdrop Filters[cite: 1]
- **Logic:** Vanilla JavaScript (ES6+), DOM Manipulation, Event Delegation, Regular Expressions[cite: 1]
- **Typography:** Instrument Serif, Plus Jakarta Sans, JetBrains Mono
- **Icons:** Phosphor Icons (Lightweight SVG web font)
- **Persistence:** Browser `localStorage` API[cite: 1]

---

## 📱 Responsive Breakpoints

The application enforces a mobile-first, fluid layout across all viewports[cite: 1]:
- **Mobile (< 640px):** Single-column stacked card grid, full-width inputs, and touch-friendly target sizes[cite: 1].
- **Tablet (640px – 1024px):** 2-column card grid with adaptive search controls[cite: 1].
- **Desktop (> 1024px):** 3-column auto-fill card grid, sticky glassmorphism header, and split details panels[cite: 1].

---

## 🚀 Local Setup & Installation

To run this project locally without any dependencies or build steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_GITHUB_USERNAME/k-explore-events.git](https://github.com/YOUR_GITHUB_USERNAME/k-explore-events.git)