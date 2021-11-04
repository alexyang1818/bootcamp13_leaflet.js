// Add console.log to check to see if our code is working.
console.log('working');

// Create the map object with a center and zoom level, to the approximate center of the US
let map = L.map('mapid').setView([40.7, -94.5], 4);
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
    id: 'mapbox/streets-v11', // shows the streets on the map
    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY
});
// other map styles available under 'id':
// mapbox/streets-v11
// mapbox/outdoors-v11
// mapbox/light-v10
// mapbox/dark-v10
// mapbox/satellite-v9
// mapbox/satellite-streets-v11

// then we add our 'graymap' tile layer to the map.
streets.addTo(map);