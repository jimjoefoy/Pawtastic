// Booking clicks
const bookingUrl = window.BOOKING_URL;

const goToBooking = (e) => {
  e.preventDefault();
  window.open(bookingUrl, "_blank", "noopener");
};

document.getElementById("bookWalkBtn")?.addEventListener("click", goToBooking);
document.getElementById("bookWalkBtnMobile")?.addEventListener("click", goToBooking);
document.getElementById("bookHeroBtn")?.addEventListener("click", goToBooking);

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger?.addEventListener("click", () => {
  const isOpen = mobileMenu.hasAttribute("hidden") === false;
  if (isOpen) {
    mobileMenu.setAttribute("hidden", "");
    hamburger.setAttribute("aria-expanded", "false");
  } else {
    mobileMenu.removeAttribute("hidden");
    hamburger.setAttribute("aria-expanded", "true");
  }
});

// Close mobile menu after click
mobileMenu?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    mobileMenu.setAttribute("hidden", "");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// Active nav link on scroll (Home/About/Book)
const sections = [
  { id: "top", linkText: "Home" },
  { id: "about", linkText: "About Us" },
  { id: "book", linkText: "Book Online" }
];

const navLinks = Array.from(document.querySelectorAll(".nav-links a"));

const setActive = (hash) => {
  navLinks.forEach(a => a.classList.remove("active"));
  const match = navLinks.find(a => a.getAttribute("href") === `#${hash}` || (hash === "top" && a.getAttribute("href")==="#top"));
  if (match) match.classList.add("active");
};

const observer = new IntersectionObserver((entries) => {
  // choose the most visible section currently intersecting
  const visible = entries
    .filter(e => e.isIntersecting)
    .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;
  setActive(visible.target.id);
}, { root: null, threshold: [0.15, 0.3, 0.6] });

sections.forEach(s => {
  const el = document.getElementById(s.id);
  if (el) observer.observe(el);
});

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

revealElements.forEach(el => observer.observe(el));
