let map;
let directionsService;
let directionsRenderer;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 6.2193724219356685, lng: -75.58339605807475 },  //se centra en de moda outlet
        zoom: 12,
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    const geocoder = new google.maps.Geocoder();

    let emergencyPoint; // Punto A seleccionado por el usuario, lugar de emergencia
    let ambulancePoint = { lat: 0, lng: 0 }; // Punto B se captura por medio de json ubiaciones de hospitales

    // Evento al hacer clic en el mapa
    map.addListener("click", (event) => {
        if (!emergencyPoint) {
            emergencyPoint = event.latLng;
            placeMarker(emergencyPoint);
            geocodeLatLng(geocoder, emergencyPoint);
        } else {
            alert("Ya has seleccionado tu lugar de emergencia!");
        }
    });

    //calcula y muestra la ruta entre la emergencia y el punto designado por la ambulancia
    calculateAndDisplayRoute(emergencyPoint, ambulancePoint);
}

function placeMarker(location) {
    const marker = new google.maps.Marker({
        position: location,
        map: map,
    });
}

function geocodeLatLng(geocoder, latLng) {
    geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === "OK") {
            if (results[0]) {
                console.log(results[0].formatted_address); //muestra la dir seleccionada
            } else {
                console.log("No se encontraron resultados");
            }
        } else {
            console.log("Error al geocodificar: " + status);
        }
    });
}
