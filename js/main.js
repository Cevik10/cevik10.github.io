(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  function initStudioBranding() {
    if (typeof STUDIO === "undefined") return;

    const logoEls = document.querySelectorAll("[data-studio-logo]");
    logoEls.forEach((el) => {
      el.src = STUDIO.logo;
      el.alt = STUDIO.name + " logo";
    });

    const coverEls = document.querySelectorAll("[data-studio-cover]");
    coverEls.forEach((el) => {
      el.src = STUDIO.cover;
      el.alt = STUDIO.name + " cover art";
    });

    const favicon = document.getElementById("dynamic-favicon");
    if (favicon && STUDIO.logo) favicon.href = STUDIO.logo;
  }

  function renderOrbit() {
    const ring = document.getElementById("orbit-ring");
    if (!ring || typeof HERO_ORBIT_APPS === "undefined") return;

    const items = HERO_ORBIT_APPS.filter((a) => a.icon);
    const count = items.length;
    const radius = window.innerWidth < 720 ? 130 : 175;

    items.forEach((app, i) => {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      const x = 50 + (Math.cos(angle) * radius) / 3.2;
      const y = 50 + (Math.sin(angle) * radius) / 3.2;

      const node = document.createElement("a");
      node.className = "orbit-app";
      node.href = "#apps";
      node.style.left = x + "%";
      node.style.top = y + "%";
      node.style.animationDelay = i * -0.7 + "s";
      node.title = app.name;
      node.setAttribute("aria-label", app.name);
      node.innerHTML = `<img src="${app.icon}" alt="" loading="lazy" /><span class="orbit-glow"></span>`;
      node.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("apps")?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
        setTimeout(() => {
          document.querySelector(`[data-app-id="${app.id}"]`)?.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "center"
          });
        }, 300);
      });
      ring.appendChild(node);
    });
  }

  function renderFeaturedStrip() {
    const strip = document.getElementById("featured-strip");
    if (!strip || typeof APPS === "undefined") return;

    const featured = APPS.filter((a) => a.featured);
    strip.innerHTML = featured
      .map(
        (app) => `
      <a class="featured-chip" href="#apps" data-scroll-app="${app.id}">
        <img src="${app.icon}" alt="" width="32" height="32" loading="lazy" />
        <span>${app.name}</span>
        ${app.comingSoon ? '<em class="chip-soon">Soon</em>' : ""}
      </a>`
      )
      .join("");

    strip.addEventListener("click", (e) => {
      const link = e.target.closest("[data-scroll-app]");
      if (!link) return;
      e.preventDefault();
      const card = document.querySelector(`[data-app-id="${link.dataset.scrollApp}"]`);
      document.getElementById("apps")?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      card?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
    });
  }

  function storeButton(url, label, disabled) {
    if (disabled) return `<span class="btn btn-store disabled" aria-disabled="true">${label}</span>`;
    if (!url) return "";
    return `<a class="btn btn-store" href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  }

  function renderAppCard(app) {
    const unofficial = app.unofficial
      ? '<p class="unofficial-note">Unofficial fan companion — not affiliated with any rights holder.</p>'
      : "";

    const comingSoon = app.comingSoon ? '<span class="coming-soon-badge">Coming Soon</span>' : "";

    const visual = app.screenshot
      ? `<div class="app-card-visual">
          <img class="app-screenshot" src="${app.screenshot}" alt="${app.name} screenshot" loading="lazy" />
          <div class="app-visual-overlay"></div>
          <img class="app-icon-img" src="${app.icon}" alt="${app.name} icon" width="72" height="72" loading="lazy" />
        </div>`
      : `<div class="app-card-visual app-card-visual--icon-only">
          <div class="app-visual-fallback"></div>
          <img class="app-icon-img app-icon-img--large" src="${app.icon}" alt="${app.name} icon" width="96" height="96" loading="lazy" />
        </div>`;

    const appStoreBtn = app.comingSoon
      ? storeButton(null, "App Store", true)
      : app.appStore
        ? storeButton(app.appStore, "App Store", false)
        : "";

    const playBtn = app.comingSoon
      ? storeButton(null, "Google Play", true)
      : app.googlePlay
        ? storeButton(app.googlePlay, "Google Play", false)
        : "";

    return `
      <article class="panel app-card fade-in" data-category="${app.category}" data-accent="${app.accent}" data-app-id="${app.id}">
        ${visual}
        <div class="app-card-body">
          <span class="app-badge">${app.categoryLabel}</span>
          ${comingSoon}
          <h3 class="app-name">${app.name}</h3>
          <p class="app-hook">${app.hook}</p>
          <p class="app-desc">${app.description}</p>
          <div class="app-actions">
            ${appStoreBtn}
            ${playBtn}
          </div>
          ${unofficial}
        </div>
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
          `<a class="support-app-link" href="#apps" data-scroll-app="${app.id}">
            <img src="${app.icon}" alt="" width="28" height="28" loading="lazy" />
            <span>${app.name}</span>
          </a>`
      ).join("");

      supportApps.addEventListener("click", (e) => {
        const link = e.target.closest("[data-scroll-app]");
        if (!link) return;
        e.preventDefault();
        const card = grid.querySelector(`[data-app-id="${link.dataset.scrollApp}"]`);
        document.getElementById("apps")?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
        card?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
      });
    }
  }

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
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }

  function initParallax() {
    if (prefersReducedMotion) return;
    const cover = document.querySelector(".hero-cover-img");
    if (!cover) return;

    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY * 0.35;
        cover.style.transform = `translate3d(0, ${y}px, 0) scale(1.08)`;
      },
      { passive: true }
    );
  }

  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initStudioBranding();
    renderOrbit();
    renderFeaturedStrip();
    renderApps();
    initFAQ();
    initReveal();
    initParallax();
  });
})();
