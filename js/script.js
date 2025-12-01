// ========== MOBILE NAV ==========
const navToggle = document.querySelector(".nav-toggle");
const body = document.body;

if (navToggle) {
  navToggle.addEventListener("click", () => {
    body.classList.toggle("nav-open");
  });

  document.querySelectorAll(".nav-list a").forEach((link) => {
    link.addEventListener("click", () => {
      body.classList.remove("nav-open");
    });
  });
}

// ========== THEME TOGGLE ==========
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const rootHtml = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem("ln-theme");
if (savedTheme === "light" || savedTheme === "dark") {
  rootHtml.setAttribute("data-theme", savedTheme);
  if (themeIcon) themeIcon.textContent = savedTheme === "light" ? "☀️" : "🌙";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = rootHtml.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    rootHtml.setAttribute("data-theme", next);
    localStorage.setItem("ln-theme", next);
    if (themeIcon) themeIcon.textContent = next === "light" ? "☀️" : "🌙";
  });
}

// ========== SCROLL REVEAL (IntersectionObserver) ==========
const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealEls.forEach((el) => observer.observe(el));

// Animate skill bars when skills section appears
const skillBars = document.querySelectorAll(".skill-bar .bar span");
const skillsSection = document.getElementById("skills");

if (skillsSection) {
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillBars.forEach((bar) => {
            const level = bar.getAttribute("data-level");
            if (level) {
              bar.style.width = `${level}%`;
            }
          });
          skillsObserver.unobserve(skillsSection);
        }
      });
    },
    { threshold: 0.2 }
  );

  skillsObserver.observe(skillsSection);
}

// ========== PROJECT FILTERS ==========
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      if (filter === "all" || filter === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// ========== CONTACT FORM (DEMO ONLY) ==========
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert(
      "Thank you for your message! On this portfolio (GitHub Pages), the form is in demo mode. Please also email me directly at guduru.leelanaveen@gmail.com."
    );
    contactForm.reset();
  });
}

// ========== BACK TO TOP BUTTON ==========
const backToTopBtn = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY || window.pageYOffset;
  if (backToTopBtn) {
    if (scrollY > 400) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  }
});

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

