// Add console.log to check to see if our code is working.
console.log('working');



// Create the map object with a center and zoom level, to the approximate center of the US
let map = L.map('mapid').setView([35, -95], 5);
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
    id: 'mapbox/dark-v10', // use dark theme
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

// add a marker to the map
let marker = L.marker([34.0522, -118.2437]).addTo(map); 

// add a circle to the map
let circle = L.circle([34.0522, -118.2437],
    {
        radius: 300,
        color: 'black',
        fillColor: 'yellow',
        fillopacity: 0.5
    }
).addTo(map);

// add a circleMarker to the map
let circleMarker = L.circleMarker([34.0522, -118.2437],
                        {
                            radius: 300, // radius has 300 pixels
                            color: 'black',
                            fillColor: 'gray',
                            fillopacity: 0.5
                        }
                    ).addTo(map);

// get data from cities.js
let cityData = cities;

// add multiple cities as markers
cityData.forEach(function(city) {
    console.log(city);
    L.circleMarker(city.location, {
        radius: city.population/2e5,
        color: 'orange',
        fillColor: 'orange',
        fillOpacity: 0.25
    })
    .bindPopup('<h2>' + city.city + ', ' + city.state + '</h2> <hr> <h3>Population ' + city.population.toLocaleString() + '</h3>')
    .addTo(map);
})