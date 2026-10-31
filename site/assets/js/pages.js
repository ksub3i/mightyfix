/*
  MightyFix — template renderers.
  Pages with <body data-page="..."> are filled from data.js using URL params,
  e.g. product.html?p=mightyseal-ms40, product-category.html?c=sealants,
  application.html?a=roofing. One template per page type, like the CMS will.
*/

const slugify = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const crumbs = (items) => `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items.map((it, i) =>
  i === items.length - 1 ? `<li><span aria-current="page">${MF.esc(it[0])}</span></li>` : `<li><a href="${it[1]}">${MF.esc(it[0])}</a></li>`).join("")}</ol></nav>`;
const arrowLink = (label, href) => `<a class="link-arrow" href="${href}">${MF.esc(label)} ${MF.ic("arrow-right")}</a>`;
const setTitle = (t) => { document.title = `${t} — MightyFix`; };
const notFound = (what, href, label) => `<section class="section"><div class="container"><div class="empty">
  <h3>We couldn't find that ${what}</h3><p>The link may be out of date. Try browsing instead.</p>
  <div class="mt-5">${MF.btn(label, { href })}</div></div></div></section>`;

/* ---------------- Products overview ---------------- */
function renderProducts(el) {
  el.innerHTML = `
  <section class="page-hero page-hero--split" aria-labelledby="ph-title">
    <div class="container page-hero__grid">
      <div class="page-hero__text">
        ${crumbs([["Home", "index.html"], ["Products"]])}
        <p class="eyebrow">Products</p>
        <h1 id="ph-title" class="mt-5">Proven performance for every job.</h1>
        <p class="lead">Placeholder — sealants, adhesives, foams, tapes and prep products for construction, manufacturing and the home.</p>
        <div class="page-hero__actions">${MF.btn("Product finder", { href: "product-finder.html", cls: "btn--light", icon: "search" })}${MF.btn("Talk to an expert", { cls: "btn--white", icon: "headset", attrs: 'data-open="expert"' })}</div>
      </div>
      <div class="page-hero__media"><img src="${IMG(PHOTOS.tools, 1400)}" alt="" width="1400" height="900"></div>
    </div>
  </section>
  <nav class="subnav" aria-label="Product categories"><div class="container"><span class="subnav__label">Show me</span>
    ${CATEGORIES.map((c) => `<a href="#${c.slug}">${MF.esc(c.name)}</a>`).join("")}</div></nav>
  ${CATEGORIES.map((c, i) => {
    const count = PRODUCTS.filter((p) => p.cat === c.slug).length;
    return `<section class="section ${i % 2 ? "section--paper" : ""}" id="${c.slug}" aria-labelledby="cat-${c.slug}">
      <div class="container">
        <div class="section-head">
          <div data-reveal>
            <p class="eyebrow" style="color:var(--ink-2)"><span class="chip__dot" style="background:${c.color}"></span>${count} products</p>
            <h2 id="cat-${c.slug}" class="mt-5">${MF.esc(c.name)}</h2>
            <p class="lead muted">${MF.esc(c.intro)}</p>
          </div>
          ${MF.btn(`All ${c.name.toLowerCase()}`, { href: `product-category.html?c=${c.slug}`, cls: "btn--plain" })}
        </div>
        <div class="products" data-products data-cat="${c.slug}" data-limit="3"></div>
      </div>
    </section>`;
  }).join("")}
  <section class="section section--navy on-dark" aria-labelledby="ranges-title">
    <div class="container">
      <div class="section-head"><div data-reveal><p class="eyebrow">Ranges</p><h2 id="ranges-title" class="mt-5">Five ranges. One standard: it holds.</h2></div></div>
      <div class="grid grid--3">${RANGES.map((r) => `<a class="download" href="product-category.html?r=${r.slug}" data-reveal style="background:var(--azure);border-color:var(--line-dark)">
        <span class="download__icon" style="background:var(--navy)">${MF.ic("box")}</span>
        <span><strong style="color:#fff">${MF.esc(r.name)}</strong><span style="color:rgba(255,255,255,.78)">${MF.esc(r.note)}</span></span>${MF.ic("arrow-right")}</a>`).join("")}</div>
    </div>
  </section>`;
}

