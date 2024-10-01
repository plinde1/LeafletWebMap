var map = L.map('bonusmap').setView([38, -95], 4);
var basemapUrl = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'; 
var basemap = L.tileLayer(basemapUrl, 
	{attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'	
	}).addTo(map);


var radarUrl = 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi';
var radarDisplayOptions = {
    layers: 'nexrad-n0r-900913',
    format: 'image/png',
	transparent: true
};

var radar = L.tileLayer.wms(radarUrl, radarDisplayOptions).addTo(map);


var weatherAlertsUrl = 'https://www.weather.gov/documentation/services-web-api#/default/get_alerts_active';
$.getJSON(weatherAlertsUrl, function(data) {

    L.geoJSON(data, {
        style: function(feature){
            var alertColor = 'orange';
            if (feature.properties.severity === 'Severe') alertColor = 'orange';
            return { color: alertColor };
        },
        onEachFeature: function(feature, layer) { 
            layer.bindPopup(feature.properties.headline);
        }
    }).addTo(map);

    L.geoJSON(data, {
        style: function(feature){
            var alertColor = 'red';
            if (feature.properties.severity === 'Extreme') alertColor = 'red';
            return { color: alertColor };
        },
        onEachFeature: function(feature, layer) { 
            layer.bindPopup(feature.properties.headline);
        }
    }).addTo(map);

    L.geoJSON(data, {
        style: function(feature){
            var alertColor = 'green';
            if (feature.properties.severity === 'Minor') alertColor = 'green';
            return { color: alertColor };
        },
        onEachFeature: function(feature, layer) { 
            layer.bindPopup(feature.properties.headline);
        }
    }).addTo(map);

});

function createLegend() {
    const legend = L.control({ position: 'topright' });

    legend.onAdd = function() {
        const div = L.DomUtil.create('div', 'info legend');
        
        div.innerHTML = '<h4>Magnitude</h4>' +
                        '<div style="background: green; width: 20px; height: 20px; display: inline-block;"></div> 0-4<br>' +
                        '<div style="background: orange; width: 20px; height: 20px; display: inline-block;"></div> 4-6<br>' +
                        '<div style="background: red; width: 20px; height: 20px; display: inline-block;"></div> 6+<br>';
        return div;
    };legend.addTo(map);
}createLegend();


var earthquakeAlertsUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
$.getJSON(earthquakeAlertsUrl, function(data) {

L.geoJSON(data, {
    pointToLayer: function(feature, latlng) {
        let magnitude = feature.properties.mag;
        let color;
        let radius;

        if (magnitude >= 6.0) {
            color = 'red';
            radius = 10;
        } else if (magnitude >= 4.0) {
            color = 'orange';
            radius = 7;
        } else {
            color = 'green';
            radius = 5; 
        }

        return L.circleMarker(latlng, {
            radius: radius,
            fillColor: color,
            color: color,
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        });

        
    },
    onEachFeature: function(feature, layer) { 
        const magnitude = feature.properties.mag;
        const place = feature.properties.place;
        const time = new Date(feature.properties.time).toLocaleString(); // Format time
        layer.bindPopup(`Magnitude: ${magnitude}<br>Location: ${place}<br>Time: ${time}`);
    }
}).addTo(map);

});
