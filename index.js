const turf = require("@turf/turf");
const fs = require("fs");

// Load the countries.geojson data (make sure the path is correct)
const countriesGeoJSON = JSON.parse(
  fs.readFileSync("final_asean_countries_with_hk.geojson", "utf8"),
);

// Function to check which country a point (latitude, longitude) belongs to
function getCountryFromCoordinates(lat, long) {
  // Loop through all the countries in the GeoJSON data
  for (const feature of countriesGeoJSON.features) {
    const country = feature.properties.name;
    const coordinates = feature.geometry.coordinates;

    // Handle MultiPolygon geometries (countries that span multiple areas)
    if (feature.geometry.type === "MultiPolygon") {
      for (const polygon of coordinates) {
        const countryPolygon = turf.polygon(polygon);
        const point = turf.point([long, lat]); // [longitude, latitude]

        // Check if the point is inside the current polygon
        if (turf.booleanPointInPolygon(point, countryPolygon)) {
          return country;
        }
      }
    } else if (feature.geometry.type === "Polygon") {
      const countryPolygon = turf.polygon(coordinates);
      const point = turf.point([long, lat]); // [longitude, latitude]

      // Check if the point is inside the polygon
      if (turf.booleanPointInPolygon(point, countryPolygon)) {
        return country;
      }
    }
  }

  // If the point is not inside any polygon, return 'No country found'
  return "No country found";
}
//22.305754, 114.298789;

const lat = 22.305754; // Example latitude for Malaysia
const long = 114.298789; // Example longitude for Malaysia

const country = getCountryFromCoordinates(lat, long);

console.log(`The point is located in: ${country}`);