/* ---------------- Category / range listing ---------------- */
function renderCategory(el) {
  const c = byCat(MF.param("c") || "");
  const r = RANGES.find((x) => x.slug === MF.param("r"));
  const cat = c || (!r ? CATEGORIES[1] : null);
  let title, intro, photo, color, groups, filter, crumb;

  if (cat) {
    title = cat.name; intro = cat.intro; photo = cat.photo; color = cat.color;
    groups = cat.groups.map((g) => ({ name: g, attrs: `data-cat="${cat.slug}" data-group="${g}"`, n: PRODUCTS.filter((p) => p.cat === cat.slug && p.group === g).length }));
    crumb = "Product categories";
  } else {
    title = r.name; intro = `Placeholder — ${r.note}. ${r.name} brings together the products trades reach for first.`; photo = "crew"; color = "var(--halfbaked)";
    groups = CATEGORIES.map((k) => ({ name: k.name, attrs: `data-range="${r.slug}" data-cat="${k.slug}"`, n: PRODUCTS.filter((p) => p.range === r.slug && p.cat === k.slug).length })).filter((g) => g.n);
    crumb = "Ranges";
  }
  setTitle(title);
  const lower = title.toLowerCase();

  el.innerHTML = `
  <section class="page-hero page-hero--split" aria-labelledby="ph-title">
    <div class="container page-hero__grid">
      <div class="page-hero__text">
        ${crumbs([["Home", "index.html"], ["Products", "products.html"], [title]])}
        <p class="eyebrow">${crumb}</p>
        <h1 id="ph-title" class="mt-5">${MF.esc(title)}</h1>
        <p class="lead">${MF.esc(intro)}</p>
        <div class="page-hero__actions">${MF.btn("Talk to an expert", { cls: "btn--light", icon: "headset", attrs: 'data-open="expert"' })}</div>
      </div>
      <div class="page-hero__media"><img src="${IMG(PHOTOS[photo], 1400)}" alt="" width="1400" height="900"></div>
    </div>
    <span class="page-hero__band" style="background:${color}"></span>
  </section>
  <nav class="subnav" aria-label="Filter ${MF.esc(lower)}"><div class="container"><span class="subnav__label">Show me</span>
    ${groups.map((g) => `<a href="#${slugify(g.name)}">${MF.esc(g.name)} <span class="chip__count">(${g.n})</span></a>`).join("")}</div></nav>
  ${groups.map((g, i) => `
    <section class="section ${i % 2 ? "section--paper" : ""}" id="${slugify(g.name)}" aria-labelledby="g-${slugify(g.name)}">
      <div class="container">
        <div class="section-head" style="margin-bottom:var(--s6)">
          <div data-reveal><h2 id="g-${slugify(g.name)}" class="h2">${MF.esc(g.name)}</h2></div>
        </div>
        <div class="accordion" style="margin-bottom:var(--s6)">
          <details><summary>What ${/s$/.test(g.name) ? "are" : "is"} ${MF.esc(g.name.toLowerCase())}?<span class="acc-icon">${MF.ic("plus")}</span></summary>
            <div class="acc-body"><p>Placeholder — a short, plain-English explainer of this product type: what it is, when to use it, and when to choose something else.</p></div></details>
        </div>
        <div class="products" data-products ${g.attrs}></div>
      </div>
    </section>`).join("")}
  <section class="section" aria-label="About ${MF.esc(lower)}">
    <div class="container split split--even">
      <div class="prose" data-reveal><h2 class="h3" style="margin-top:0">Types of ${MF.esc(lower)}</h2>
        <p>Placeholder — overview copy explaining the main types in this range and how they differ.</p>
        <ul>${groups.map((g) => `<li><strong>${MF.esc(g.name)}</strong> — placeholder one-line description.</li>`).join("")}</ul></div>
      <div class="prose" data-reveal style="--d:120ms"><h2 class="h3" style="margin-top:0">Where they're used</h2>
        <p>Placeholder — typical applications and the trades that use them.</p>
        <ul><li>Joint sealing and gap filling</li><li>Bathrooms and wet areas</li><li>Roofing and exterior facades</li><li>Vehicle and marine manufacturing</li></ul></div>
    </div>
    <div class="container mt-7"><p class="eyebrow">See also</p>
      <div class="see-also mt-5">${CATEGORIES.filter((k) => k.slug !== (cat && cat.slug)).map((k) => `<a class="chip" href="product-category.html?c=${k.slug}"><span class="chip__dot" style="background:${k.color}"></span>${MF.esc(k.name)}</a>`).join("")}</div></div>
  </section>`;
}

