if (!"geolocation" in navigator) {
  console.error("Geolocalización no disponible");
} else {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
      mapboxgl.accessToken =
        "pk.eyJ1Ijoia3dtZWppYSIsImEiOiJjbGl2eWk4eWwxb3dhM3Bxdm5kNGtpOXRrIn0.RaBQJtXzaW3dBHodhcQg2Q";
      let map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/navigation-day-v1",
        center: [position.coords.longitude, position.coords.latitude],
        zoom: 10,
      });

      let markers = [];
      let routeLayerID = "route";

      let initialMarker = new mapboxgl.Marker()
        .setLngLat([position.coords.longitude, position.coords.latitude])
        .addTo(map);
      markers.push(initialMarker);

      function updateRoute() {
        if (markers.length === 2) {
          let start = markers[0].getLngLat();
          let end = markers[1].getLngLat();
          let directionsRequest =
            "https://api.mapbox.com/directions/v5/mapbox/driving/" +
            start.lng +
            "," +
            start.lat +
            ";" +
            end.lng +
            "," +
            end.lat +
            "?geometries=geojson&access_token=" +
            mapboxgl.accessToken;

          fetch(directionsRequest)
            .then((response) => response.json())
            .then((data) => {
              if (data.routes.length > 0) {
                let route = data.routes[0].geometry;
                if (map.getSource(routeLayerID)) {
                  map.getSource(routeLayerID).setData(route);
                } else {
                  map.addLayer({
                    id: routeLayerID,
                    type: "line",
                    source: {
                      type: "geojson",
                      data: route,
                    },
                    layout: {},
                    paint: {
                      "line-width": 2,
                      "line-color": "#1f00bd",
                    },
                  });
                }
              }
            })
            .catch((error) =>
              console.error("Error en la solicitud de la ruta:", error)
            );
        }
      }

      map.on("click", function (e) {
        let newMarker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map);
        markers.push(newMarker);

        if (markers.length > 2) {
          markers[0].remove();
          markers.shift();
        }

        updateRoute();
      });
    },
    (error) => {
      console.error(error);
    }
  );
}
