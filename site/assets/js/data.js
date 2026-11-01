/*
  MightyFix — placeholder site data.
  Everything here is placeholder content. Swap names, copy, specs and images
  for real product data (or map these shapes onto a CMS) when ready.
*/

const IMG = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

const PHOTOS = {
  heroSite: "1587582423116-ec07293f0395",
  caulkWindow: "1786204697642-328c597b6f05",
  plaster: "1768839725085-829e6ac7ac26",
  tile: "1523413307857-ef24c53571ae",
  tools: "1783587616539-39bdab1a608f",
  sailing: "1779128704769-65ce9c835908",
  crane: "1535732759880-bbd5c7265e3f",
  concreteBuild: "1508450859948-4e04fabaa4ea",
  rebar: "1768677903496-becc4be07258",
  blueprints: "1772442198624-4fc4d7281e89",
  deck: "1773430272653-375174373c4f",
  assembly: "1589793463357-5fb813435467",
  autoFactory: "1581091212991-8891c7d4bd9b",
  metalFrame: "1564182842834-681b7be6de4b",
  bathroom: "1620626011761-996317b8d101",
  subwayTile: "1781445781804-dff17e05bd53",
  roofDrill: "1635424824849-1b09bdcc55b1",
  roofTiles: "1763665814538-8ba04597286c",
  metalRoof: "1780445392484-5fb7d5610708",
  joinery: "1659930087003-2d64e33181f7",
  carpenter: "1779031242515-205111711b23",
  marina: "1584632252106-cf92568799c8",
  truck: "1616432043562-3671ea2e5242",
  lab: "1614935151651-0bea6508db6b",
  labBench: "1602052577122-f73b9710adba",
  warehouse: "1553413077-190dd305871c",
  plumber: "1749532125405-70950966b0e5",
  wallPipes: "1768321918210-a775e4c88f08",
  ceilingLift: "1785682118449-21da8825754d",
  concrete: "1546414701-81cc6963c67f",
  crew: "1541888946425-d81bb19240f5",
  twoWorkers: "1504307651254-35680f356dfd",
  facadePaint: "1675671509845-a5184ef9c4c6",
  powerTool: "1589939705384-5185137a7f0f",
  cranesDusk: "1599995903128-531fc7fb694b",
};

/* Product categories. `color` comes from the brand guide's extended palette —
   each product line keeps its own colour band so it can be spotted on shelf. */
const CATEGORIES = [
  { slug: "adhesives", name: "Construction adhesives", color: "#F05130", pack: "cartridge", photo: "carpenter",
    intro: "High-grab adhesives that bond timber, metal, stone and board — no nails, no screws, no second attempt.",
    groups: ["Hybrid MS polymer", "Solvent-based", "Polyurethane"] },
  { slug: "sealants", name: "Sealants", color: "#00A699", pack: "cartridge", photo: "caulkWindow",
    intro: "Flexible sealants for joints, wet areas and facades that stay put through water, heat and movement.",
    groups: ["Silicone", "Hybrid MS polymer", "Acrylic", "Fire-rated"] },
  { slug: "fillers", name: "Fillers & repair", color: "#E5B434", pack: "cartridge", photo: "plaster",
    intro: "Gap fillers, crack repair and patching compounds that sand smooth and paint over clean.",
    groups: ["Gap fillers", "Crack repair", "Patching compounds"] },
  { slug: "foams", name: "Expanding foams", color: "#CEDC29", pack: "can", photo: "wallPipes",
    intro: "Expanding foams that fill, insulate and seal voids around frames, pipes and penetrations.",
    groups: ["Gun-grade foam", "Straw foam", "Fire-rated foam"] },
  { slug: "tapes", name: "Tapes", color: "#333EEB", pack: "tape", photo: "metalFrame",
    intro: "Double-sided, mounting and sealing tapes for fast, clean bonds with zero cure time.",
    groups: ["Mounting tapes", "Sealing tapes"] },
  { slug: "cleaners", name: "Primers & cleaners", color: "#A02F89", pack: "can", photo: "tile",
    intro: "Surface primers, cleaners and wipes that get the substrate ready so the bond lasts.",
    groups: ["Primers", "Cleaners & wipes"] },
];