/* ---------------- Single product ---------------- */
function renderProduct(el) {
  const p = byProduct(MF.param("p") || "") || PRODUCTS[5];
  const cat = byCat(p.cat);
  const range = RANGES.find((r) => r.slug === p.range);
  const apps = allApps().filter((a) => p.apps.includes(a.slug));
  const real = !!p.real;
  setTitle(p.name);
  const photos = [apps[0]?.photo || cat.photo, apps[1]?.photo || "tools", cat.photo].filter((v, i, a) => a.indexOf(v) === i);
  const accordion = (items) => items.map(([q, a]) => `<details><summary>${MF.esc(q)}<span class="acc-icon">${MF.ic("plus")}</span></summary><div class="acc-body"><p>${MF.esc(a)}</p></div></details>`).join("");

  el.innerHTML = `
  <section class="pdp-hero" aria-labelledby="pdp-title">
    <div class="container" style="padding-top:var(--s5)">${crumbs([["Home", "index.html"], ["Products", "products.html"], [cat.name, `product-category.html?c=${cat.slug}`], [p.name]])}</div>
    <div class="container pdp-hero__grid">
      <div class="pdp-gallery" data-reveal>
        <div class="pdp-gallery__main" id="pdp-main">${MF.packSVG(p)}</div>
        <div class="pdp-gallery__thumbs" role="group" aria-label="Product images">
          <button type="button" aria-pressed="true" aria-label="Pack shot" data-thumb="pack">${MF.packSVG(p)}</button>
          ${photos.map((ph, i) => `<button type="button" aria-pressed="false" aria-label="Application photo ${i + 1}" data-thumb="${ph}"><img src="${IMG(PHOTOS[ph], 300)}" alt=""></button>`).join("")}
        </div>
      </div>
      <div class="pdp-info" data-reveal style="--d:120ms">
        <div class="pdp-meta">
          <a class="badge" href="product-category.html?c=${cat.slug}"><span class="badge__dot" style="background:${cat.color}"></span>${MF.esc(cat.name)}</a>
          ${range ? `<a class="badge" href="product-category.html?r=${range.slug}">${MF.esc(range.name)}</a>` : ""}
          <span class="badge">${MF.esc(p.group)}</span>
        </div>
        <h1 id="pdp-title">${MF.esc(p.name)}</h1>
        <p class="lead">${real ? MF.esc(p.lead) : `${MF.esc(p.tagline)}. Placeholder — one-line benefit statement that leads with the result.`}</p>
        <ul class="ticks ticks--lg">${p.bullets.map((b) => `<li>${MF.ic("check")}${MF.esc(b)}</li>`).join("")}</ul>
        <dl class="spec-strip">
          ${(real ? p.keySpecs : [["clock", "Skin time", "XX min"], ["droplet", "Full cure", "XX hrs"], ["thermo", "Service temp.", "-XX to XX°C"], ["box", "Pack", p.size]])
            .map(([i, k, v]) => `<div><dt>${MF.ic(i)}${MF.esc(k)}</dt><dd${v.length > 10 ? ' style="font-size:.95rem"' : ""}>${MF.esc(v)}</dd></div>`).join("")}
        </dl>
        <div class="pdp-actions">
          ${MF.btn("Talk to an expert", { icon: "headset", attrs: 'data-open="expert"' })}
          ${real
            ? MF.btn("Technical data sheet", { href: p.tds.file, cls: "btn--white", icon: "download", attrs: 'target="_blank" rel="noopener" style="border:1px solid var(--line)"' })
            : MF.btn("Technical data sheet", { cls: "btn--white", icon: "download", attrs: `data-open="download" data-dl-name="${MF.esc(p.name)} — Technical data sheet" style="border:1px solid var(--line)"` })}
        </div>
        ${real ? `<p class="tds-ref">Information from ${MF.esc(p.tds.code)} · ${MF.esc(p.tds.version)} · issued ${MF.esc(p.tds.issued)}</p>` : ""}
      </div>
    </div>
  </section>

  <nav class="subnav" aria-label="On this page"><div class="container">
    <a href="#overview">Overview</a><a href="#applications">Applications</a><a href="#how-to-use">How to use</a><a href="#specs">Specifications</a><a href="#downloads">Downloads</a><a href="#faqs">FAQs</a><a href="#related">Related products</a></div></nav>

  <section class="section" id="overview" aria-labelledby="ov-title">
    <div class="container split">
      <div data-reveal><p class="eyebrow">Overview</p><h2 id="ov-title" class="mt-5 h2">${MF.esc(p.tagline)}.</h2></div>
      ${real ? `<div data-reveal style="--d:120ms">
        <div class="prose"><p>${MF.esc(p.description)}</p></div>
        <h3 class="h4 mt-7" style="color:var(--navy)">Product features</h3>
        <ul class="feature-list mt-5" style="list-style:none;padding:0">${p.features.map(([t, d]) => `<li><strong>${MF.esc(t)}</strong><span>${MF.esc(d)}</span></li>`).join("")}</ul>
        <h3 class="h4 mt-7" style="color:var(--navy)">Recommended substrates</h3>
        <div class="substrates mt-5">${p.substrates.map((s) => `<span class="badge">${MF.esc(s)}</span>`).join("")}</div>
        <p class="mt-5 muted small">Excellent cross-material adhesion. <strong style="color:var(--navy)">Available in:</strong> ${MF.esc(p.packaging)}</p>
      </div>` : `<div class="prose" data-reveal style="--d:120ms">
        <p class="lead">Placeholder — two or three sentences describing what this product does and the problem it solves. Lead with the benefit, then the detail.</p>
        <p>Placeholder — supporting paragraph covering the chemistry, the substrates it bonds to and any approvals or standards it meets. Use real facts: cure times, temperature ranges, surfaces and sizes.</p>
        <p><strong>Available in:</strong> ${MF.esc(p.size)}. Colours: [White], [Grey], [Black], [Clear].</p>
      </div>`}
    </div>
  </section>

  <section class="section section--paper" id="applications" aria-labelledby="ap-title">
    <div class="container">
      <div class="section-head"><div data-reveal><p class="eyebrow">Applications</p><h2 id="ap-title" class="mt-5">Built for the job.</h2></div></div>
      <div class="split split--even">
        <ul class="ticks ticks--lg" data-reveal>
          ${(real ? p.uses : ["Placeholder application one", "Placeholder application two", "Placeholder application three", "Placeholder application four", "Placeholder application five"]).map((t) => `<li>${MF.ic("check")}${MF.esc(t)}</li>`).join("")}
        </ul>
        <div class="tiles" data-reveal style="--d:120ms">${apps.slice(0, 4).map((a) => MF.tile({ href: `application.html?a=${a.slug}`, title: a.name, photo: a.photo, cls: "tile--short" })).join("")}</div>
      </div>
    </div>
  </section>

  <section class="section" id="how-to-use" aria-labelledby="how-title">
    <div class="container">
      ${real ? `<div class="section-head"><div data-reveal><p class="eyebrow">How to use</p><h2 id="how-title" class="mt-5">Four steps to a bond that lasts.</h2></div></div>
      <ol class="howto howto--4" style="background:var(--paper);padding:1px;gap:1px">
        ${p.howto.map(([t, d]) => `<li data-reveal><h3>${MF.esc(t)}</h3><p>${MF.esc(d)}</p></li>`).join("")}
      </ol>
      <div class="callout mt-6" data-reveal><strong>Important notes.</strong> ${MF.esc(p.notes)}</div>` : `
      <div class="section-head"><div data-reveal><p class="eyebrow">How to use</p><h2 id="how-title" class="mt-5">Three steps to a fix that lasts.</h2></div></div>
      <ol class="howto" style="background:var(--paper);padding:1px;gap:1px">
        <li data-reveal><h3>Prepare the surface</h3><p>Placeholder — surfaces must be clean, dry and free of dust, oil and loose material. Mask joint edges for a clean finish.</p></li>
        <li data-reveal><h3>Apply</h3><p>Placeholder — cut the nozzle at 45° to suit the joint width. Apply a continuous bead, pushing into the joint.</p></li>
        <li data-reveal><h3>Tool & clean up</h3><p>Placeholder — tool within XX minutes for a smooth finish. Remove masking tape and clean tools with MightyFix Trade Wipes.</p></li>
      </ol>`}
    </div>
  </section>

  <section class="section section--paper" id="specs" aria-labelledby="spec-title">
    <div class="container split">
      ${real ? `<div data-reveal><p class="eyebrow">Specifications</p><h2 id="spec-title" class="mt-5 h2">The numbers behind the hold.</h2><p class="muted mt-5">${MF.esc(p.specsNote)}</p></div>
      <div data-reveal style="--d:120ms">
        <div class="table-wrap"><table class="specs">
          <thead><tr><th scope="col" style="background:var(--navy);color:#fff">Parameter</th><th scope="col" style="background:var(--navy);color:#fff;width:auto">Unit</th><th scope="col" style="background:var(--navy);color:#fff;width:auto">Typical value</th></tr></thead>
          <tbody>${p.specs.map(([k, u, v]) => `<tr><th scope="row">${MF.esc(k)}</th><td>${MF.esc(u)}</td><td>${MF.esc(v)}</td></tr>`).join("")}</tbody>
        </table></div>
        <div class="table-wrap mt-5"><table class="specs"><tbody>
          <tr><th scope="row">Packaging</th><td>${MF.esc(p.packaging)}</td></tr>
          <tr><th scope="row">Storage</th><td>${MF.esc(p.storage)}</td></tr>
        </tbody></table></div>
      </div>` : `<div data-reveal><p class="eyebrow">Specifications</p><h2 id="spec-title" class="mt-5 h2">The numbers behind the hold.</h2><p class="muted mt-5">Placeholder values — replace with figures from the technical data sheet.</p></div>
      <div class="table-wrap" data-reveal style="--d:120ms"><table class="specs"><tbody>
        ${[["Chemistry", p.group], ["Skin time (23°C, 50% RH)", "XX minutes"], ["Cure rate", "XX mm / 24 hrs"], ["Hardness (Shore A)", "XX"], ["Movement capability", "±XX%"], ["Service temperature", "-XX°C to +XX°C"], ["Application temperature", "+X°C to +XX°C"], ["Shelf life", "XX months unopened"], ["Pack sizes", p.size]]
          .map(([k, v]) => `<tr><th scope="row">${MF.esc(k)}</th><td>${MF.esc(v)}</td></tr>`).join("")}
      </tbody></table></div>`}
    </div>
  </section>

  <section class="section" id="downloads" aria-labelledby="dl-title">
    <div class="container">
      <div class="section-head"><div data-reveal><p class="eyebrow">Downloads</p><h2 id="dl-title" class="mt-5">Everything you need on file.</h2></div></div>
      <div class="downloads">
        ${real ? `<a class="download" href="${p.tds.file}" target="_blank" rel="noopener" data-reveal>
          <span class="download__icon">${MF.ic("file")}</span><span><strong>Technical data sheet</strong><span>${MF.esc(p.tds.code)} · ${MF.esc(p.tds.version)} · ${MF.esc(p.tds.size)}</span></span>${MF.ic("download")}</a>
        <button type="button" class="download" data-open="expert" data-reveal>
          <span class="download__icon">${MF.ic("file")}</span><span><strong>Safety data sheet</strong><span>Available on request — ask our team</span></span>${MF.ic("arrow-right")}</button>`
        : [["Technical data sheet", "PDF · XXX KB"], ["Safety data sheet", "PDF · XXX KB"]].map(([t, s]) => `<button type="button" class="download" data-open="download" data-dl-name="${MF.esc(p.name)} — ${t}" data-reveal>
          <span class="download__icon">${MF.ic("file")}</span><span><strong>${t}</strong><span>${s}</span></span>${MF.ic("download")}</button>`).join("")}
      </div>
    </div>
  </section>

  <section class="section section--paper" id="faqs" aria-labelledby="faq-title">
    <div class="container split">
      <div data-reveal><p class="eyebrow">FAQs</p><h2 id="faq-title" class="mt-5 h2">Your questions, answered by experts.</h2>
        <p class="muted mt-5">Can't find what you need?</p><div class="mt-5">${MF.btn("Talk to an expert", { icon: "headset", attrs: 'data-open="expert"' })}</div></div>
      <div class="accordion" data-reveal style="--d:120ms">
        ${accordion(real ? p.faqs : ["Can I paint over it?", "Does it need a primer on concrete?", "How long before it's waterproof?", "What's the difference between this and [competitor product]?"]
          .map((q) => [q, "Placeholder answer — keep it short, specific and confident. Link to the data sheet for full detail."]))}
      </div>
    </div>
  </section>

  <section class="section section--navy on-dark section--tight" aria-label="Product finder">
    <div class="container cta-band">
      <div><h2 class="h2">Not the right fit? Let’s find the one that is.</h2><p class="lead muted mt-5">Answer three quick questions and we'll show you the products that fit.</p></div>
      <div class="cta-band__actions">${MF.btn("Open product finder", { href: "product-finder.html", cls: "btn--light", icon: "search" })}</div>
    </div>
  </section>

  <section class="section" id="related" aria-labelledby="rel-title">
    <div class="container">
      <div class="section-head"><div data-reveal><p class="eyebrow">Related products</p><h2 id="rel-title" class="mt-5">Complete the job.</h2></div>
        ${arrowLink(`All ${cat.name.toLowerCase()}`, `product-category.html?c=${cat.slug}`)}</div>
      <div class="products" data-products data-cat="${cat.slug}" data-exclude="${p.slug}" data-limit="3"></div>
    </div>
  </section>`;

  // Gallery thumbs
  const main = el.querySelector("#pdp-main");
  el.querySelectorAll("[data-thumb]").forEach((b) => b.addEventListener("click", () => {
    el.querySelectorAll("[data-thumb]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    main.innerHTML = b.dataset.thumb === "pack" ? MF.packSVG(p) : `<img class="is-photo" src="${IMG(PHOTOS[b.dataset.thumb], 1200)}" alt="${MF.esc(p.name)} in use (placeholder photo)">`;
  }));
}

/* ---------------- Application (sector or sub-application) ---------------- */
function renderApplication(el) {
  const slug = MF.param("a") || "construction";
  const sector = SECTORS.find((s) => s.slug === slug);
  if (sector) return renderSector(el, sector);
  const app = allApps().find((a) => a.slug === slug);
  if (!app) { el.innerHTML = notFound("application", "applications.html", "All applications"); return; }
  const parent = SECTORS.find((s) => s.slug === app.sector);
  setTitle(app.name);
  const hasCases = CASE_STUDIES.some((c) => c.sector === parent.slug);

  el.innerHTML = `
  <section class="page-hero page-hero--split" aria-labelledby="ph-title">
    <div class="container page-hero__grid">
      <div class="page-hero__text">
        ${crumbs([["Home", "index.html"], ["Applications", "applications.html"], [parent.name, `application.html?a=${parent.slug}`], [app.name]])}
        <p class="eyebrow">${MF.esc(parent.name)}</p>
        <h1 id="ph-title" class="mt-5">${MF.esc(app.name)}</h1>
        <p class="lead">Placeholder — one-line summary of the job and what MightyFix brings to it.</p>
        <div class="page-hero__actions">${MF.btn("See recommended products", { href: "#recommended", cls: "btn--light" })}${MF.btn("Talk to an expert", { cls: "btn--white", icon: "headset", attrs: 'data-open="expert"' })}</div>
      </div>
      <div class="page-hero__media"><img src="${IMG(PHOTOS[app.photo], 1400)}" alt="" width="1400" height="900"></div>
    </div>
  </section>

  <section class="section" aria-labelledby="ch-title">
    <div class="container split">
      <div class="prose" data-reveal><p class="eyebrow">The job</p><h2 id="ch-title" class="h2" style="margin-top:var(--s5)">Get it right the first time.</h2>
        <p class="lead">Placeholder — describe the conditions this application faces and why product choice matters.</p>
        <p>Placeholder — supporting paragraph with practical guidance. Write like you speak: talk like an expert on site, not a technical manual.</p></div>
      <div data-reveal style="--d:120ms"><h3 class="h4" style="color:var(--navy)">What to look for</h3>
        <dl class="spec-strip mt-5" style="grid-template-columns:repeat(2,1fr)">
          <div><dt>${MF.ic("droplet")}Water</dt><dd style="font-size:1rem">Placeholder requirement</dd></div>
          <div><dt>${MF.ic("thermo")}Temperature</dt><dd style="font-size:1rem">Placeholder requirement</dd></div>
          <div><dt>${MF.ic("layers")}Movement</dt><dd style="font-size:1rem">Placeholder requirement</dd></div>
          <div><dt>${MF.ic("shield")}Durability</dt><dd style="font-size:1rem">Placeholder requirement</dd></div>
        </dl></div>
    </div>
  </section>

  <section class="section section--paper" id="recommended" aria-labelledby="rec-title">
    <div class="container">
      <div class="section-head"><div data-reveal><p class="eyebrow">Recommended</p><h2 id="rec-title" class="mt-5">The right products for ${MF.esc(app.name.toLowerCase())}.</h2></div>
        ${arrowLink("Refine in product finder", `product-finder.html?s=${parent.slug}&a=${app.slug}`)}</div>
      <div class="products" data-products data-app="${app.slug}"></div>
    </div>
  </section>

  ${hasCases ? `<section class="section" aria-labelledby="cs-title"><div class="container">
    <div class="section-head"><div data-reveal><p class="eyebrow">Case studies</p><h2 id="cs-title" class="mt-5">Proven on the job.</h2></div>${arrowLink("All case studies", "case-studies.html")}</div>
    <div class="grid grid--3" data-cases="3" data-sector="${parent.slug}"></div></div></section>` : ""}

  <section class="section section--paper section--tight" aria-label="More applications"><div class="container">
    <p class="eyebrow">More in ${MF.esc(parent.name.toLowerCase())}</p>
    <div class="see-also mt-5">${parent.children.filter((c) => c.slug !== app.slug).map((c) => `<a class="chip" href="application.html?a=${c.slug}">${MF.esc(c.name)}</a>`).join("")}</div>
  </div></section>`;
}

function renderSector(el, s) {
  setTitle(s.name);
  el.innerHTML = `
  <section class="page-hero page-hero--photo" aria-labelledby="ph-title">
    <div class="page-hero__bg"><img src="${IMG(PHOTOS[s.photo], 2000)}" alt="" width="2000" height="1100"></div>
    <div class="container page-hero__grid" style="width:100%">
      <div>
        ${crumbs([["Home", "index.html"], ["Applications", "applications.html"], [s.name]])}
        <p class="eyebrow">Applications</p>
        <h1 id="ph-title" class="mt-5">${MF.esc(s.name)}</h1>
        <p class="lead">${MF.esc(s.intro)}</p>
      </div>
    </div>
  </section>
  <section class="section" aria-labelledby="ch-title">
    <div class="container">
      <div class="section-head"><div data-reveal><h2 id="ch-title">Find your application.</h2></div></div>
      <div class="tiles tiles--4" data-app-tiles="${s.slug}"></div>
    </div>
  </section>
  <section class="section section--paper" aria-labelledby="pp-title">
    <div class="container">
      <div class="section-head"><div data-reveal><p class="eyebrow">Popular in ${MF.esc(s.name.toLowerCase())}</p><h2 id="pp-title" class="mt-5">Trusted by the trade.</h2></div>
        ${arrowLink("Find the right product", `product-finder.html?s=${s.slug}`)}</div>
      <div class="products" data-products data-sector="${s.slug === "home-diy" ? "construction" : s.slug}" data-limit="6"></div>
    </div>
  </section>
  <section class="section" aria-labelledby="cs-title"><div class="container">
    <div class="section-head"><div data-reveal><p class="eyebrow">Case studies</p><h2 id="cs-title" class="mt-5">Proven on the job.</h2></div>${arrowLink("All case studies", "case-studies.html")}</div>
    <div class="grid grid--3" data-cases="3" data-sector="${s.slug === "home-diy" ? "" : s.slug}"></div></div></section>`;
}

/* ---------------- Product finder ---------------- */
function renderFinder(el) {
  const STEPS = ["Industry", "Application", "Product type", "Results"];
  const state = () => { const q = new URLSearchParams(location.search); return { s: q.get("s"), a: q.get("a"), t: q.get("t"), q: q.get("q") }; };
  const push = (st) => {
    const q = new URLSearchParams();
    Object.entries(st).forEach(([k, v]) => v && q.set(k, v));
    history.pushState(null, "", `${location.pathname}${q.toString() ? "?" + q : ""}`);
    draw(true);
  };
  const match = (st) => PRODUCTS.filter((p) =>
    (!st.s || p.sectors.includes(st.s === "home-diy" ? "construction" : st.s)) &&
    (!st.a || p.apps.includes(st.a)) && (!st.t || st.t === "all" || p.cat === st.t));

  function draw(focus) {
    const st = state();
    let step = 0, body = "", heading = "", back = null;

    if (st.q) {
      const term = st.q.toLowerCase();
      const res = PRODUCTS.filter((p) => [p.name, p.tagline, p.group, ...p.bullets].join(" ").toLowerCase().includes(term));
      step = 3; heading = `${res.length} ${res.length === 1 ? "product" : "products"} for “${MF.esc(st.q)}”`; back = {};
      body = res.length ? `<div class="products">${res.map(MF.productCard).join("")}</div>`
        : `<div class="empty"><h3>No products match “${MF.esc(st.q)}”</h3><p>Try a broader word like “sealant” or “foam”, or use the guided steps.</p><div class="mt-5">${MF.btn("Start guided search", { attrs: 'data-reset' })}</div></div>`;
    } else if (!st.s) {
      heading = "I'm looking for a product for";
      body = `<div class="option-grid">${SECTORS.map((s) => `<button type="button" class="option" data-set="s" data-val="${s.slug}">
        <span class="option__media"><img src="${IMG(PHOTOS[s.photo], 800)}" alt="" loading="lazy"></span>
        <span class="option__body"><span>${MF.esc(s.name)}<small>${s.children.length} applications</small></span>${MF.ic("arrow-right")}</span></button>`).join("")}</div>`;
    } else if (!st.a) {
      const s = SECTORS.find((x) => x.slug === st.s);
      step = 1; heading = "Select your application"; back = { };
      body = `<div class="option-grid option-grid--4">${s.children.map((c) => `<button type="button" class="option" data-set="a" data-val="${c.slug}">
        <span class="option__media"><img src="${IMG(PHOTOS[c.photo], 600)}" alt="" loading="lazy"></span>
        <span class="option__body"><span>${MF.esc(c.name)}</span>${MF.ic("arrow-right")}</span></button>`).join("")}</div>`;
    } else if (!st.t) {
      step = 2; heading = "Refine your selection"; back = { s: st.s };
      const base = match({ s: st.s, a: st.a });
      const cats = CATEGORIES.filter((c) => base.some((p) => p.cat === c.slug));
      body = `<div class="option-grid">${cats.map((c) => {
        const n = base.filter((p) => p.cat === c.slug).length;
        return `<button type="button" class="option option--text" data-set="t" data-val="${c.slug}"><span class="option__body"><span><span class="chip__dot" style="display:inline-block;background:${c.color};margin-right:8px"></span>${MF.esc(c.name)}<small>${n} ${n === 1 ? "product" : "products"}</small></span>${MF.ic("arrow-right")}</span></button>`;
      }).join("")}
        <button type="button" class="option option--text" data-set="t" data-val="all"><span class="option__body"><span>Show me everything<small>${base.length} products</small></span>${MF.ic("arrow-right")}</span></button></div>`;
      if (!cats.length) body = `<div class="empty"><h3>No products listed for this application yet</h3><p>Placeholder — talk to an expert and we'll recommend the right product.</p><div class="mt-5">${MF.btn("Talk to an expert", { icon: "headset", attrs: 'data-open="expert"' })}</div></div>`;
    } else {
      step = 3; back = { s: st.s, a: st.a };
      const res = match(st);
      heading = `We found ${res.length} ${res.length === 1 ? "product" : "products"} for you`;
      body = `<div class="products">${res.map(MF.productCard).join("")}</div>`;
    }

    const sName = SECTORS.find((x) => x.slug === st.s)?.name;
    const aName = allApps().find((x) => x.slug === st.a)?.name;
    const tName = st.t === "all" ? "All types" : byCat(st.t || "")?.name;
    const trail = [sName, aName, tName].filter(Boolean).join(" · ");

    el.querySelector("#finder-stage").innerHTML = `
      <ol class="finder__progress" aria-label="Progress">${STEPS.map((n, i) => `<li class="${i < step ? "is-done" : i === step ? "is-current" : ""}" ${i === step ? 'aria-current="step"' : ""}><span>${i + 1}. ${n}</span><i></i></li>`).join("")}</ol>
      <div class="finder__head">
        <div>${back ? `<button type="button" class="finder__back" data-back='${JSON.stringify(back)}'>${MF.ic("arrow-left")} Back</button>` : ""}
          <h2 class="h2" id="finder-heading" tabindex="-1" style="margin-top:var(--s3)">${heading}</h2>
          ${trail && !st.q ? `<p class="muted mt-4">${MF.esc(trail)}</p>` : ""}</div>
        ${step > 0 ? `<button type="button" class="chip" data-reset>Start again</button>` : ""}
      </div>
      <div aria-live="polite">${body}</div>`;
    MF.initReveal(el);
    if (focus) el.querySelector("#finder-heading").focus({ preventScroll: false });
  }

  el.innerHTML = `
  <section class="page-hero page-hero--compact" aria-labelledby="ph-title">
    <div class="container page-hero__grid">
      <div>${crumbs([["Home", "index.html"], ["Product finder"]])}
        <h1 id="ph-title" style="max-width:none">Three questions. The right product.</h1>
        <p class="lead">Three quick questions — or search if you already know what you're after.</p>
        <form class="finder-search mt-6" role="search" id="finder-search">
          <label class="visually-hidden" for="finder-q">Search products</label>
          <input class="input" id="finder-q" type="search" placeholder="e.g. silicone, roof, fire-rated" autocomplete="off">
          <button class="icon-btn" type="submit" aria-label="Search">${MF.ic("search")}</button>
        </form>
      </div>
    </div>
  </section>
  <section class="section finder"><div class="container" id="finder-stage"></div></section>`;

  el.addEventListener("click", (e) => {
    const set = e.target.closest("[data-set]");
    if (set) { const st = state(); delete st.q; st[set.dataset.set] = set.dataset.val; push(st); return; }
    const b = e.target.closest("[data-back]");
    if (b) { push(JSON.parse(b.dataset.back)); return; }
    if (e.target.closest("[data-reset]")) { el.querySelector("#finder-q").value = ""; push({}); }
  });
  el.querySelector("#finder-search").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = el.querySelector("#finder-q").value.trim();
    push(v ? { q: v } : {});
  });
  window.addEventListener("popstate", () => draw(true));
  el.querySelector("#finder-q").value = state().q || "";
  draw(false);
}

