var map = L.map('earthquakemap').setView([38, -95], 4);
var basemapUrl = 'https://tile.osm.ch/switzerland/{z}/{x}/{y}.png'; 
var basemap = L.tileLayer(basemapUrl, 
	{attribution: '&copy; <a href="https: + //www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'	
	}).addTo(map);.addTo(map);


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
            if (feature.properties.severity === 'Extreme') alertColor = 'red';
            if (feature.properties.severity === 'Minor') alertColor = 'green';
            return { color: alertColor };
        },
        onEachFeature: function(feature, layer) { 
            layer.bindPopup(feature.properties.headline);
        }
    }).addTo(map);

});
