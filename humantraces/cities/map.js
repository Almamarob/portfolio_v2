// D3.js Interactive Europe Map
// Uses World Atlas GeoJSON data and D3 projection

async function initMap() {
  const container = d3.select("#map-container");
  const width = 700;
  const height = 800;

  // Create SVG
  const svg = container
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("class", "europe-map");

  // Setup projection for Europe
  const projection = d3
    .geoMercator()
    .center([12.5, 54])
    .scale(900)
    .translate([width / 2, height / 2]);

  const path = d3.geoPath().projection(projection);

  try {
    // Load GeoJSON data
    const world = await d3.json(
      "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json",
    );
    const countries = topojson.feature(world, world.objects.countries);

    // Filter for European countries (approximate bounding box)
    const europeCountries = countries.features.filter((d) => {
      const bounds = d3.geoBounds(d);
      const lon = (bounds[0][0] + bounds[1][0]) / 2;
      const lat = (bounds[0][1] + bounds[1][1]) / 2;
      return lon >= -15 && lon <= 40 && lat >= 34 && lat <= 72;
    });

    // Draw countries
    svg
      .append("g")
      .attr("class", "countries")
      .selectAll("path")
      .data(europeCountries)
      .enter()
      .append("path")
      .attr("class", "map-country")
      .attr("d", path);

    // City data
    const cities = [
      { name: "Milano", coords: [9.19, 45.46], url: "milano/milano.html" },
      { name: "Berlin", coords: [13.4, 52.52], url: "berlin/berlin.html" },
    ];

    // Draw city nodes
    const cityGroup = svg.append("g").attr("class", "cities");

    cities.forEach((city) => {
      const [x, y] = projection(city.coords);

      const node = cityGroup
        .append("g")
        .attr("class", "city-node")
        .attr("transform", `translate(${x},${y})`)
        .style("cursor", "pointer")
        .on("click", () => {
          window.location.href = city.url;
        });

      // Invisible larger hit area for easier clicking
      node
        .append("circle")
        .attr("r", 20)
        .style("fill", "transparent")
        .style("cursor", "pointer");

      // Outer ring - no pointer events to avoid flicker
      node
        .append("circle")
        .attr("class", "city-node-outer")
        .attr("r", 10)
        .style("pointer-events", "none");

      // Inner dot - no pointer events to avoid flicker
      node
        .append("circle")
        .attr("class", "city-node-inner")
        .attr("r", 5)
        .style("pointer-events", "none");

      // Label - no pointer events to avoid flicker
      node
        .append("text")
        .attr("class", "city-label")
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("pointer-events", "none")
        .text(city.name);
    });
  } catch (error) {
    console.error("Error loading map data:", error);
    // Fallback to simple SVG if D3 fails
    container.html(`
            <svg viewBox="0 0 ${width} ${height}" class="europe-map">
                <text x="${width / 2}" y="${height / 2}" text-anchor="middle" fill="#2c2c2a" font-size="16">
                    Map loading failed. Please refresh the page.
                </text>
            </svg>
        `);
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMap);
} else {
  initMap();
}