/* ---------------- Article ---------------- */
function renderArticle(el) {
  const a = ARTICLES.find((x) => x.id === MF.param("id")) || ARTICLES[0];
  setTitle(a.title);
  const sections = ["Why it matters", "What to look for", "Step by step", "Common mistakes", "The bottom line"];
  el.innerHTML = `
  <section class="page-hero" aria-labelledby="ph-title">
    <div class="container page-hero__grid" style="padding-bottom:calc(var(--s8) * 2)">
      <div>${crumbs([["Home", "index.html"], ["Knowledge hub", "knowledge-hub.html"], [a.type]])}
        <p class="acard__meta" style="color:rgba(255,255,255,.8)"><span class="type" style="color:var(--halfbaked)">${MF.esc(a.type)}</span><span>${MF.esc(a.date)}</span><span>${MF.esc(a.read)} read</span></p>
        <h1 id="ph-title" class="mt-5" style="max-width:20ch">${MF.esc(a.title)}</h1></div>
    </div>
  </section>
  <div class="container"><div class="article-hero__media"><img src="${IMG(PHOTOS[a.photo], 2000)}" alt="" width="2000" height="860"></div></div>
  <section class="section">
    <div class="container article-layout">
      <aside class="article-aside" aria-label="Contents">
        <p class="eyebrow">On this page</p>
        <nav class="toc mt-4">${sections.map((s) => `<a href="#${slugify(s)}">${s}</a>`).join("")}</nav>
        <div class="share" aria-label="Share">
          <a href="#" aria-label="Share on LinkedIn">${MF.ic("linkedin")}</a><a href="#" aria-label="Share on Facebook">${MF.ic("facebook")}</a>
          <button type="button" aria-label="Copy link" data-copy>${MF.ic("link")}</button></div>
      </aside>
      <article class="prose">
        <p class="lead">Placeholder — standfirst. One or two sentences that tell the reader what they'll learn and why it's worth their time.</p>
        ${sections.map((s, i) => `<h2 id="${slugify(s)}">${s}</h2>
          <p>Placeholder paragraph. Be specific: cure times, temperature ranges, surfaces and sizes are more convincing than adjectives. Write like you speak — the way you'd explain it face to face on site.</p>
          ${i === 1 ? `<ul><li>Placeholder point one</li><li>Placeholder point two</li><li>Placeholder point three</li></ul>` : ""}
          ${i === 2 ? `<figure class="figure-ph"><div class="img"><img src="${IMG(PHOTOS.caulkWindow, 1400)}" alt="Applying sealant to a window frame" loading="lazy"></div><figcaption>Placeholder caption describing the image.</figcaption></figure>` : ""}
          ${i === 3 ? `<div class="callout"><strong>Pro tip:</strong> Placeholder — a short, practical tip from the technical team.</div>` : ""}
          ${i === 4 ? `<blockquote>“Placeholder pull-quote from a MightyFix technical expert.”</blockquote>` : ""}`).join("")}
      </article>
      <aside class="article-aside" aria-label="Products mentioned">
        <p class="eyebrow">Products mentioned</p>
        <div class="mt-5" style="display:grid;gap:var(--s4)" data-products data-slugs="mightyseal-wet-area,mightyfix-primer"></div>
      </aside>
    </div>
  </section>
  <section class="section section--paper" aria-labelledby="more-title"><div class="container">
    <div class="section-head"><div><p class="eyebrow">Keep reading</p><h2 id="more-title" class="mt-5">More from the knowledge hub.</h2></div>${arrowLink("Knowledge hub", "knowledge-hub.html")}</div>
    <div class="grid grid--3">${ARTICLES.filter((x) => x.id !== a.id).slice(0, 3).map((x) => MF.articleCard(x)).join("")}</div></div></section>`;

  el.querySelector("[data-copy]").addEventListener("click", (e) => {
    navigator.clipboard?.writeText(location.href).then(() => { e.currentTarget.setAttribute("aria-label", "Link copied"); }).catch(() => {});
  });
}

