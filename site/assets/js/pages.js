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

/* ---------------- Single product ----------------
   Layout follows the sabreadhesives.com product page: navy banner with the
   pack shot and key claims, breadcrumb strip, then a sticky in-page menu
   beside stacked sections (Overview, Applications, How to use, Technical
   data, Downloads, FAQs, finder banner, Related products). */
function renderProduct(el) {
  const p = byProduct(MF.param("p") || "") || PRODUCTS[0];
  const cat = byCat(p.cat);
  const real = !!p.real;
  const apps = allApps().filter((a) => p.apps.includes(a.slug));
  const sectors = SECTORS.filter((s) => p.sectors.includes(s.slug));
  setTitle(p.name);

  // Real products carry TDS content; placeholders get clearly-marked filler in the same shape.
  const D = real ? p : {
    lead: `${p.tagline}. Placeholder — one-line benefit statement that leads with the result.`,
    description: "Placeholder — two or three sentences describing what this product does and the problem it solves. Lead with the benefit, then the detail: chemistry, the substrates it bonds to and any approvals or standards it meets.",
    uses: ["Placeholder application one", "Placeholder application two", "Placeholder application three", "Placeholder application four", "Placeholder application five", "Placeholder application six"],
    howto: [["Surface preparation", "Placeholder — surfaces must be clean, dry and free of dust, oil and loose material. Mask joint edges for a clean finish."],
            ["Method", "Placeholder — cut the nozzle to suit the joint width and apply a continuous bead, pushing into the joint."],
            ["Clean up", "Placeholder — tool within XX minutes for a smooth finish. Remove masking tape and clean tools with MightyFix Trade Wipes."]],
    specs: [["Chemistry", "—", p.group], ["Skin time", "Minutes", "XX"], ["Full cure", "Hours", "XX"], ["Service temperature", "°C", "-XX to XX"], ["Shelf life", "Months", "XX"]],
    specsNote: "Placeholder values — replace with figures from the technical data sheet.",
    faqs: ["Can I paint over it?", "Does it need a primer on concrete?", "How long before it's waterproof?", "Where shouldn't I use it?"]
      .map((q) => [q, "Placeholder answer — keep it short, specific and confident. Link to the data sheet for full detail."]),
    packaging: p.size,
  };
  const variant = [p.size.split("/")[0].trim(), p.colour].filter(Boolean).join(" · ");
  const hero = p.cutout ? `<img src="${p.cutout}" alt="${MF.esc(p.name)}, ${MF.esc(p.size)}" width="186" height="606">` : MF.packSVG(p);
  const slides = (apps.length ? apps : [{ name: cat.name, photo: cat.photo }]).slice(0, 4);
  const sectorIcon = { construction: "building", manufacturing: "factory", "home-diy": "home" };
  const hasHowto = !!(D.howto && D.howto.length);
  const navItems = [["overview", "Overview"], ["applications", "Applications"], hasHowto && ["how-to-use", "How to use"], ["technical-data", "Technical data"], ["downloads", "Downloads"], ["faqs", "FAQs"], ["related", "Related products"]].filter(Boolean);
  const title = (id, text) => `<h2 class="prod-sec__title" id="${id}-title">${MF.esc(text)}</h2>`;
  const dots = (items, cls = "") => `<ul class="prod-dots ${cls}">${items.map((t) => `<li>${MF.esc(t)}</li>`).join("")}</ul>`;
  const related = PRODUCTS.filter((x) => x.cat === p.cat && x.slug !== p.slug).concat(PRODUCTS.filter((x) => x.cat !== p.cat && x.sectors.some((s) => p.sectors.includes(s)))).slice(0, 3);

  el.innerHTML = `
  <section class="prod-banner" aria-labelledby="pdp-title">
    <div class="container prod-banner__grid">
      <div class="prod-banner__media" data-reveal>
        <div class="prod-banner__stage">${hero}</div>
        <p class="prod-banner__variant">${MF.esc(variant)}</p>
      </div>
      <div class="prod-banner__copy" data-reveal style="--d:120ms">
        <h1 id="pdp-title">${MF.esc(p.name)}</h1>
        <p class="prod-banner__lead">${MF.esc(D.lead)}</p>
        <ul class="prod-banner__bullets">${p.bullets.map((b) => `<li>${MF.esc(b)}</li>`).join("")}</ul>
        <button type="button" class="btn-solid" data-open="expert">Talk to an expert</button>
      </div>
    </div>
  </section>

  <nav class="prod-crumbs" aria-label="Breadcrumb"><div class="container"><ol>
    <li><a href="index.html">Home</a></li><li><a href="products.html">Products</a></li>
    <li><a href="product-category.html?c=${cat.slug}">${MF.esc(cat.name)}</a></li><li><span aria-current="page">${MF.esc(p.name)}</span></li>
  </ol></div></nav>

  <section class="prod-body">
    <div class="container prod-body__grid">
      <aside class="prod-nav" aria-label="On this page"><nav class="prod-nav__inner">
        ${navItems.map(([id, t], i) => `<a href="#${id}"${i === 0 ? ' class="is-active"' : ""}>${t}</a>`).join("")}
      </nav></aside>

      <div class="prod-main">
        <section class="prod-sec" id="overview" aria-labelledby="overview-title">
          ${title("overview", "Overview")}
          <div class="prod-text">
            <p>${MF.esc(D.description)}</p>
            ${real ? `<p><strong>Recommended substrates:</strong><br>${MF.esc(p.substrates.join(", "))}.</p>` : ""}
            <p><strong>Available in:</strong><br>${MF.esc(D.packaging)}</p>
          </div>
          <div class="prod-icons">
            ${sectors.map((s) => `<a class="prod-icon" href="application.html?a=${s.slug}"><span>${MF.ic(sectorIcon[s.slug] || "building")}</span>${MF.esc(s.name)}</a>`).join("")}
            <a class="prod-icon" href="product-category.html?c=${cat.slug}"><span>${MF.ic("box")}</span>${MF.esc(cat.name)}</a>
          </div>
        </section>

        <section class="prod-sec" id="applications" aria-labelledby="applications-title">
          ${title("applications", "Applications")}
          ${dots(D.uses, "prod-dots--2")}
          ${p.tds ? `<p class="prod-see-all">Key features are listed in our <a href="${p.tds.file}" target="_blank" rel="noopener">Technical Data Sheet</a>.</p>` : ""}
          ${real ? `<div class="prod-sec__sub"><h3 class="h4" style="margin:30px 0 20px">Product features</h3>
            <div class="prod-steps">${p.features.map(([t, d]) => `<p class="prod-step"><b>${MF.esc(t)}</b>${MF.esc(d)}</p>`).join("")}</div></div>` : ""}
          <div class="prod-slider" data-prod-slider>
            <div class="prod-slider__frame">
              <div class="prod-slider__track">${slides.map((a, i) => `<img src="${IMG(PHOTOS[a.photo], 1400)}" alt="${MF.esc(a.name)} — placeholder photo"${i ? ' loading="lazy"' : ""}>`).join("")}</div>
              ${slides.length > 1 ? `<div class="prod-slider__nav">
                <button type="button" data-dir="-1" aria-label="Previous photo">${MF.ic("arrow-left")}</button>
                <button type="button" data-dir="1" aria-label="Next photo">${MF.ic("arrow-right")}</button></div>` : ""}
            </div>
            <div class="prod-slider__caption" aria-live="polite">
              <p class="prod-slider__count"><b>01</b> / ${String(slides.length).padStart(2, "0")}</p>
              <p class="prod-slider__text">${MF.esc(slides[0].name)} — placeholder photo; replace with ${MF.esc(p.name)} application shots.</p>
            </div>
          </div>
        </section>

        ${hasHowto ? `<section class="prod-sec" id="how-to-use" aria-labelledby="how-to-use-title">
          ${title("how-to-use", "How to use")}
          <div class="prod-steps">${D.howto.map(([t, d]) => `<p class="prod-step"><b>${MF.esc(t)}</b>${MF.esc(d)}</p>`).join("")}</div>
          ${p.notes ? `<p class="prod-note"><b>Important notes.</b> ${MF.esc(p.notes)}</p>` : ""}
        </section>` : ""}

        <section class="prod-sec" id="technical-data" aria-labelledby="technical-data-title">
          ${title("technical-data", "Technical data")}
          <div class="prod-specs-wrap"><table class="prod-specs">
            <thead><tr><th scope="col">Parameter</th><th scope="col">Unit</th><th scope="col">Typical value</th></tr></thead>
            <tbody>${D.specs.map(([k, u, v]) => `<tr><th scope="row">${MF.esc(k)}</th><td${u === "—" ? ' class="no-unit"' : ""}>${MF.esc(u)}</td><td>${MF.esc(v)}</td></tr>`).join("")}
              <tr><th scope="row">Packaging</th><td class="no-unit">—</td><td>${MF.esc(D.packaging)}</td></tr>
              ${D.storage ? `<tr><th scope="row">Storage</th><td class="no-unit">—</td><td>${MF.esc(p.storage)}</td></tr>` : ""}</tbody>
          </table></div>
          ${D.specsNote ? `<p class="prod-specs-note">${MF.esc(D.specsNote)}</p>` : ""}
        </section>

        <section class="prod-sec" id="downloads" aria-labelledby="downloads-title" style="padding-bottom:100px">
          ${title("downloads", "Downloads")}
          <div class="prod-downloads">
            ${p.tds
              ? `<a class="prod-dl" href="${p.tds.file}" target="_blank" rel="noopener">${MF.ic("download")}Technical Data Sheet</a>
                 <button type="button" class="prod-dl" data-open="expert">${MF.ic("download")}Safety Data Sheet</button>`
              : real ? ["Technical Data Sheet", "Safety Data Sheet"].map((t) => `<button type="button" class="prod-dl" data-open="expert">${MF.ic("download")}${t}</button>`).join("")
              : ["Technical Data Sheet", "Safety Data Sheet"].map((t) => `<button type="button" class="prod-dl" data-open="download" data-dl-name="${MF.esc(p.name)} — ${t}">${MF.ic("download")}${t}</button>`).join("")}
          </div>
          ${real && !p.tds ? `<p class="prod-specs-note">Data sheets for ${MF.esc(p.name)} are available on request — ask our team.</p>` : ""}
          ${p.tds ? `<p class="prod-specs-note">${MF.esc(p.tds.code)} · ${MF.esc(p.tds.version)} · issued ${MF.esc(p.tds.issued)}. Safety Data Sheet available on request.</p>` : ""}
        </section>

        <section class="prod-sec" id="faqs" aria-labelledby="faqs-title" style="padding-bottom:0">
          ${title("faqs", "FAQs")}
          <div class="prod-faq">${D.faqs.map(([q, a]) => `<details><summary>${MF.esc(q)}${MF.ic("chevron-down")}</summary><p class="answer">${MF.esc(a)}</p></details>`).join("")}</div>
        </section>

        <div class="prod-finder">
          <p>Find the right fix for the job</p>
          <a href="product-finder.html"><span>${MF.ic("arrow-right")}</span>Product finder</a>
        </div>

        <section class="prod-sec" id="related" aria-labelledby="related-title" style="padding-bottom:0">
          ${title("related", "Related products")}
          <div class="prod-related">${related.map((r) => `<a class="rel-card" href="product.html?p=${r.slug}">
            <span class="rel-card__thumb">${MF.packSVG(r)}<span class="rel-card__go">${MF.ic("arrow-right")}</span></span>
            <span class="rel-card__body"><span class="rel-card__title" style="display:block">${MF.esc(r.name)}</span>
              <ul class="prod-dots">${r.bullets.map((b) => `<li>${MF.esc(b)}</li>`).join("")}</ul></span></a>`).join("")}</div>
        </section>
      </div>
    </div>
  </section>`;

  // Application photo slider (Sabre-style: arrows on the image, counter + caption below)
  const sl = el.querySelector("[data-prod-slider]");
  const track = sl.querySelector(".prod-slider__track");
  let i = 0;
  const go = (n) => {
    i = (n + slides.length) % slides.length;
    track.style.transform = `translateX(${-i * 100}%)`;
    sl.querySelector(".prod-slider__count").innerHTML = `<b>${String(i + 1).padStart(2, "0")}</b> / ${String(slides.length).padStart(2, "0")}`;
    sl.querySelector(".prod-slider__text").textContent = `${slides[i].name} — placeholder photo; replace with ${p.name} application shots.`;
  };
  sl.querySelectorAll("[data-dir]").forEach((b) => b.addEventListener("click", () => go(i + +b.dataset.dir)));
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