/* Product ranges (brand families). Placeholder names. */
const RANGES = [
  { slug: "mightybond", name: "MightyBond", note: "Structural & construction adhesives" },
  { slug: "mightyseal", name: "MightySeal", note: "Silicone, hybrid & acrylic sealants" },
  { slug: "mightygrip", name: "MightyGrip", note: "Instant-grab adhesives" },
  { slug: "mightyfoam", name: "MightyFoam", note: "Expanding & fire-rated foams" },
  { slug: "mightypro", name: "MightyFix Pro", note: "Trade-only specialist products" },
];

/* Products.
   Entries with `real: true` come from an official MightyFix TDS and carry full detail.
   All other entries are placeholders — their specs use XX on purpose. */
const PRODUCTS = [
  /* Source: MightyFix_Liquid_Nails_TDS.pdf — TDS-MF-LN-300, Version 1.0, issued 02-Sep-2026 */
  { slug: "liquid-nails", name: "MightyFix Liquid Nails", cat: "adhesives", range: null, group: "Solvent-based",
    real: true,
    image: "assets/img/products/mightyfix-liquid-nails.png",
    cutout: "assets/img/products/mightyfix-liquid-nails-cutout.png", // tightly cropped for the navy banner
    tagline: "High strength synthetic rubber adhesive", size: "300 mL cartridge", colour: "White",
    bullets: ["Instant grab — no clamping or propping", "Bonds wood, concrete, tile, stone, metal & glass", "Holds in wet and underwater conditions"],
    sectors: ["construction", "manufacturing"], apps: ["construction-adhesives", "joinery", "panel-bonding"],
    tds: { file: "assets/docs/MightyFix_Liquid_Nails_TDS.pdf", code: "TDS-MF-LN-300", version: "Version 1.0", issued: "02 Sep 2026", size: "PDF · 258 KB" },
    lead: "Replaces nails and screws. Strong grab the moment you press it in place, with no drilling, noise or dust.",
    description: "MightyFix Liquid Nails is a high-performance, solvent-based adhesive formulated from styrene-butadiene-styrene (SBS) thermoplastic elastomers. Commonly known as “liquid nails,” it delivers strong initial tack, rapid curing, and excellent elasticity, making it an efficient bonding solution to replace traditional nails and screws in decoration, furniture assembly, and general hardware applications.",
    features: [
      ["Quick positioning", "Generates high initial adhesive strength instantly, without the need for long-term clamping or support."],
      ["Convenient & non-destructive", "No drilling or nailing required; no noise or dust; no damage to walls or substrates. Suitable for spot or strip application and DIY friendly."],
      ["Rapid curing", "Surface cures in as little as 60 seconds, reaching full strength within 48 hours — fast enough to replace iron nails."],
      ["Wide adhesion", "Bonds firmly to most building materials, including wood, board, concrete, tile, stone, metal, glass, and most plastics, with excellent cross-material performance."],
      ["Underwater use", "Cured adhesive maintains bond strength in wet and underwater conditions."],
    ],
    substrates: ["Wood & timber", "Board & paneling", "Concrete", "Tile", "Natural stone", "Most metals", "Glass", "Most plastics"],
    uses: ["Decoration and interior fit-out", "Furniture assembly", "General hardware fixing", "Flooring installations", "Replacing nails and screws on panels, trims and fixtures"],
    keySpecs: [["clock", "Tack-free", "5–10 min"], ["droplet", "Complete cure", "24 hrs"], ["thermo", "Temp. resistance", "-20 to 31°C"], ["box", "Pack", "300 mL · White"]],
    specs: [
      ["Appearance", "—", "Light-coloured paste"],
      ["Specific gravity", "g/mL", "1.01 – 1.4"],
      ["Solid content", "%", "68 – 72"],
      ["Viscosity", "Pa·s", "300,000"],
      ["Tack-free time", "Minutes", "5 – 10"],
      ["Complete curing", "Hours", "24"],
      ["Shear strength", "kPa", "20 – 30"],
      ["Temperature resistance (cured)", "°C", "-20 to 31"],
    ],
    specsNote: "Properties listed are based on laboratory-controlled tests. All values are subject to a tolerance of 5–10%.",
    howto: [
      ["Prepare", "Ensure surfaces are clean, dry, and free of dust, oil, or grease."],
      ["Load", "Cut the cartridge nozzle to the desired bead size and load into a standard caulking gun."],
      ["Apply & press", "Apply in a continuous bead or spot pattern to one surface and press materials firmly together."],
      ["Hold & cure", "Hold or brace in position until initial tack is achieved (approx. 5–10 minutes). Allow 24 hours for complete curing."],
    ],
    notes: "Before the adhesive has fully cured, uncured residue can be cleaned with water. Once dry, cured residue can be removed by scraping or light grinding. This product may be used in conjunction with flooring installations. Adhesion strength may weaken at elevated temperatures; avoid application on metal surfaces that have been exposed to direct sunlight for extended periods.",
    packaging: "300 mL cartridge, White.",
    storage: "Store in a cool, dry place below 30°C, away from direct sunlight. Use within 12 months from the date of production.",
    faqs: [
      ["Can it be used in wet areas or underwater?", "Yes. Once cured, MightyFix Liquid Nails maintains its bond strength in wet and underwater conditions."],
      ["How long until it holds?", "Initial tack is achieved in approximately 5–10 minutes — hold or brace the materials until then. Allow 24 hours for complete curing."],
      ["What surfaces does it bond to?", "Wood, timber, board and paneling, concrete, tile, natural stone, most metals, glass, and most plastics."],
      ["How do I clean up?", "Uncured residue can be cleaned with water. Once dry, cured residue can be removed by scraping or light grinding."],
      ["Is there anywhere I shouldn't use it?", "Adhesion strength may weaken at elevated temperatures. Avoid applying it on metal surfaces that have been exposed to direct sunlight for extended periods."],
    ] },
  /* Source: MightyFix product listing for SKU 03805 (supplied 01-Nov-2026). No TDS yet. */
  { slug: "n25-neutral-cure-silicone", name: "MightyFix N25 Neutral Cure Silicone", cat: "sealants", range: null, group: "Silicone",
    real: true, sku: "03805",
    image: "assets/img/products/mightyfix-n25-neutral-cure-silicone.png",
    cutout: "assets/img/products/mightyfix-n25-neutral-cure-silicone-cutout.png",
    tagline: "High performance glazing sealant", size: "600 mL sausage", colour: "White",
    bullets: ["Neutral cure — one-part and ready to use", "Mildew resistant for kitchens, bathrooms and sanitary ware", "Weather resistant for windows, roofing and facades"],
    sectors: ["construction"], apps: ["joint-sealants", "wet-areas", "windows-doors", "roofing", "plumbing-electrical"],
    lead: "One-part neutral-cure silicone that seals glass, metal, stone and sanitary ware — and keeps mildew out.",
    description: "MightyFix N25 Neutral Cure Silicone Sausage is a versatile one-part, neutral-cure sanitary grade silicone sealant with mildew-resistant properties. The cured sealant provides very good physical properties, weathering resistance, durability, sealing, and adhesive performance. It is suitable for a wide range of construction, sanitary, roofing, plumbing, and household applications.",
    features: [
      ["Neutral cure", "One-part formulation that is ready to use."],
      ["Weather resistant", "Provides resistance to weathering and environmental exposure."],
      ["Mildew resistant", "Suitable for sanitary and moisture-prone applications."],
      ["Durable & flexible", "Provides reliable sealing and adhesive performance after curing."],
      ["Excellent adhesion", "Suitable for bonding and sealing a variety of common substrates."],
    ],
    substrates: ["Glass", "Ceramics", "Tiles", "Fiberglass", "Metal", "Steel", "Aluminium", "Stone", "Marble", "Granite", "Concrete"],
    uses: ["Windows and doors", "Cladding and facade panels", "Roofing", "Plumbing", "Sanitary ware", "Kitchen and bathroom fittings"],
    keySpecs: [["droplet", "Type", "Neutral-cure silicone"], ["box", "Volume", "600 mL"], ["layers", "Colour", "White"], ["clock", "Shelf life", "12 months"]],
    specs: [
      ["Type", "—", "Neutral-cure silicone sealant"],
      ["Colour", "—", "White"],
      ["Volume", "mL", "600"],
      ["Shelf life", "Months", "12 (stored at 25°C or below)"],
    ],
    specsNote: "Full technical data sheet available on request — talk to our team.",
    packaging: "600 mL sausage, White.",
    faqs: [
      ["Is it suitable for bathrooms and kitchens?", "Yes. N25 is a sanitary-grade silicone with mildew-resistant properties, suitable for sanitary and moisture-prone applications such as kitchen and bathroom fittings."],
      ["What surfaces does it bond to?", "Glass, ceramics, tiles, fiberglass, metal, steel, aluminium, stone, marble, granite and concrete."],
      ["Can I use it outdoors?", "Yes. It resists weathering and environmental exposure, and is suitable for windows, doors, cladding, roofing and facade panels."],
      ["Does it need mixing?", "No. N25 is a one-part formulation that is ready to use."],
      ["How long can I store it?", "12 months when stored at 25°C or below."],
    ] },

  { slug: "mightybond-ms60", name: "MightyBond MS60", cat: "adhesives", range: "mightybond", group: "Hybrid MS polymer",
    tagline: "Hybrid polymer bonding adhesive", size: "290ml cartridge / 600ml foilpack",
    bullets: ["Bonds and seals in one step", "Paintable once cured", "Solvent- and isocyanate-free"],
    sectors: ["construction", "manufacturing"], apps: ["construction-adhesives", "panel-bonding", "commercial-vehicles"] },
  { slug: "mightygrip-instant", name: "MightyGrip Instant", cat: "adhesives", range: "mightygrip", group: "Solvent-based",
    tagline: "Instant-grab panel adhesive", size: "375g cartridge",
    bullets: ["Grabs in seconds", "Ideal for panels, mouldings and skirting", "Gap-filling formula"],
    sectors: ["construction"], apps: ["construction-adhesives", "painting-plastering"] },
  { slug: "mightybond-pu40", name: "MightyBond PU40", cat: "adhesives", range: "mightypro", group: "Polyurethane",
    tagline: "Polyurethane structural adhesive", size: "600ml foilpack",
    bullets: ["Structural strength for demanding joints", "High vibration resistance", "Approved for transport builds"],
    sectors: ["manufacturing"], apps: ["commercial-vehicles", "bus-coach", "marine"] },

  { slug: "mightyseal-wet-area", name: "MightySeal Wet Area", cat: "sealants", range: "mightyseal", group: "Silicone",
    tagline: "Anti-mould sanitary silicone", size: "300ml cartridge",
    bullets: ["Waterproof in one hour", "Mould-resistant for XX years", "Stays flexible and white"],
    sectors: ["construction"], apps: ["joint-sealants", "plumbing-electrical", "wet-areas"] },
  { slug: "mightyseal-ms40", name: "MightySeal MS40", cat: "sealants", range: "mightyseal", group: "Hybrid MS polymer",
    tagline: "Building & industrial hybrid sealant", size: "290ml cartridge / 600ml foilpack",
    bullets: ["Seals and bonds in one product", "UV and weather resistant", "Over-paintable"],
    sectors: ["construction", "manufacturing"], apps: ["joint-sealants", "roofing", "commercial-vehicles", "marine", "windows-doors"] },
  { slug: "mightyseal-facade", name: "MightySeal Facade", cat: "sealants", range: "mightyseal", group: "Silicone",
    tagline: "Neutral-cure facade silicone", size: "600ml foilpack",
    bullets: ["Movement capability ±XX%", "Non-staining on stone and concrete", "Weatherproof for decades"],
    sectors: ["construction"], apps: ["joint-sealants", "roofing"] },
  { slug: "mightyseal-roof", name: "MightySeal Roof & Gutter", cat: "sealants", range: "mightyseal", group: "Hybrid MS polymer",
    tagline: "All-weather roof sealant", size: "300ml cartridge",
    bullets: ["Applies in wet weather", "Bonds to metal, tile and membrane", "UV stable"],
    sectors: ["construction"], apps: ["roofing", "plumbing-electrical"] },
  { slug: "mightyseal-fire", name: "MightySeal Fire", cat: "sealants", range: "mightypro", group: "Fire-rated",
    tagline: "Fire-rated movement sealant", size: "600ml foilpack",
    bullets: ["Up to XX-hour fire rating", "For tilt-panel and precast joints", "Silicone- and solvent-free"],
    sectors: ["construction"], apps: ["joint-sealants", "hvac"] },
  { slug: "mightyseal-acrylic", name: "MightySeal Paintable", cat: "sealants", range: "mightyseal", group: "Acrylic",
    tagline: "Paintable acrylic sealant", size: "300ml cartridge",
    bullets: ["Paint over in XX minutes", "Low odour for interiors", "Water clean-up"],
    sectors: ["construction"], apps: ["painting-plastering", "acoustics", "windows-doors"] },
  { slug: "mightyseal-marine", name: "MightySeal Marine", cat: "sealants", range: "mightypro", group: "Hybrid MS polymer",
    tagline: "Above- and below-waterline sealant", size: "290ml cartridge",
    bullets: ["Cures underwater", "Salt-water and UV resistant", "Sands and paints"],
    sectors: ["manufacturing"], apps: ["marine", "caravan-motorhome"] },

  { slug: "mightyfix-gap-filler", name: "MightyFix Gap Filler", cat: "fillers", range: "mightygrip", group: "Gap fillers",
    tagline: "Fast-dry interior gap filler", size: "450g cartridge",
    bullets: ["Sands smooth, no shrink-back", "Paint in XX minutes", "Fills gaps up to XXmm"],
    sectors: ["construction"], apps: ["painting-plastering", "windows-doors"] },
  { slug: "mightyfix-crack-repair", name: "MightyFix Crack Repair", cat: "fillers", range: "mightygrip", group: "Crack repair",
    tagline: "Flexible crack repair compound", size: "300ml cartridge",
    bullets: ["Moves with the building", "Interior and exterior", "Textured finish"],
    sectors: ["construction"], apps: ["painting-plastering", "acoustics"] },

  { slug: "mightyfoam-gun", name: "MightyFoam Gun Grade", cat: "foams", range: "mightyfoam", group: "Gun-grade foam",
    tagline: "Low-expansion gun foam", size: "750ml can",
    bullets: ["Low pressure — won't bow frames", "Thermal and acoustic insulation", "Trim in XX minutes"],
    sectors: ["construction"], apps: ["construction-adhesives", "acoustics", "hvac", "windows-doors"] },
  { slug: "mightyfoam-fire", name: "MightyFoam Fire", cat: "foams", range: "mightyfoam", group: "Fire-rated foam",
    tagline: "Fire-rated expanding foam", size: "750ml can",
    bullets: ["Up to XX-hour fire rating", "Seals service penetrations", "Gun-applied for precision"],
    sectors: ["construction"], apps: ["plumbing-electrical", "hvac"] },

  { slug: "mightytape-mount", name: "MightyTape Mount", cat: "tapes", range: "mightygrip", group: "Mounting tapes",
    tagline: "Double-sided mounting tape", size: "19mm × 5m roll",
    bullets: ["Holds up to XXkg", "Indoor and outdoor", "Zero cure time"],
    sectors: ["construction", "manufacturing"], apps: ["panel-bonding", "caravan-motorhome", "joinery"] },
  { slug: "mightytape-seal", name: "MightyTape Seal", cat: "tapes", range: "mightypro", group: "Sealing tapes",
    tagline: "Butyl sealing tape", size: "50mm × 10m roll",
    bullets: ["Instant waterproof seal", "Bonds to metal, glass and plastic", "UV-stable facing"],
    sectors: ["construction", "manufacturing"], apps: ["roofing", "commercial-vehicles", "caravan-motorhome"] },

  { slug: "mightyfix-primer", name: "MightyFix Primer P1", cat: "cleaners", range: "mightypro", group: "Primers",
    tagline: "Porous surface primer", size: "250ml can",
    bullets: ["Boosts adhesion on concrete and masonry", "Fast flash-off", "Brush-applied"],
    sectors: ["construction", "manufacturing"], apps: ["joint-sealants", "panel-bonding", "marine"] },
  { slug: "mightyfix-wipes", name: "MightyFix Trade Wipes", cat: "cleaners", range: "mightypro", group: "Cleaners & wipes",
    tagline: "Heavy-duty cleaning wipes", size: "Tub of 80",
    bullets: ["Removes uncured sealant and adhesive", "Kind to hands", "Textured scrubbing side"],
    sectors: ["construction", "manufacturing"], apps: ["joint-sealants", "painting-plastering", "joinery", "wet-areas"] },
];

