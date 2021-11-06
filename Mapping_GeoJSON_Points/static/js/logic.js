// Add console.log to check to see if our code is working.
console.log('working');

// Create the map object with a center and zoom level, to the approximate center of the US
let map = L.map('mapid').setView([37.5, -122.5], 10);
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
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}} // lat and lng are in reserved order
]};

// // Grabbing our GeoJSON data
// L.geoJSON(sanFranAirport).addTo(map);

// pointToLayer function
L.geoJSON(sanFranAirport, {
    pointToLayer: function(feature, latlng) {
        console.log(feature);
        return L.marker(latlng).bindPopup('<h2>' + feature.properties.name + '</h2> <hr> <h3>' 
                                            + feature.properties.city + ', ' + feature.properties.country + '<h3>');
    }
}).addTo(map);

// onEachFeature function
L.geoJSON(sanFranAirport, {
    onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup('<h2>Airport code: ' + feature.properties.faa + '</h2> <hr> <h3>Airport name: ' 
        + feature.properties.name + '</h3>');
    }
}).addTo(map);