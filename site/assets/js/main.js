/*
  MightyFix — shared UI
  Injects the icon sprite, header, mobile drawer, CTA band, footer and modals,
  then wires up menus, carousels, forms and scroll reveals.
  Header/footer are rendered here so all pages share one source while the
  site is static. Move them into server templates when this goes to a CMS.
*/

/* ---------- Icons (2px stroke, sharp corners — per brand icon grid) ---------- */
const ICONS = {
  "arrow-right": '<path d="M4 12h15M13 6l6 6-6 6"/>',
  "arrow-left": '<path d="M20 12H5M11 6l-6 6 6 6"/>',
  "chevron-down": '<path d="M6 9l6 6 6-6"/>',
  "chevron-right": '<path d="M9 6l6 6-6 6"/>',
  menu: '<path d="M3 7h18M3 12h18M3 17h18"/>',
  close: '<path d="M5 5l14 14M19 5L5 19"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  file: '<path d="M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h7"/>',
  mail: '<path d="M3 5h18v14H3zM3 7l9 6 9-6"/>',
  phone: '<path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
  pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16v1"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
  droplet: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  flame: '<path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3-1-5.5 1-8.5z"/>',
  thermo: '<path d="M10 4a2 2 0 0 1 4 0v10.5a4 4 0 1 1-4 0z"/><path d="M12 10v7"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  headset: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><path d="M4 14h3v6H4zM17 14h3v6h-3z"/>',
  building: '<path d="M4 3h16v18H4zM9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3"/>',
  factory: '<path d="M3 21V10l6 4v-4l6 4V5h6v16zM7 17h2M12 17h2M17 17h2"/>',
  home: '<path d="M3 11l9-8 9 8M5 9v12h14V9M10 21v-6h4v6"/>',
  truck: '<path d="M2 6h12v10H2zM14 9h4l3 3v4h-7"/><circle cx="6.5" cy="18" r="2"/><circle cx="17.5" cy="18" r="2"/>',
  link: '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/>',
  grid: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',
  wrench: '<path d="M14.5 6.5a4 4 0 0 0 5 5L21 13l-8 8-3-3 8-8M14.5 6.5L13 5a4 4 0 0 0-5 5l-5 5 3 3 5-5"/>',
  calendar: '<path d="M4 5h16v16H4zM4 10h16M8 3v4M16 3v4"/>',
  play: { fill: true, d: '<path d="M8 5v14l11-7z"/>' },
  linkedin: { fill: true, d: '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.95 1.32-1.95 2.69V21h-4z"/>' },
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5v.01"/>',
  facebook: { fill: true, d: '<path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v7h4v-7h3l.5-4h-3.5V9c0-.6.4-1 1-1z"/>' },
  youtube: { fill: true, d: '<path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12c0 1.3.1 2.5.4 3.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8 0-1.3-.1-2.5-.4-3.8zM10 15.2V8.8l5.2 3.2z"/>' },
};