/* Applications (sectors → sub-applications). */
const SECTORS = [
  { slug: "construction", name: "Construction", photo: "crane",
    intro: "From foundations to finishing — products that seal, bond and protect every stage of the build.",
    children: [
      { slug: "joint-sealants", name: "Joint sealants", photo: "concreteBuild" },
      { slug: "construction-adhesives", name: "Construction adhesives", photo: "deck" },
      { slug: "plumbing-electrical", name: "Plumbing & electrical", photo: "plumber" },
      { slug: "painting-plastering", name: "Painting & plastering", photo: "plaster" },
      { slug: "hvac", name: "HVAC", photo: "ceilingLift" },
      { slug: "acoustics", name: "Acoustics", photo: "blueprints" },
      { slug: "roofing", name: "Roofing", photo: "roofTiles" },
      { slug: "wet-areas", name: "Bathrooms & wet areas", photo: "bathroom" },
    ] },
  { slug: "manufacturing", name: "Manufacturing", photo: "assembly",
    intro: "Industrial bonding and sealing that keeps production lines moving and finished goods holding together.",
    children: [
      { slug: "commercial-vehicles", name: "Commercial vehicles", photo: "truck" },
      { slug: "bus-coach", name: "Bus & coach", photo: "autoFactory" },
      { slug: "caravan-motorhome", name: "Caravan & motorhome", photo: "metalFrame" },
      { slug: "marine", name: "Marine", photo: "sailing" },
      { slug: "panel-bonding", name: "Panel bonding", photo: "warehouse" },
      { slug: "joinery", name: "Joinery & furniture", photo: "joinery" },
    ] },
  { slug: "home-diy", name: "Home & DIY", photo: "caulkWindow",
    intro: "Pro-grade results for homeowners — clear steps, honest labels and products that get it right first time.",
    children: [
      { slug: "wet-areas", name: "Bathrooms & wet areas", photo: "bathroom" },
      { slug: "windows-doors", name: "Windows & doors", photo: "caulkWindow" },
      { slug: "painting-plastering", name: "Painting & plastering", photo: "plaster" },
      { slug: "roofing", name: "Roofing & gutters", photo: "roofDrill" },
    ] },
];

