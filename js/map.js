if (!navigator.geolocation) {
  console.log("Ubicacion bloqueada por el usuario");
} else {
  navigator.geolocation.getCurrentPosition((position) => {
    const ubicacion = new google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );

    // Crear el mapa centrado en la ubicación actual
    mapa = new google.maps.Map(document.getElementById("map"), {
      center: ubicacion,
      zoom: 15,
    });

    // Agregar un marcador en la ubicación actual
    const marcador = new google.maps.Marker({
      position: ubicacion,
      map: mapa,
      title: "Ubicación Actual",
    });
  });
}