function sprite() {
  const symbols = Object.entries(ICONS).map(([k, v]) => {
    const filled = typeof v === "object";
    const attrs = filled
      ? 'fill="currentColor" stroke="none"'
      : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter"';
    return `<symbol id="i-${k}" viewBox="0 0 24 24" ${attrs}>${filled ? v.d : v}</symbol>`;
  });
  return `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>${symbols.join("")}</defs></svg>`;
}
const ic = (name, cls = "icon") => `<svg class="${cls}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;
const btn = (label, { href, cls = "", icon = "arrow-right", attrs = "" } = {}) =>
  href
    ? `<a class="btn ${cls}" href="${href}" ${attrs}><span class="btn__tile">${ic(icon)}</span>${label}</a>`
    : `<button type="button" class="btn ${cls}" ${attrs}><span class="btn__tile">${ic(icon)}</span>${label}</button>`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const param = (k) => new URLSearchParams(location.search).get(k);

/* ---------- Drawn pack illustrations (used until a product has a real pack shot) ---------- */
function packLabel(name) {
  const words = name.replace(/^(MightyFix|MightyBond|MightySeal|MightyGrip|MightyFoam|MightyTape)\s*/i, "").toUpperCase().split(" ");
  if (words.length <= 2) return words;
  return [words.slice(0, Math.ceil(words.length / 2)).join(" "), words.slice(Math.ceil(words.length / 2)).join(" ")];
}
const packSize = (p) => { const m = p.size.match(/\d+(?:\.\d+)?\s?(ml|g|kg|l|mm)/i); return m ? m[0].replace(/\s/, "").replace(/([a-z]+)$/i, " $1").toUpperCase() : ""; };
function packSVG(product, extraClass = "") {
  // Real pack shot when we have one; drawn placeholder otherwise.
  if (product.image) return `<img class="pack-photo ${extraClass}" src="${product.image}" alt="${esc(product.name)}, ${esc(product.size)}${product.colour ? `, ${esc(product.colour.toLowerCase())}` : ""}" width="726" height="726" loading="lazy">`;
  const cat = byCat(product.cat);
  const color = cat ? cat.color : "#88C0D1";
  const label = packLabel(product.name);
  const aria = `role="img" aria-label="${esc(product.name)} pack illustration"`;
  const lines = (x, y, size, fill = "#fff") =>
    label.map((t, i) => `<text x="${x}" y="${y + i * (size + 2)}" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-weight="800" font-size="${t.length > 9 ? size * 0.72 : size}" letter-spacing="-0.5" fill="${fill}">${esc(t)}</text>`).join("");
  const pack = cat ? cat.pack : "cartridge";

  if (pack === "can") {
    return `<svg class="${extraClass}" viewBox="0 0 140 400" ${aria}>
      <rect x="60" y="6" width="20" height="26" fill="#c9d3dd"/><rect x="50" y="26" width="40" height="12" fill="#e8edf2"/>
      <path d="M26 80 Q26 38 70 38 Q114 38 114 80 Z" fill="#0b2a63"/>
      <rect x="26" y="78" width="88" height="306" fill="#001F55"/>
      <rect x="34" y="78" width="9" height="306" fill="#fff" opacity=".08"/>
      <image href="assets/img/symbol-white.png" x="40" y="104" width="60" height="40"/>
      <text x="70" y="164" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-weight="700" font-size="11" fill="#88C0D1">MightyFix</text>
      ${lines(70, 210, 17)}
      <rect x="26" y="290" width="88" height="42" fill="${color}"/>
      <text x="70" y="316" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-weight="700" font-size="11" fill="#001F55">${esc(packSize(product))}</text>
      <rect x="26" y="374" width="88" height="14" fill="#0b2a63"/>
    </svg>`;
  }
  if (pack === "tape") {
    return `<svg class="${extraClass}" viewBox="0 0 300 300" ${aria}>
      <circle cx="150" cy="150" r="138" fill="#001F55"/>
      <circle cx="150" cy="150" r="138" fill="none" stroke="${color}" stroke-width="14"/>
      <circle cx="150" cy="150" r="70" fill="#eef6fa"/><circle cx="150" cy="150" r="70" fill="none" stroke="#c9d3dd" stroke-width="8"/>
      <image href="assets/img/symbol-white.png" x="120" y="30" width="60" height="40"/>
      ${lines(150, 252, 18)}
      <text x="150" y="98" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-weight="700" font-size="11" fill="#88C0D1">MightyFix</text>
    </svg>`;
  }
  return `<svg class="${extraClass}" viewBox="0 0 120 400" ${aria}>
    <path d="M55 4h10l7 74H48z" fill="#f4f7fa" stroke="#c9d3dd" stroke-width="1.5"/>
    <rect x="40" y="78" width="40" height="18" fill="#dfe6ec"/>
    <path d="M20 114 Q20 96 40 96 H80 Q100 96 100 114 Z" fill="#0b2a63"/>
    <rect x="20" y="112" width="80" height="268" fill="#001F55"/>
    <rect x="27" y="112" width="8" height="268" fill="#fff" opacity=".08"/>
    <image href="assets/img/symbol-white.png" x="33" y="128" width="54" height="36"/>
    <text x="60" y="182" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-weight="700" font-size="10.5" fill="#88C0D1">MightyFix</text>
    ${lines(60, 224, 16)}
    <rect x="20" y="300" width="80" height="36" fill="${color}"/>
    <text x="60" y="323" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-weight="700" font-size="10" fill="#001F55">${esc(packSize(product))}</text>
    <rect x="20" y="376" width="80" height="16" fill="#0b2a63"/>
  </svg>`;
}

/* ---------- Card renderers ---------- */
function productCard(p) {
  const cat = byCat(p.cat);
  return `<article class="pcard" data-reveal>
    <div class="pcard__media">
      <span class="pcard__band" style="background:${cat.color}" title="${esc(cat.name)}"></span>
      ${p.status === "coming-soon" ? `<span class="soon-badge pcard__soon">Coming soon</span>` : ""}
      ${packSVG(p)}
      <span class="pcard__go" aria-hidden="true">${ic("arrow-right")}</span>
    </div>
    <div class="pcard__body">
      <h3 class="pcard__title"><a href="product.html?p=${p.slug}">${esc(p.name)}</a></h3>
      <ul class="pcard__dots">${p.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
    </div>
  </article>`;
}
function tile({ href, title, photo, band, cls = "" }) {
  return `<a class="tile ${cls}" href="${href}" data-reveal>
    <span class="tile__media">
      <img src="${IMG(PHOTOS[photo], 900)}" alt="" loading="lazy" width="900" height="558">
      ${band ? `<span class="tile__band" style="background:${band}"></span>` : ""}
      <span class="tile__arrow">${ic("arrow-right")}</span>
    </span>
    <span class="tile__title">${esc(title)}</span>
  </a>`;
}
function articleCard(a, { boxed = false } = {}) {
  return `<article class="acard ${boxed ? "acard--boxed" : ""}" data-reveal>
    <div class="acard__media"><img src="${IMG(PHOTOS[a.photo], 800)}" alt="" loading="lazy" width="800" height="500"></div>
    <div class="acard__body">
      <p class="acard__meta"><span class="type">${esc(a.type)}</span></p>
      <h3 class="acard__title"><a href="article.html?id=${a.id}">${esc(a.title)}</a></h3>
    </div>
  </article>`;
}
function videoCard(v) {
  return `<article class="acard" data-reveal>
    <div class="acard__media"><img src="${IMG(PHOTOS[v.photo], 800)}" alt="" loading="lazy" width="800" height="500">
      <span class="acard__play">${ic("play")}</span></div>
    <div class="acard__body">
      <p class="acard__meta"><span class="type">MightyFix shorts</span></p>
      <h3 class="acard__title"><a href="#" data-open="video" data-video-title="${esc(v.title)}">${esc(v.title)}</a></h3>
    </div>
  </article>`;
}
function caseCard(c, { boxed = false } = {}) {
  const sector = SECTORS.find((s) => s.slug === c.sector);
  return `<article class="acard ${boxed ? "acard--boxed" : ""}" data-reveal>
    <div class="acard__media"><img src="${IMG(PHOTOS[c.photo], 800)}" alt="" loading="lazy" width="800" height="500"></div>
    <div class="acard__body">
      <p class="acard__meta"><span class="type">Case study</span><span>${esc(sector ? sector.name : "")}</span></p>
      <h3 class="acard__title"><a href="case-study.html?id=${c.id}">${esc(c.title)}</a></h3>
      <span class="link-arrow" aria-hidden="true">Read the story ${ic("arrow-right")}</span>
    </div>
  </article>`;
}

/* Data-attribute hooks so static pages can drop in lists */
function renderHooks(root = document) {
  root.querySelectorAll("[data-products]").forEach((el) => {
    const d = el.dataset;
    let list = PRODUCTS.slice();
    if (d.cat) list = list.filter((p) => p.cat === d.cat);
    if (d.range) list = list.filter((p) => p.range === d.range);
    if (d.group) list = list.filter((p) => p.group === d.group);
    if (d.sector) list = list.filter((p) => p.sectors.includes(d.sector));
    if (d.app) list = list.filter((p) => p.apps.includes(d.app));
    if (d.slugs) list = d.slugs.split(",").map(byProduct).filter(Boolean);
    if (d.exclude) list = list.filter((p) => p.slug !== d.exclude);
    if (d.limit) list = list.slice(0, +d.limit);
    el.innerHTML = list.length
      ? list.map(productCard).join("")
      : `<div class="empty"><h3>No products listed here yet</h3><p>Products for this group are on their way. Talk to our team in the meantime.</p></div>`;
  });
  root.querySelectorAll("[data-category-tiles]").forEach((el) => {
    el.innerHTML = CATEGORIES.map((c) => tile({ href: `product-category.html?c=${c.slug}`, title: c.name, photo: c.photo, band: c.color })).join("");
  });
  root.querySelectorAll("[data-sector-tiles]").forEach((el) => {
    el.innerHTML = SECTORS.map((s) => tile({ href: `application.html?a=${s.slug}`, title: s.name, photo: s.photo })).join("");
  });
  root.querySelectorAll("[data-app-tiles]").forEach((el) => {
    const s = SECTORS.find((x) => x.slug === el.dataset.appTiles);
    if (s) el.innerHTML = s.children.map((c) => tile({ href: `application.html?a=${c.slug}`, title: c.name, photo: c.photo, cls: "tile--short" })).join("");
  });
  root.querySelectorAll("[data-articles]").forEach((el) => {
    const n = +el.dataset.articles || ARTICLES.length;
    const skip = +(el.dataset.skip || 0);
    el.innerHTML = ARTICLES.slice(skip, skip + n).map((a) => articleCard(a)).join("");
  });
  root.querySelectorAll("[data-videos]").forEach((el) => { el.innerHTML = VIDEOS.map(videoCard).join(""); });
  root.querySelectorAll("[data-cases]").forEach((el) => {
    let list = CASE_STUDIES.slice();
    if (el.dataset.sector) list = list.filter((c) => c.sector === el.dataset.sector);
    if (el.dataset.exclude) list = list.filter((c) => c.id !== el.dataset.exclude);
    const n = +el.dataset.cases || list.length;
    el.innerHTML = list.slice(0, n).map((c) => caseCard(c, { boxed: el.hasAttribute("data-boxed") })).join("");
  });
  root.querySelectorAll("[data-pack]").forEach((el) => {
    const p = byProduct(el.dataset.pack);
    if (p) el.innerHTML = packSVG(p);
  });
}

/* ---------- Header / drawer / footer / modals ---------- */
const CURRENT = document.body.dataset.nav || "";

function headerHTML() {
  const catLinks = CATEGORIES.map((c) => `<li><a href="product-category.html?c=${c.slug}">${esc(c.name)}</a></li>`).join("");
  const rangeLinks = RANGES.map((r) => `<li><a href="product-category.html?r=${r.slug}">${esc(r.name)}</a></li>`).join("");
  const sectorCols = SECTORS.map((s) => `<div>
      <a class="mega__heading" href="application.html?a=${s.slug}">${esc(s.name)}</a>
      <ul class="mega__col">${s.children.map((c) => `<li><a href="application.html?a=${c.slug}">${esc(c.name)}</a></li>`).join("")}</ul>
    </div>`).join("");
  const cur = (k) => (CURRENT === k ? 'aria-current="page"' : "");

  return `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" id="site-header">
    <div class="container site-header__bar">
      <a class="brand" href="index.html" aria-label="MightyFix home"><img src="assets/img/wordmark-white.png" alt="MightyFix" width="137" height="28"></a>
      <nav class="nav" aria-label="Main">
        <ul class="nav__list">
          <li class="nav__item"><a class="nav__link" href="products.html" aria-expanded="false" aria-controls="mega-products" ${CURRENT === "products" ? 'data-current="true"' : ""}>Products</a></li>
          <li class="nav__item"><a class="nav__link" href="applications.html" aria-expanded="false" aria-controls="mega-applications" ${CURRENT === "applications" ? 'data-current="true"' : ""}>Applications</a></li>
          <li class="nav__item"><a class="nav__link" href="knowledge-hub.html" ${cur("hub")}>Knowledge hub</a></li>
          <li class="nav__item"><a class="nav__link" href="case-studies.html" ${cur("cases")}>Case studies</a></li>
          <li class="nav__item"><a class="nav__link" href="company.html" ${cur("company")}>Company</a></li>
          <li class="nav__item"><a class="nav__link" href="contact.html" ${cur("contact")}>Contact</a></li>
        </ul>
      </nav>
      <div class="header-actions">
        ${btn("Product finder", { href: "product-finder.html", cls: "btn--light header-cta", icon: "search" })}
        <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="drawer">${ic("menu")}</button>
      </div>
    </div>

    <div class="mega" id="mega-products" role="region" aria-label="Products menu">
      <div class="container mega__inner">
        <ul class="mega__col" aria-label="Product categories">${catLinks}</ul>
        <ul class="mega__col" aria-label="Ranges">${rangeLinks}</ul>
        <div>
          <a class="mega__heading mega__heading--finder" href="product-finder.html">Find the right fix for the job</a><br>
          <a class="mega__finder" href="product-finder.html">${ic("search")}Product finder</a>
        </div>
      </div>
    </div>
    <div class="mega" id="mega-applications" role="region" aria-label="Applications menu">
      <div class="container mega__inner">${sectorCols}</div>
    </div>
  </header>

  <div class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="drawer__top">
      <img src="assets/img/wordmark-white.png" alt="MightyFix" width="117" height="24">
      <button class="menu-toggle" type="button" aria-label="Close menu" data-close-drawer>${ic("close")}</button>
    </div>
    <div class="drawer__panels">
      <div class="drawer__panel is-active" data-panel="root">
        <ul class="drawer__list">
          <li><button type="button" data-go="products">Products ${ic("chevron-right")}</button></li>
          <li><button type="button" data-go="applications">Applications ${ic("chevron-right")}</button></li>
          <li><a href="knowledge-hub.html">Knowledge hub</a></li>
          <li><a href="case-studies.html">Case studies</a></li>
          <li><a href="company.html">Company</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="drawer__panel" data-panel="products">
        <button class="drawer__back" type="button" data-go="root">${ic("arrow-left")} Back</button>
        <ul class="drawer__list"><li><a href="products.html">All products ${ic("arrow-right")}</a></li>${CATEGORIES.map((c) => `<li><a href="product-category.html?c=${c.slug}">${esc(c.name)}</a></li>`).join("")}</ul>
        <p class="drawer__heading">Ranges</p>
        <ul class="drawer__list">${RANGES.map((r) => `<li><a href="product-category.html?r=${r.slug}">${esc(r.name)}</a></li>`).join("")}</ul>
      </div>
      <div class="drawer__panel" data-panel="applications">
        <button class="drawer__back" type="button" data-go="root">${ic("arrow-left")} Back</button>
        <ul class="drawer__list"><li><a href="applications.html">All applications ${ic("arrow-right")}</a></li></ul>
        ${SECTORS.map((s) => `<p class="drawer__heading">${esc(s.name)}</p><ul class="drawer__list"><li><a href="application.html?a=${s.slug}">${esc(s.name)} overview</a></li>${s.children.map((c) => `<li><a href="application.html?a=${c.slug}">${esc(c.name)}</a></li>`).join("")}</ul>`).join("")}
      </div>
    </div>
    <div class="drawer__foot">${btn("Product finder", { href: "product-finder.html", cls: "btn--light btn--block", icon: "search" })}</div>
  </div>`;
}

function footerHTML() {
  return `<footer class="site-footer on-dark">
    <div class="container">
      <div class="footer__upper">
        <div class="footer__signoff">
          <p class="footer__line">Fix it once, fix it right.</p>
          <button type="button" class="btn-solid" data-open="expert">Talk to an expert</button>
        </div>
        <ul class="footer__connect">
          <li><a href="#">${ic("linkedin")}Connect on LinkedIn</a></li>
          <li><a href="#" data-open="newsletter">${ic("mail")}Sign up to our newsletter</a></li>
        </ul>
      </div>
      <div class="footer__lower">
        <p>© ${new Date().getFullYear()} MightyFix</p>
        <ul><li><a href="#">Privacy policy</a></li><li><a href="#">Terms</a></li></ul>
      </div>
    </div>
  </footer>`;
}

/* Modals */
const field = (id, label, { type = "text", req = true, auto = "", hint = "", textarea = false } = {}) => `
  <div class="field">
    <label for="${id}">${label} ${req ? '<span class="req" aria-hidden="true">*</span>' : '<span class="opt">(optional)</span>'}</label>
    ${textarea
      ? `<textarea class="textarea" id="${id}" name="${id}" ${req ? "required" : ""} aria-describedby="${id}-err"></textarea>`
      : `<input class="input" id="${id}" name="${id}" type="${type}" ${auto ? `autocomplete="${auto}"` : ""} ${req ? "required" : ""} aria-describedby="${id}-err${hint ? ` ${id}-hint` : ""}">`}
    ${hint ? `<p class="field__hint" id="${id}-hint">${hint}</p>` : ""}
    <p class="field__error" id="${id}-err">${ic("alert")}<span></span></p>
  </div>`;

function modal(id, title, sub, body, cls = "") {
  return `<dialog class="modal ${cls}" id="modal-${id}" aria-labelledby="modal-${id}-title">
    <div class="modal__band"></div>
    <div class="modal__head"><div><h2 id="modal-${id}-title">${title}</h2>${sub ? `<p>${sub}</p>` : ""}</div>
      <button class="modal__close" type="button" aria-label="Close" data-close-modal>${ic("close")}</button></div>
    <div class="modal__body">${body}</div>
  </dialog>`;
}
function successHTML(title, text) {
  return `<div class="form-success" tabindex="-1"><div class="form-success__icon">${ic("check")}</div><h3 class="h3">${title}</h3><p class="mt-4 muted">${text}</p>
    <div class="mt-6">${btn("Browse products", { href: "products.html" })}</div></div>`;
}
function modalsHTML() {
  const expert = `<form class="form" novalidate data-form>
      <div class="form-summary" role="alert" tabindex="-1"><strong>Please fix the following:</strong><ul></ul></div>
      <div class="form__row form__row--2">${field("ex-first", "First name", { auto: "given-name" })}${field("ex-last", "Last name", { auto: "family-name" })}</div>
      <div class="form__row form__row--2">${field("ex-email", "Email", { type: "email", auto: "email" })}${field("ex-phone", "Phone", { type: "tel", auto: "tel" })}</div>
      ${field("ex-company", "Company", { req: false, auto: "organization" })}
      <fieldset class="field"><legend>Preferred contact method</legend><div class="choice-row">
        <label class="choice"><input type="radio" name="ex-method" value="email" checked><span>Email</span></label>
        <label class="choice"><input type="radio" name="ex-method" value="phone"><span>Phone</span></label></div></fieldset>
      ${field("ex-msg", "How can we help?", { req: false, textarea: true })}
      <button type="submit" class="btn btn--block"><span class="btn__tile">${ic("arrow-right")}</span>Send message</button>
    </form>${successHTML("Thanks — we'll be in touch.", "A member of our team will reply as soon as possible.")}`;

  const news = `<form class="form" novalidate data-form>
      <div class="form-summary" role="alert" tabindex="-1"><strong>Please fix the following:</strong><ul></ul></div>
      <div class="form__row form__row--2">${field("nl-first", "First name", { auto: "given-name" })}${field("nl-email", "Email", { type: "email", auto: "email" })}</div>
      <fieldset class="field"><legend>I'm mostly interested in <span class="opt">(optional)</span></legend><div class="choice-row">
        <label class="choice"><input type="checkbox" name="nl-int" value="construction"><span>Construction</span></label>
        <label class="choice"><input type="checkbox" name="nl-int" value="manufacturing"><span>Manufacturing</span></label>
        <label class="choice"><input type="checkbox" name="nl-int" value="diy"><span>Home & DIY</span></label></div></fieldset>
      <label class="check"><input type="checkbox" required id="nl-consent" aria-describedby="nl-consent-err"><span>I agree to receive emails from MightyFix. Unsubscribe any time. <span class="req" aria-hidden="true">*</span></span></label>
      <p class="field__error" id="nl-consent-err" style="margin-top:-8px">${ic("alert")}<span></span></p>
      <button type="submit" class="btn btn--block"><span class="btn__tile">${ic("arrow-right")}</span>Subscribe</button>
    </form>${successHTML("You're on the list.", "Look out for technical tips, new products and case studies in your inbox.")}`;

  const dl = `<form class="form" novalidate data-form>
      <div class="form-summary" role="alert" tabindex="-1"><strong>Please fix the following:</strong><ul></ul></div>
      <div class="form__row form__row--2">${field("dl-name", "Full name", { auto: "name" })}${field("dl-email", "Email", { type: "email", auto: "email" })}</div>
      <label class="check"><input type="checkbox" name="dl-news"><span>Also send me the MightyFix newsletter</span></label>
      <button type="submit" class="btn btn--block"><span class="btn__tile">${ic("download")}</span>Download</button>
    </form>${successHTML("Thanks — we'll send it over.", "We'll email the data sheet to the address you gave us.")}`;

  return modal("expert", "Talk to an expert", "Tell us about the job — we'll recommend the right product.", expert)
    + modal("newsletter", "Sign up to our newsletter", "Technical insights, new products and case studies. No spam.", news)
    + modal("download", "Download data sheet", '<span data-dl-name>Technical data sheet</span>', dl)
    + `<dialog class="modal modal--video" id="modal-video" aria-labelledby="modal-video-title">
        <div class="modal__head" style="background:#000;color:#fff"><div><h2 id="modal-video-title">Brand film</h2></div>
        <button class="modal__close" type="button" aria-label="Close" data-close-modal>${ic("close")}</button></div>
        <div class="video-placeholder"><div><p>Coming soon</p><p class="lead" style="color:#fff;margin-top:8px">This video is in production.</p></div></div>
      </dialog>`;
}

/* ---------- Behaviour ---------- */
function initHeader() {
  const header = document.getElementById("site-header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mega menus open on hover like sabreadhesives.com. Touch: first tap opens, second follows the link.
  // Keyboard: ArrowDown/Space opens and moves into the panel; Escape closes.
  const triggers = [...header.querySelectorAll(".nav__link[aria-controls]")];
  const panelOf = (t) => document.getElementById(t.getAttribute("aria-controls"));
  let closeTimer = null, lastPointer = "mouse";
  const setOpen = (t, open) => { t.setAttribute("aria-expanded", String(open)); panelOf(t).classList.toggle("is-open", open); };
  const closeAll = (except) => triggers.forEach((t) => { if (t !== except) setOpen(t, false); });
  const openMenu = (t) => { clearTimeout(closeTimer); closeAll(t); setOpen(t, true); };
  const scheduleClose = () => { clearTimeout(closeTimer); closeTimer = setTimeout(() => closeAll(), 180); };

  header.addEventListener("pointerdown", (e) => { lastPointer = e.pointerType; });
  triggers.forEach((t) => {
    const panel = panelOf(t);
    const item = t.closest(".nav__item");
    item.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") openMenu(t); });
    item.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") scheduleClose(); });
    panel.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") clearTimeout(closeTimer); });
    panel.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") scheduleClose(); });
    t.addEventListener("click", (e) => {
      if (lastPointer !== "mouse" && t.getAttribute("aria-expanded") !== "true") { e.preventDefault(); openMenu(t); }
    });
    t.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === " ") { e.preventDefault(); openMenu(t); panel.querySelector("a")?.focus(); }
    });
  });
  header.addEventListener("focusout", (e) => { if (!header.contains(e.relatedTarget)) closeAll(); });
  document.addEventListener("click", (e) => { if (!header.contains(e.target)) closeAll(); });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const open = triggers.find((t) => t.getAttribute("aria-expanded") === "true");
    if (open) { closeAll(); open.focus(); }
  });

  // Drawer
  const drawer = document.getElementById("drawer");
  const openBtn = header.querySelector(".menu-toggle");
  const panels = [...drawer.querySelectorAll(".drawer__panel")];
  const go = (name) => panels.forEach((p) => {
    const active = p.dataset.panel === name;
    p.classList.toggle("is-active", active);
    p.classList.toggle("is-behind", !active && p.dataset.panel === "root" && name !== "root");
    if (active) p.querySelector("a, button")?.focus({ preventScroll: true });
  });
  const setDrawer = (open) => {
    drawer.classList.toggle("is-open", open);
    document.body.classList.toggle("no-scroll", open);
    openBtn.setAttribute("aria-expanded", String(open));
    if (open) { go("root"); drawer.querySelector("[data-close-drawer]").focus(); }
    else openBtn.focus();
  };
  openBtn.addEventListener("click", () => setDrawer(true));
  drawer.querySelector("[data-close-drawer]").addEventListener("click", () => setDrawer(false));
  drawer.addEventListener("click", (e) => { const b = e.target.closest("[data-go]"); if (b) go(b.dataset.go); });
  drawer.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setDrawer(false);
    if (e.key !== "Tab") return;
    const f = [...drawer.querySelectorAll(".drawer__top button, .drawer__panel.is-active a, .drawer__panel.is-active button, .drawer__foot a")];
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
}

function initModals() {
  let lastTrigger = null;
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-open]");
    if (t) {
      e.preventDefault();
      const dlg = document.getElementById(`modal-${t.dataset.open}`);
      if (!dlg) return;
      lastTrigger = t;
      resetForm(dlg);
      if (t.dataset.dlName) dlg.querySelector("[data-dl-name]").textContent = t.dataset.dlName;
      if (t.dataset.videoTitle) dlg.querySelector("h2").textContent = t.dataset.videoTitle;
      document.querySelectorAll(".mega.is-open").forEach((m) => m.classList.remove("is-open"));
      document.querySelectorAll('.nav__link[aria-expanded="true"]').forEach((b) => b.setAttribute("aria-expanded", "false"));
      dlg.showModal();
      return;
    }
    if (e.target.closest("[data-close-modal]")) e.target.closest("dialog").close();
  });
  document.querySelectorAll("dialog.modal").forEach((dlg) => {
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); }); // backdrop
    dlg.addEventListener("close", () => { lastTrigger?.focus?.(); });
  });
}

/* Forms: validate on blur after first interaction, summary + focus on submit */
function fieldError(input) {
  if (input.type === "checkbox") return input.required && !input.checked ? "Please tick this box to continue." : "";
  const v = input.value.trim();
  const name = input.labels?.[0]?.textContent.replace(/\*|\(optional\)/g, "").trim() || "This field";
  if (input.required && !v) return `Enter your ${name.toLowerCase()}.`;
  if (v && input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter an email address like name@company.com.";
  if (v && input.type === "tel" && v.replace(/\D/g, "").length < 7) return "Enter a phone number with at least 7 digits.";
  return "";
}
function showError(input, msg) {
  const holder = input.closest(".field") || input.closest(".check");
  const err = document.getElementById(input.getAttribute("aria-describedby")?.split(" ")[0]);
  if (holder?.classList.contains("field")) holder.classList.toggle("has-error", !!msg);
  if (err) { err.querySelector("span").textContent = msg; err.style.display = msg ? "flex" : "none"; }
  input.setAttribute("aria-invalid", msg ? "true" : "false");
}
function resetForm(scope) {
  scope.querySelectorAll("form[data-form]").forEach((f) => {
    f.reset(); f.hidden = false;
    f.querySelectorAll("input, textarea").forEach((i) => { i.dataset.touched = ""; showError(i, ""); });
    f.querySelector(".form-summary")?.classList.remove("is-visible");
    const s = f.parentElement.querySelector(".form-success"); s?.classList.remove("is-visible");
    const b = f.querySelector('[type="submit"]'); b.disabled = false; b.classList.remove("is-loading");
  });
}
function initForms(root = document) {
  root.querySelectorAll("form[data-form]").forEach((form) => {
    const inputs = [...form.querySelectorAll("input[required], input[type=email], input[type=tel], textarea[required]")];
    inputs.forEach((i) => {
      i.addEventListener("blur", () => { if (i.value || i.dataset.touched) { i.dataset.touched = "1"; showError(i, fieldError(i)); } });
      i.addEventListener("input", () => { if (i.getAttribute("aria-invalid") === "true") showError(i, fieldError(i)); });
      if (i.type === "checkbox") i.addEventListener("change", () => showError(i, fieldError(i)));
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const errors = inputs.map((i) => { i.dataset.touched = "1"; const m = fieldError(i); showError(i, m); return m ? { i, m } : null; }).filter(Boolean);
      const summary = form.querySelector(".form-summary");
      if (errors.length) {
        if (errors.length > 1 && summary) {
          summary.querySelector("ul").innerHTML = errors.map(({ i, m }) => `<li><a href="#${i.id}">${esc(m)}</a></li>`).join("");
          summary.classList.add("is-visible"); summary.focus();
        } else { summary?.classList.remove("is-visible"); errors[0].i.focus(); }
        return;
      }
      summary?.classList.remove("is-visible");
      const b = form.querySelector('[type="submit"]');
      b.disabled = true; b.classList.add("is-loading");
      b.querySelector(".btn__tile").innerHTML = ic("clock");
      setTimeout(() => {
        form.hidden = true;
        const s = form.parentElement.querySelector(".form-success");
        s.classList.add("is-visible"); s.focus();
        b.querySelector(".btn__tile").innerHTML = ic("arrow-right");
      }, 900);
    });
    form.addEventListener("click", (e) => {
      const a = e.target.closest(".form-summary a");
      if (a) { e.preventDefault(); document.getElementById(a.getAttribute("href").slice(1))?.focus(); }
    });
  });
}

function initCarousels(root = document) {
  root.querySelectorAll("[data-carousel]").forEach((c) => {
    const track = c.querySelector(".carousel__track");
    const slides = [...track.children];
    const count = c.querySelector(".carousel__count");
    const prev = c.querySelector("[data-prev]"), next = c.querySelector("[data-next]");
    let i = 0;
    slides.forEach((s, n) => { s.setAttribute("role", "group"); s.setAttribute("aria-roledescription", "slide"); s.setAttribute("aria-label", `${n + 1} of ${slides.length}`); });
    const go = (n) => {
      i = (n + slides.length) % slides.length;
      track.style.transform = `translateX(${-i * 100}%)`;
      slides.forEach((s, n2) => { s.inert = n2 !== i; s.setAttribute("aria-hidden", String(n2 !== i)); });
      if (count) count.textContent = `${String(i + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    };
    prev?.addEventListener("click", () => go(i - 1));
    next?.addEventListener("click", () => go(i + 1));
    let x0 = null;
    track.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") x0 = e.clientX; });
    track.addEventListener("pointerup", (e) => { if (x0 === null) return; const dx = e.clientX - x0; if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1)); x0 = null; });
    go(0);
  });
}