const ARTICLES = [
  { id: "silicone-vs-hybrid", type: "Technical insight", date: "12 Sep 2026", read: "5 min", photo: "caulkWindow",
    title: "Silicone or hybrid? Choosing the right sealant for the joint" },
  { id: "surface-prep", type: "Technical insight", date: "28 Aug 2026", read: "4 min", photo: "tile",
    title: "Surface prep: the five minutes that make the bond last" },
  { id: "cure-times", type: "Understanding adhesives", date: "9 Aug 2026", read: "6 min", photo: "labBench",
    title: "Cure time vs. skin time — what the numbers on the label mean" },
  { id: "wet-weather", type: "Product feature", date: "21 Jul 2026", read: "3 min", photo: "roofTiles",
    title: "Sealing in the rain: when wet-weather products earn their keep" },
  { id: "inside-the-lab", type: "Research & development", date: "2 Jul 2026", read: "7 min", photo: "lab",
    title: "Inside the lab: how we stress-test every formula" },
  { id: "foam-mistakes", type: "Technical insight", date: "14 Jun 2026", read: "4 min", photo: "wallPipes",
    title: "Three expanding-foam mistakes (and how to avoid them)" },
];

const VIDEOS = [
  { id: "v1", title: "How to run a clean silicone bead", duration: "1:42", photo: "subwayTile" },
  { id: "v2", title: "Loading a foilpack in 30 seconds", duration: "0:58", photo: "tools" },
  { id: "v3", title: "Fixing skirting without nails", duration: "2:15", photo: "carpenter" },
  { id: "v4", title: "Sealing a roof penetration", duration: "3:04", photo: "metalRoof" },
];

