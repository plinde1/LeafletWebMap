var map = L.map('weathermap').setView([38, -95], 4),
var basemapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.pgn';
var basemap = L.tileLayer(basemapUrl, {attribution: '&copy; ,<a href=http://' + 'www.openstreetmap.org/copyright">OpenStreetMap'})

var radarUrl = 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi';
var radarDisplayOptions = {
	layers: 'nexrad-n0r-900913',
	fromat: 'image/png',
};

var radar = L.tileLayer.wms(radarUrl, radarDisplayOptions).addTo(map);

//https is different in pdf if this doesn't work
var weatherAlertsUrl = 'https://www.weather.gov/alerts/active?region_type=land';
$.getJSON(weatherAlertsUrl, function(data) {

	//Remember getJSON could go her but it is geoJSON in the video
	L.geoJSON(data, {
		style: function(feature){
			var alertColor = 'orange';
			if (feature.properties.serverity = 'Severe') alertColor = 'red';
			return { color: alertColor };
		},
		onEachFeature: function(feature, layer0) {
			layer0.bindPopup(feature.properties.headline);
		}
	}).addTo(map)
});