function initReveal(root = document) {
  // One entrance per page: only the opening section fades in. Everything else is simply there.
  const opener = document.querySelector("#page > section, #main > section");
  root.querySelectorAll("[data-reveal]").forEach((el) => { if (!opener || !opener.contains(el)) el.removeAttribute("data-reveal"); });
  const els = root.querySelectorAll("[data-reveal]:not(.is-in)");
  if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("is-in")); return; }
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
  }), { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
  // stagger siblings in grids
  els.forEach((el) => {
    const sibs = el.parentElement ? [...el.parentElement.children].filter((s) => s.hasAttribute("data-reveal")) : [];
    const idx = sibs.indexOf(el);
    if (idx > 0 && !el.style.getPropertyValue("--d")) el.style.setProperty("--d", `${Math.min(idx, 6) * 60}ms`);
    io.observe(el);
  });
  // safety net: never leave content hidden
  setTimeout(() => root.querySelectorAll("[data-reveal]:not(.is-in)").forEach((e) => {
    const r = e.getBoundingClientRect(); if (r.top < innerHeight) e.classList.add("is-in");
  }), 1500);
}

function initSubnav() {
  // Works for the horizontal sub-nav and the product page's sticky side menu
  document.querySelectorAll(".subnav, .prod-nav").forEach(watchNav);
}
function watchNav(nav) {
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const targets = links.map((a) => document.getElementById(a.getAttribute("href").slice(1))).filter(Boolean);
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${en.target.id}`));
  }), { rootMargin: "-40% 0px -55% 0px" });
  targets.forEach((t) => io.observe(t));
}

/* Re-init helpers for page scripts that render after load */
window.MF = { ic, btn, esc, param, packSVG, productCard, tile, articleCard, caseCard, renderHooks, initReveal, initCarousels, initForms, initSubnav };

/* ---------- Boot ---------- */
(function boot() {
  document.body.insertAdjacentHTML("afterbegin", sprite() + headerHTML());
  const main = document.getElementById("main");
  document.body.insertAdjacentHTML("beforeend", footerHTML() + modalsHTML());

  if (typeof window.renderPage === "function") window.renderPage();
  renderHooks();
  initHeader();
  initModals();
  initForms();
  initCarousels();
  initSubnav();
  initReveal();
})();
