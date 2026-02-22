// js/main.js
document.documentElement.classList.remove("no-js");

// -------------------- Booking clicks --------------------
const bookingUrl = window.BOOKING_URL;

const goToBooking = (e) => {
  e.preventDefault();
  if (!bookingUrl) return;
  window.open(bookingUrl, "_blank", "noopener");
};

document.getElementById("bookWalkBtn")?.addEventListener("click", goToBooking);
document.getElementById("bookWalkBtnMobile")?.addEventListener("click", goToBooking);
document.getElementById("bookHeroBtn")?.addEventListener("click", goToBooking);

// -------------------- Footer year --------------------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// -------------------- Mobile menu --------------------
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger?.addEventListener("click", () => {
  if (!mobileMenu) return;
  const isOpen = !mobileMenu.hasAttribute("hidden");
  if (isOpen) {
    mobileMenu.setAttribute("hidden", "");
    hamburger.setAttribute("aria-expanded", "false");
  } else {
    mobileMenu.removeAttribute("hidden");
    hamburger.setAttribute("aria-expanded", "true");
  }
});

mobileMenu?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    mobileMenu.setAttribute("hidden", "");
    hamburger?.setAttribute("aria-expanded", "false");
  });
});

// -------------------- Active nav link on scroll --------------------
// Match these IDs to your sections:
const sectionIds = ["services", "about", "reviews", "contact"];
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));

const setActive = (id) => {
  navLinks.forEach((a) => a.classList.remove("active"));
  const match = navLinks.find((a) => a.getAttribute("href") === `#${id}`);
  if (match) match.classList.add("active");
};

if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      setActive(visible.target.id);
    },
    { threshold: [0.2, 0.35, 0.6] }
  );

  sectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) navObserver.observe(el);
  });
}

// -------------------- Reveal on scroll (single source of truth) --------------------
document.addEventListener("DOMContentLoaded", () => {
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  console.log(`[reveal] found ${revealEls.length} elements`);

  if (revealEls.length === 0) return;

  // Fallback: if IntersectionObserver not supported, show everything
  if (!("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  // Optional stagger: apply delay per grid
  revealEls.forEach((el) => {
    const grid = el.closest(".card-grid");
    if (grid && !el.style.getPropertyValue("--delay")) {
      const siblings = Array.from(grid.querySelectorAll(".reveal"));
      const idx = siblings.indexOf(el);
      el.style.setProperty("--delay", `${idx * 90}ms`);
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
});
