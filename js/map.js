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


//FORMA 2 PUNTOS 

/* 
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

    let selectedPoints = [];

    // Evento al hacer clic en el mapa
    map.addListener("click", (event) => {
        if (selectedPoints.length < 2) {
            placeMarker(event.latLng);
            geocodeLatLng(geocoder, event.latLng);
            selectedPoints.push(event.latLng);

            if (selectedPoints.length === 2) {
                calculateAndDisplayRoute(selectedPoints[0], selectedPoints[1]);
            }
        } else {
            alert("Ya has seleccionado dos puntos.");
        }
    });
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
                console.log(results[0].formatted_address); // Aquí puedes mostrar la dirección en la interfaz de usuario
            } else {
                console.log("No se encontraron resultados");
            }
        } else {
            console.log("Error al geocodificar: " + status);
        }
    });
}

function calculateAndDisplayRoute(origin, destination) {
    directionsService.route(
        {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING, // Ruta en carro
        },
        (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
            } else {
                window.alert("La solicitud de ruta ha fallado debido a: " + status);
            }
        }
    );
} */