/* ---------------- Case study ---------------- */
function renderCaseStudy(el) {
  const c = CASE_STUDIES.find((x) => x.id === MF.param("id")) || CASE_STUDIES[0];
  const sector = SECTORS.find((s) => s.slug === c.sector);
  setTitle(c.title);
  el.innerHTML = `
  <section class="page-hero page-hero--photo" aria-labelledby="ph-title" style="min-height:560px">
    <div class="page-hero__bg"><img src="${IMG(PHOTOS[c.photo], 2000)}" alt="" width="2000" height="1100"></div>
    <div class="container page-hero__grid" style="width:100%">
      <div>${crumbs([["Home", "index.html"], ["Case studies", "case-studies.html"], [c.title]])}
        <p class="eyebrow">Case study · ${MF.esc(sector.name)}</p>
        <h1 id="ph-title" class="mt-5" style="max-width:18ch">${MF.esc(c.title)}</h1></div>
      <dl class="facts">
        <div><dt>Client</dt><dd>${MF.esc(c.client)}</dd></div>
        <div><dt>Location</dt><dd>${MF.esc(c.location)}</dd></div>
        <div><dt>Sector</dt><dd>${MF.esc(sector.name)}</dd></div>
        <div><dt>Completed</dt><dd>[Month Year]</dd></div>
      </dl>
    </div>
  </section>
  <section class="section"><div class="container split">
    <div data-reveal><p class="eyebrow">The challenge</p><h2 class="h2 mt-5">Placeholder headline for the problem.</h2></div>
    <div class="prose" data-reveal style="--d:120ms"><p class="lead">Placeholder — what the client needed, the conditions on site and why it was difficult.</p><p>Placeholder — supporting detail: deadlines, substrates, weather, standards to meet.</p></div>
  </div></section>
  <section class="section section--paper"><div class="container split">
    <div data-reveal><p class="eyebrow">The solution</p><h2 class="h2 mt-5">Placeholder headline for the fix.</h2></div>
    <div class="prose" data-reveal style="--d:120ms"><p class="lead">Placeholder — which MightyFix products were specified and how our technical team supported the job.</p>
      <ul><li>Placeholder step or detail one</li><li>Placeholder step or detail two</li><li>Placeholder step or detail three</li></ul></div>
  </div></section>
  <section class="section"><div class="container">
    <div class="gallery">${["concreteBuild", "caulkWindow", "tools"].map((ph) => `<figure data-reveal><img src="${IMG(PHOTOS[ph], 1400)}" alt="Project photo (placeholder)" loading="lazy"></figure>`).join("")}</div>
  </div></section>
  <section class="section section--navy on-dark"><div class="container">
    <p class="eyebrow">The result</p>
    <div class="stat-row mt-7">
      <div class="stat" data-reveal><strong>XX%</strong><span>Placeholder result metric</span></div>
      <div class="stat" data-reveal><strong>XXX</strong><span>Placeholder result metric</span></div>
      <div class="stat" data-reveal><strong>0</strong><span>Placeholder — callbacks after completion</span></div>
    </div>
    <figure class="quote mt-7" data-reveal><blockquote>“Placeholder client quote about the result and working with MightyFix.”</blockquote><figcaption>[Name], [Role], ${MF.esc(c.client)}</figcaption></figure>
  </div></section>
  <section class="section section--paper" aria-labelledby="used-title"><div class="container">
    <div class="section-head"><div><p class="eyebrow">Products used</p><h2 id="used-title" class="mt-5">The products behind the result.</h2></div></div>
    <div class="products" data-products data-slugs="${c.products.join(",")}"></div></div></section>
  <section class="section" aria-labelledby="more-title"><div class="container">
    <div class="section-head"><div><p class="eyebrow">More case studies</p><h2 id="more-title" class="mt-5">Proven on the job.</h2></div>${arrowLink("All case studies", "case-studies.html")}</div>
    <div class="grid grid--3" data-cases="3" data-exclude="${c.id}"></div></div></section>`;
}

/* ---------------- Dispatcher ---------------- */
window.renderPage = function () {
  const el = document.getElementById("page");
  if (!el) return;
  ({ products: renderProducts, category: renderCategory, product: renderProduct, application: renderApplication,
     finder: renderFinder, article: renderArticle, "case-study": renderCaseStudy }[document.body.dataset.page] || (() => {}))(el);
};
