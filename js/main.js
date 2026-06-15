// Theme Toggle
const themeToggle = document.querySelector(".theme-toggle");
const html = document.documentElement;

// Theme is already set by inline script in head, just handle toggle clicks
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const theme = html.getAttribute("data-theme");
    const newTheme = theme === "light" ? "dark" : "light";

    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

// Mobile Navigation Toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    navToggle.classList.toggle("active");
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Project Category Filter
const categoryButtons = document.querySelectorAll(".category-btn");
const projectCards = document.querySelectorAll(".project-card");

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Update active button
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Filter projects
    const category = button.dataset.category;

    projectCards.forEach((card) => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block";
        card.style.animation = "fadeIn 0.5s ease forwards";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add scroll effect to navigation
let lastScroll = 0;
const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    nav.style.boxShadow = "none";
  } else {
    nav.style.boxShadow = "0 1px 10px rgba(0, 0, 0, 0.05)";
  }

  lastScroll = currentScroll;
});
