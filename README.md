# Agile Conqueror Company — Website

Official studio website for **Agile Conqueror Company**, published via GitHub Pages.

**Live URL:** [https://cevik10.github.io/](https://cevik10.github.io/)

## Structure

```text
/
├── index.html          # Home, Apps, About, Support
├── privacy.html        # Privacy Policy
├── terms.html          # Terms of Use
├── app-ads.txt         # AdMob verification (do not remove)
├── css/styles.css      # Constellation Craft design system
├── js/
│   ├── apps.js         # App catalog & FAQ data — edit store links here
│   └── main.js         # Nav, filters, FAQ, animations
└── assets/images/      # OG image placeholder
```

## Editing Apps

Open `js/apps.js` and update the `APPS` array. Each app supports:

- `appStore` — App Store URL (use `#` or developer page until ready)
- `googlePlay` — Google Play URL
- `comingSoon` — `true` hides store buttons for unreleased apps

## Local Preview

```bash
cd cevik10.github.io
python3 -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080)

## GitHub Pages Deployment

This repo (`cevik10.github.io`) publishes automatically to the root domain.

1. Push changes to the `main` branch
2. GitHub Pages serves from `/ (root)` — enabled by default for `username.github.io` repos
3. Site updates within 1–3 minutes

To verify Pages settings: **Repository → Settings → Pages → Source: Deploy from branch → main / root**

## Updating Legal Pages

- Privacy: `privacy.html`
- Terms: `terms.html`

Update the "Last updated" date when making changes.

## Brand

- **Studio:** Agile Conqueror Company
- **Tagline:** Always for the better...
- **Support:** hakanxcevik7@gmail.com

---

© Agile Conqueror Company — Founded by Hakan Cevik
