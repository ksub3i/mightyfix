/*
  Contact-page map — a keyless recreation of the Snazzy Maps "Become a Dinosaur" style
  (https://snazzymaps.com/style/74/becomeadinosaur) using MapLibre GL + OpenFreeMap tiles.
  Palette from the Snazzy style: light grey land, white roads, teal water (#a0d3d3),
  green parks (#91b65d, lightened), road names only, no business or transit markers.
*/
(function () {
  const el = document.getElementById("contact-map-canvas");
  if (!el || !window.maplibregl || typeof MAP_ADDRESS === "undefined" || !MAP_ADDRESS) return;

  const LAND = "#e5e8e7", BUILT = "#eceeed", BUILDING = "#dadedd", ROAD = "#ffffff", WATER = "#a0d3d3", PARK = "#b9d48f", LABEL = "#5f6b6a";

  // Recolour OpenFreeMap's Positron style layer by layer, and hide everything Snazzy hides.
  function restyle(style) {
    style.layers = style.layers.filter((l) => {
      if (l.type === "symbol") return l["source-layer"] === "transportation_name";  // road names only, no other labels or icons
      if (/^(boundary|railway|aeroway|tunnel_|landcover_ice|landcover_glacier)/.test(l.id)) return false;
      if (/casing|subtle/.test(l.id)) return false;                            // flat, single-line roads
      return true;
    });
    for (const l of style.layers) {
      l.paint = l.paint || {};
      if (l.type === "background") l.paint["background-color"] = LAND;
      else if (l.id === "water") { l.paint["fill-color"] = WATER; delete l.paint["fill-opacity"]; }
      else if (l.id === "waterway") l.paint["line-color"] = WATER;
      else if (l.id === "park" || l.id === "landcover_wood") { l.paint["fill-color"] = PARK; l.paint["fill-opacity"] = 1; }
      else if (l.id === "landuse_residential") { l.paint["fill-color"] = BUILT; l.paint["fill-opacity"] = 1; }
      else if (l.id === "building") { l.paint["fill-color"] = BUILDING; delete l.paint["fill-outline-color"]; }
      else if (l.type === "line" && l["source-layer"] === "transportation") l.paint["line-color"] = ROAD;
      else if (l.type === "fill" && l["source-layer"] === "transportation") l.paint["fill-color"] = ROAD;
      else if (l.type === "symbol") { l.paint["text-color"] = LABEL; l.paint["text-halo-color"] = ROAD; l.paint["text-halo-width"] = 1.5; }
    }
    return style;
  }

  fetch("https://tiles.openfreemap.org/styles/positron")
    .then((r) => r.json())
    .then((style) => {
      const center = [MAP_LOCATION.lng, MAP_LOCATION.lat];
      const map = new maplibregl.Map({
        container: el, style: restyle(style), center, zoom: 16,
        cooperativeGestures: true,          // page scrolls normally; ctrl/two-finger to zoom the map
        attributionControl: { compact: true },
      });
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");

      const pin = document.createElement("div");
      pin.className = "map-pin";
      pin.innerHTML = '<img src="assets/img/symbol-white.png" alt="">';
      pin.setAttribute("aria-label", "MightyFix");
      new maplibregl.Marker({ element: pin, anchor: "bottom" }).setLngLat(center).addTo(map);
    })
    .catch(() => { el.closest(".contact-map").hidden = true; });
})();
