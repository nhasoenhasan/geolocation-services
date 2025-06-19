const geolib = require("geolib");
const fs = require("fs");

// Load the countries.geojson data (make sure the path is correct)
const countriesGeoJSON = JSON.parse(
  fs.readFileSync("filtered_asean_countries_with_hk.geojson", "utf8")
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
        // Check if the point is inside the current polygon
        if (geolib.isPointInPolygon({ latitude: lat, longitude: long }, polygon[0])) {
          return country;
        }
      }
    } else if (feature.geometry.type === "Polygon") {
      // Check if the point is inside the polygon
      if (geolib.isPointInPolygon({ latitude: lat, longitude: long }, coordinates[0])) {
        return country;
      }
    }
  }

  // If the point is not inside any polygon, return 'No country found'
  return "No country found";
}

//: 1.548608, 103.920312


const lat = 1.548608; // Example latitude for Malaysia
const long = 103.920312; // Example longitude for Malaysia

const country = getCountryFromCoordinates(lat, long);

console.log(`The point is located in: ${country}`);
