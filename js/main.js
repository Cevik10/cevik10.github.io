(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Navigation */
  function initNav() {
    const toggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const themeToggle = document.querySelector(".theme-toggle");

    if (toggle && navLinks) {
      toggle.addEventListener("click", () => {
        const open = navLinks.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
      });

      navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    if (themeToggle) {
      const saved = localStorage.getItem("acc-theme");
      if (saved === "light") document.body.classList.add("light-mode");

      themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        localStorage.setItem(
          "acc-theme",
          document.body.classList.contains("light-mode") ? "light" : "dark"
        );
      });
    }
  }

  /* Hero constellation */
  function renderConstellation() {
    const container = document.getElementById("constellation");
    if (!container || typeof HERO_ORBIT_APPS === "undefined") return;

    HERO_ORBIT_APPS.forEach((node) => {
      const el = document.createElement("div");
      el.className = "orbit-node";
      el.setAttribute("aria-hidden", "true");
      el.style.top = node.top;
      el.style.left = node.left;
      el.textContent = node.icon;
      container.appendChild(el);
    });
  }

  /* App cards */
  function renderAppCard(app) {
    const unofficial = app.unofficial
      ? '<p class="unofficial-note">Unofficial fan companion — not affiliated with any rights holder.</p>'
      : "";

    const comingSoon = app.comingSoon
      ? '<span class="coming-soon-badge">Coming Soon</span>'
      : "";

    const appStoreBtn =
      app.appStore && app.appStore !== "#"
        ? `<a class="btn btn-store" href="${app.appStore}" target="_blank" rel="noopener noreferrer">App Store</a>`
        : app.comingSoon
          ? `<span class="btn btn-store disabled" aria-disabled="true">App Store</span>`
          : `<a class="btn btn-store" href="${STUDIO.appStoreDeveloper}" target="_blank" rel="noopener noreferrer">App Store</a>`;

    const playBtn =
      app.googlePlay && app.googlePlay !== "#"
        ? `<a class="btn btn-store" href="${app.googlePlay}" target="_blank" rel="noopener noreferrer">Google Play</a>`
        : app.comingSoon
          ? `<span class="btn btn-store disabled" aria-disabled="true">Google Play</span>`
          : `<a class="btn btn-store" href="${STUDIO.googlePlayDeveloper}" target="_blank" rel="noopener noreferrer">Google Play</a>`;

    return `
      <article class="panel app-card fade-in" data-category="${app.category}" data-accent="${app.accent}" data-app-id="${app.id}">
        <div class="app-card-header">
          <div class="app-icon" aria-hidden="true">${app.icon}</div>
          <div>
            <span class="app-badge">${app.categoryLabel}</span>
            <h3 class="app-name">${app.name}</h3>
            <p class="app-hook">${app.hook}</p>
          </div>
        </div>
        ${comingSoon}
        <p class="app-desc">${app.description}</p>
        <div class="app-actions">
          ${appStoreBtn}
          ${playBtn}
        </div>
        ${unofficial}
      </article>
    `;
  }

  function renderApps() {
    const grid = document.getElementById("apps-grid");
    const filterBar = document.getElementById("filter-bar");
    const supportApps = document.getElementById("support-apps");

    if (!grid || typeof APPS === "undefined") return;

    grid.innerHTML = APPS.map(renderAppCard).join("");

    if (filterBar && typeof FILTERS !== "undefined") {
      filterBar.innerHTML = FILTERS.map(
        (f, i) =>
          `<button class="filter-btn${i === 0 ? " active" : ""}" data-filter="${f.id}" type="button">${f.label}</button>`
      ).join("");

      filterBar.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter-btn");
        if (!btn) return;

        const filter = btn.dataset.filter;
        filterBar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        grid.querySelectorAll(".app-card").forEach((card) => {
          const match = filter === "all" || card.dataset.category === filter;
          card.classList.toggle("hidden", !match);
        });
      });
    }

    if (supportApps) {
      supportApps.innerHTML = APPS.map(
        (app) =>
          `<a class="support-app-link" href="#apps" data-scroll-app="${app.id}">${app.icon} ${app.name}</a>`
      ).join("");

      supportApps.addEventListener("click", (e) => {
        const link = e.target.closest("[data-scroll-app]");
        if (!link) return;
        e.preventDefault();
        const id = link.dataset.scrollApp;
        const card = grid.querySelector(`[data-app-id="${id}"]`);
        if (card) {
          document.getElementById("apps")?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
          card.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
        }
      });
    }
  }

  /* FAQ accordion */
  function initFAQ() {
    const list = document.getElementById("faq-list");
    if (!list || typeof FAQ_ITEMS === "undefined") return;

    list.innerHTML = FAQ_ITEMS.map((item, i) => {
      const id = `faq-${i}`;
      return `
        <div class="faq-item">
          <button class="faq-question" type="button" aria-expanded="false" aria-controls="${id}-answer" id="${id}">
            <span>${item.question}</span>
            <span class="faq-icon" aria-hidden="true">+</span>
          </button>
          <div class="faq-answer" id="${id}-answer" role="region" aria-labelledby="${id}">
            <div class="faq-answer-inner">${item.answer}</div>
          </div>
        </div>
      `;
    }).join("");

    list.addEventListener("click", (e) => {
      const btn = e.target.closest(".faq-question");
      if (!btn) return;

      const expanded = btn.getAttribute("aria-expanded") === "true";
      const answer = document.getElementById(btn.getAttribute("aria-controls"));

      list.querySelectorAll(".faq-question").forEach((q) => {
        q.setAttribute("aria-expanded", "false");
        const a = document.getElementById(q.getAttribute("aria-controls"));
        if (a) a.style.maxHeight = "0";
      });

      if (!expanded && answer) {
        btn.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  }

  /* Scroll reveal */
  function initReveal() {
    if (prefersReducedMotion) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }

  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    renderConstellation();
    renderApps();
    initFAQ();
    initReveal();
  });
})();
