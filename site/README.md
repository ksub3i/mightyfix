# MightyFix website — placeholder build

Static HTML/CSS/JS rebuild of the sabreadhesives.com page structure, styled with the MightyFix Brand Guidelines. All copy, specs (`XX`), photos and contact details are placeholders.

## Run it

Pages load shared data with JavaScript, so serve the folder rather than double-clicking the files:

```bash
python -m http.server 8080 --directory site
```

Then open http://localhost:8080.

## Pages (one per template)

| Page | File | Notes |
|---|---|---|
| Home | `index.html` | Hero + finder panel, intro, featured product, categories, carousel |
| Products overview | `products.html` | Every category with 3 products each, plus ranges |
| Category / range listing | `product-category.html?c=sealants` or `?r=mightyseal` | Grouped grids with "Show me" jump links |
| Product | `product.html?p=mightyseal-ms40` | Gallery, specs, how-to, data sheets, FAQs, related |
| Applications | `applications.html` | All sectors and sub-applications |
| Application | `application.html?a=construction` (sector) or `?a=roofing` | Sector = tiles; sub-application = recommended products |
| Product finder | `product-finder.html` | Industry → application → type → results, plus search |
| Knowledge hub | `knowledge-hub.html` | Articles, videos, stories, brochures, data-sheet library |
| Article | `article.html?id=surface-prep` | |
| Case studies | `case-studies.html` | Sector filter |
| Case study | `case-study.html?id=fleet-refit` | |
| Company | `company.html` | Story, values, testing, team, careers |
| Contact | `contact.html` | Form, offices, map placeholder |

## Where to change things

- **Products, categories, applications, articles, case studies, offices** — `assets/js/data.js`
- **Colours, type, spacing** — tokens at the top of `assets/css/styles.css`
- **Header, footer, menus, forms, popups** — `assets/js/main.js`
- **Template layouts** — `assets/js/pages.js`
- **Logo** — `assets/img/logo-*.png` / `symbol-*.png` (cut from the brand PDF). Swap in vector SVGs from the designer when available.

## Brand notes

- Colours: French Navy `#001F55`, Dark Azure `#034079`, Autumn Blue `#1381A2`, Half Baked `#88C0D1`. Each product category uses its extended-palette colour band.
- Type: Poppins (the same font sabreadhesives.com uses) — semi-bold headings, regular body, sentence case, left-aligned.
- Product pack images are generated SVG placeholders in the brand colour-coding. Replace them with real pack shots.
