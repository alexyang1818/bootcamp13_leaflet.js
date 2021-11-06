// Add console.log to check to see if our code is working.
console.log('working');

// Create the map object with a center and zoom level, to the approximate center of the US
let map = L.map('mapid').setView([30, 30], 2);
// equivalent to the following:
// let map = L.map("mapid", {
//     center: [
//       40.7, -94.5
//     ],
//     zoom: 4
//   });

// we create the tile layer that will be the background of our map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: 'mapbox/streets-v11', // shows the streets on the map
    // id: 'mapbox/dark-v10', // use dark theme
    // id: 'mapbox/satellite-streets-v11', // use satellite theme
    // id: 'mapbox/light-v10', // use light theme
    // id: 'mapbox/navigation-night-v1', // use navigation at night
    id: 'mapbox/outdoors-v11', // use navigation at night
    accessToken: API_KEY
});
// other map styles available under 'id':
// mapbox/streets-v11
// mapbox/outdoors-v11
// mapbox/light-v10
// mapbox/dark-v10
// mapbox/satellite-v9
// mapbox/satellite-streets-v11
// mapbox/navigation-day-v1
// mapbox/navigation-night-v1

// then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Add GeoJSON data.
// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/alexyang1818/bootcamp13_leaflet.js/Mapping_GeoJSON_Points/majorAirports.json";

// // Grabbing our GeoJSON data
d3.json(airportData).then(function(data) {
    console.log(data);
    // creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
        onEachFeature: function(feature, layer) {
            console.log(layer);
            layer.bindPopup('<h2>Airport code: ' + feature.properties.faa + '</h2> <hr> <h3>Airport name: ' 
            + feature.properties.name + '</h3>');
        }})
        .addTo(map);
});