const CASE_STUDIES = [
  { id: "harbour-tower", sector: "construction", title: "[Project name]: sealing a 30-storey facade", photo: "cranesDusk",
    client: "[Client name]", location: "[City]", products: ["mightyseal-facade", "mightyfix-primer"] },
  { id: "fleet-refit", sector: "manufacturing", title: "[Client] fleet refit: bonding 200 truck bodies", photo: "truck",
    client: "[Client name]", location: "[City]", products: ["mightybond-pu40", "mightytape-seal"] },
  { id: "marina-rebuild", sector: "manufacturing", title: "[Marina name]: below-waterline repairs in one tide", photo: "marina",
    client: "[Client name]", location: "[City]", products: ["mightyseal-marine", "mightyfix-primer"] },
  { id: "school-fitout", sector: "construction", title: "[School name]: fire-rated joints across 40 classrooms", photo: "concreteBuild",
    client: "[Client name]", location: "[City]", products: ["mightyseal-fire", "mightyfoam-fire"] },
  { id: "hotel-bathrooms", sector: "construction", title: "[Hotel name]: 320 wet-area refits, zero callbacks", photo: "bathroom",
    client: "[Client name]", location: "[City]", products: ["mightyseal-wet-area", "mightyfix-wipes"] },
  { id: "joinery-line", sector: "manufacturing", title: "[Workshop name]: cutting clamp time on a joinery line", photo: "joinery",
    client: "[Client name]", location: "[City]", products: ["liquid-nails", "mightytape-mount"] },
];

const OFFICES = [
  { name: "Head office", city: "[City, Country]", phone: "+00 000 000 000", email: "sales@mightyfix.com", address: "[Street address line]" },
  { name: "Branch office", city: "[City]", phone: "+00 000 000 000", email: "sales@mightyfix.com", address: "[Street address line]" },
  { name: "Distribution centre", city: "[City]", phone: "+00 000 000 000", email: "orders@mightyfix.com", address: "[Street address line]" },
];

/* Lookups */
const byCat = (slug) => CATEGORIES.find((c) => c.slug === slug);
const byProduct = (slug) => PRODUCTS.find((p) => p.slug === slug);
const allApps = () => {
  const seen = new Map();
  SECTORS.forEach((s) => s.children.forEach((c) => { if (!seen.has(c.slug)) seen.set(c.slug, { ...c, sector: s.slug }); }));
  return [...seen.values()];
};
