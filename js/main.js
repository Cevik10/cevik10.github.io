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

    document.querySelectorAll("[data-studio-logo]").forEach((el) => {
      el.src = STUDIO.logo;
      if (!el.alt) el.alt = STUDIO.name;
    });

    const favicon = document.getElementById("dynamic-favicon");
    if (favicon && STUDIO.logo) favicon.href = STUDIO.logo;

    const statApps = document.getElementById("stat-apps");
    if (statApps && typeof APPS !== "undefined") statApps.textContent = APPS.length;
  }

  /* Animated canvas starfield with parallax + twinkle + shooting stars */
  function initStarfield() {
    const canvas = document.getElementById("star-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, dpr, stars, shooting, mouseX = 0, mouseY = 0, raf;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    }

    function buildStars() {
      const count = Math.min(220, Math.floor((w * h) / 7000));
      stars = [];
      for (let i = 0; i < count; i++) {
        const layer = Math.random();
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: layer < 0.7 ? Math.random() * 1.1 + 0.3 : Math.random() * 1.8 + 0.8,
          depth: layer < 0.7 ? 0.3 : layer < 0.9 ? 0.6 : 1,
          tw: Math.random() * Math.PI * 2,
          twSpeed: Math.random() * 0.02 + 0.005,
          hue: Math.random() < 0.15 ? 200 : Math.random() < 0.3 ? 45 : 0
        });
      }
    }

    function spawnShooting() {
      if (shooting || Math.random() > 0.012) return;
      shooting = {
        x: Math.random() * w * 0.7,
        y: Math.random() * h * 0.4,
        len: Math.random() * 120 + 80,
        speed: Math.random() * 6 + 6,
        angle: Math.PI / 6 + Math.random() * 0.3,
        life: 1
      };
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const px = (mouseX - w / 2) * 0.012;
      const py = (mouseY - h / 2) * 0.012;

      for (const s of stars) {
        s.tw += s.twSpeed;
        const alpha = 0.35 + Math.abs(Math.sin(s.tw)) * 0.65;
        const x = s.x + px * s.depth * 8;
        const y = s.y + py * s.depth * 8;
        let color;
        if (s.hue === 200) color = `rgba(120,210,255,${alpha})`;
        else if (s.hue === 45) color = `rgba(255,220,150,${alpha})`;
        else color = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        if (s.depth === 1) { ctx.shadowBlur = 6; ctx.shadowColor = color; } else { ctx.shadowBlur = 0; }
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      spawnShooting();
      if (shooting) {
        const s = shooting;
        const dx = Math.cos(s.angle) * s.len;
        const dy = Math.sin(s.angle) * s.len;
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - dx, s.y - dy);
        grad.addColorStop(0, `rgba(255,255,255,${s.life})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - dx, s.y - dy);
        ctx.stroke();
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.life -= 0.012;
        if (s.life <= 0 || s.x > w + 200 || s.y > h + 200) shooting = null;
      }

      raf = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", (e) => { mouseX = e.clientX; mouseY = e.clientY; }, { passive: true });
    }
    resize();
    if (prefersReducedMotion) {
      // draw a single static frame
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.fill();
      }
    } else {
      raf = requestAnimationFrame(draw);
    }
  }

  function renderOrbit() {
    const ring = document.getElementById("orbit-ring");
    if (!ring || typeof HERO_ORBIT_APPS === "undefined") return;

    const items = HERO_ORBIT_APPS.filter((a) => a.icon);
    const count = items.length;
    const radiusPct = 41;

    items.forEach((app, i) => {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      const x = 50 + Math.cos(angle) * radiusPct;
      const y = 50 + Math.sin(angle) * radiusPct;

      const node = document.createElement("a");
      node.className = "orbit-app";
      node.href = "#apps";
      node.style.left = x + "%";
      node.style.top = y + "%";
      node.style.animationDelay = i * -0.7 + "s";
      node.title = app.name;
      node.setAttribute("aria-label", app.name);
      node.innerHTML = `<img src="${app.icon}" alt="" loading="lazy" />`;
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

    const comingSoon = app.comingSoon ? '<span class="coming-soon-badge">Soon</span>' : "";

    const shot = app.screenshot
      ? `<div class="app-shot-wrap">
          <img class="app-shot" src="${app.screenshot}" alt="${app.name} screenshot" loading="lazy" />
          <div class="app-shot-fade"></div>
        </div>`
      : `<div class="app-shot-wrap app-shot-wrap--empty">
          <img class="app-icon-ghost" src="${app.icon}" alt="" loading="lazy" />
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
      <article class="panel app-card" data-category="${app.category}" data-accent="${app.accent}" data-app-id="${app.id}">
        <div class="app-card-head">
          <img class="app-icon-big" src="${app.icon}" alt="${app.name} icon" width="76" height="76" loading="lazy" />
          <div class="app-head-text">
            <span class="app-badge">${app.categoryLabel}</span>${comingSoon}
            <h3 class="app-name">${app.name}</h3>
          </div>
        </div>
        ${shot}
        <div class="app-card-body">
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

  function showAllReveals() {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
  }

  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      showAllReveals();
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
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    items.forEach((el) => observer.observe(el));

    // Safety net: never leave content hidden if the observer doesn't fire.
    setTimeout(showAllReveals, 1500);
  }

  function safe(fn) {
    try { fn(); } catch (err) { console.error("[ACC]", fn.name, err); }
  }

  function boot() {
    safe(initNav);
    safe(initStudioBranding);
    safe(initStarfield);
    safe(renderOrbit);
    safe(renderFeaturedStrip);
    safe(renderApps);
    safe(initFAQ);
    safe(initReveal);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
