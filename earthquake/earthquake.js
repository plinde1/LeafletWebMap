var map = L.map('earthquakemap').setView([38, -95], 4);
var basemapUrl = 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'; 
var basemap = L.tileLayer(basemapUrl, 
	{attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'	
	}).addTo(map);


var weatherAlertsUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
$.getJSON(weatherAlertsUrl, function(data) {

    L.geoJSON(data, {
        style: function(feature){
            let alertColor = 'red';
            if (feature.properties.mag >= 6.0) alertColor = 'red';
            return { color: alertColor };
        },
        onEachFeature: function(feature, layer) { 
            const magnitude = feature.properties.mag;
            const place = feature.properties.place;
            const time = new Date(feature.properties.time).toLocaleString(); // Format time
            layer.bindPopup(`Magnitude: ${magnitude}<br>Location: ${place}<br>Time: ${time}`);
        }
    }).addTo(map);
});
