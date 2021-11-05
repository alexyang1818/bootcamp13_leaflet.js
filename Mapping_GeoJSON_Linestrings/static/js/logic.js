// Add console.log to check to see if our code is working.
console.log('working');

// we create the tile layer that will be the background of our map
let light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: 'mapbox/streets-v11', // shows the streets on the map
    // id: 'mapbox/dark-v10', // use dark theme
    // id: 'mapbox/satellite-streets-v11', // use satellite theme
    id: 'mapbox/light-v10', // use light theme
    // id: 'mapbox/navigation-night-v1', // use navigation at night
    // id: 'mapbox/outdoors-v11', // use navigation at night
    accessToken: API_KEY
});

// we create the dark view tile layer that will be an option for our map
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox/dark-v10',
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

// create a base layer that holds both maps.
let baseMaps = {
    Light: light,
    Dark: dark
};

// Create the map object with a center and zoom level.
let map = L.map('mapid',{
    center: [44.0, -80.0],
    zoom: 2,
    layers: [dark]
});

// pass our map layer into our layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);

// Add GeoJSON data.
// Accessing the airport GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/alexyang1818/bootcamp13_leaflet.js/Mapping_GeoJSON_Linestrings/torontoRoutes.json";

// create a style for the lines
let myStyle = {
    color: 'yellow',
    weight: 2
}

// // Grabbing our GeoJSON data
d3.json(torontoData).then(function(data) {
    console.log(data);
    // creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
        style: myStyle,
        onEachFeature: function(feature, layer) {
            // console.log(layer);
            layer.bindPopup('<h2>Airline: ' + feature.properties.airline + '</h2> <hr> <h3>Destination: ' 
            + feature.properties.dst + '</h3>');
        }
    })
        .addTo(map);
});