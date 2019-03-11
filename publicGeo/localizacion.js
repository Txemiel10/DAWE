/* localizacion.js */
var watchId = null;
var map = null;
var ourCoords = {
	latitude: 43.326703599999995 ,
	longitude: -2.9900569999999997
};

window.onload = obtenerLocalizacion;

function obtenerLocalizacion() {
	if (navigator.geolocation) {
		var botonWatch = document.getElementById("watch");
		botonWatch.onclick = iniciarMonitorizacion;
		var botonClearWatch = document.getElementById("clearWatch");
		botonClearWatch.onclick = detenerMonitorizacion;
		//navigator.geolocation.getCurrentPosition( mostrarLocalizacion , mostrarError );
	}
	else {
		alert("Este navegador no soporta Geolocation API");
	}
}

function mostrarLocalizacion(posicion) {
	
	var latitud = posicion.coords.latitude;
	var longitud = posicion.coords.longitude;
	var altura = 0;
	var key = '9RoBVezPUZQPLZ5Br9DPgyJah0WCaMxE';
	
	var url = 'http://open.mapquestapi.com/elevation/v1/profile?latLngCollection=' + latitud + ',' + longitud + '&key=' + key
	
	var altitud = fetch(url).then(r1 => r1.json()).then(function(r1){ 
				altura = r1.elevationProfile[0].height;
				var div = document.getElementById("location");
				div.innerHTML = "Latitud de tu posición: " + latitud + ", Longitud: " + longitud + ', Altitud: ' + altura + ' metros';
				div.innerHTML = "<br> Con una precisión de " + posicion.coords.accuracy+" metros.";
				if (map == null) {
					mostrarMapa(posicion.coords,altura);
				} else {
					centrarMapa(posicion.coords,altura);
				}
			});
}

function mostrarMapa(coords, altitud) {

	var googleLatAndLong = new google.maps.LatLng(coords.latitude,coords.longitude);

	var mapOptions = {
			zoom: 10,
			center: googleLatAndLong,
			mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var mapDiv = document.getElementById("mapa");
	map = new google.maps.Map(mapDiv, mapOptions);

	var titulo = "Tu geoposición";
	var contenido = "Latitud: " + coords.latitude + ", Longitud:" + coords.longitude + ", Altitud:"+ altitud +"metros.";
	addMarker(map, googleLatAndLong, titulo, contenido);

}

function centrarMapa(coords,altura) {
	
	var latitud = coords.latitude;
	var longitud = coords.longitude;
	var latlong = new google.maps.LatLng(latitud, longitud);
	var altitud = altura;
	
	map.panTo(latlong);
	
	addMarker(map, latlong, "Tu nueva localización", "Te has movido a: " +
			latitud + "," + longitud + ", con altitud de " + altitud + "metros.");
}

function addMarker(mapa, latlong, title, content) 
{
	
	var markerOptions = {
		position: latlong,
		map: mapa,
		title: title,
		clickable: true
	};

	var marker = new google.maps.Marker(markerOptions);

	var infoWindowOptions = {
		content: content,
		position: latlong
	};
	
	
	var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
	
	google.maps.event.addListener(marker, "click", function() {
		infoWindow.open(map);
	});
}

function mostrarError(error) {
	var errorTypes = {
		0: "Error desconocido",
		1: "Permiso denegado",
		2: "Posición no disponible",
		3: "Tiempo de espera agotado"
	};
	var errorMessage = errorTypes[error.code];
	if (error.code == 0 || error.code == 2) {
		errorMessage = errorMessage + " " + error.message;
	}
	var div = document.getElementById("location");
	div.innerHTML = errorMessage;
}

function iniciarMonitorizacion(){
	watchId = navigator.geolocation.watchPosition(mostrarLocalizacion,mostrarError,
	{maximumAge:30000, timeout:5000, enableHighAccuracy:true})
}

function detenerMonitorizacion(){
	if (watchId){
		navigator.geolocation.clearWatch(watchId);
		watchId = null;
	}
}







