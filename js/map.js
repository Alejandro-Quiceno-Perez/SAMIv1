//Selectors
// const direction = document.getElementById("direction");

//token
const accessToken =
  "pk.eyJ1Ijoia3dtZWppYSIsImEiOiJjbGl2eWk4eWwxb3dhM3Bxdm5kNGtpOXRrIn0.RaBQJtXzaW3dBHodhcQg2Q";

const country = "CO";

if (!"geolocation" in navigator) {
  console.error("Geolocalización no disponible");
} else {
  // if (direction.value.trim() !== "") {
  //   obtenerCoordenadas(direction.value);
  // }
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
      mapboxgl.accessToken = accessToken;
      let map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: [position.coords.longitude, position.coords.latitude],
        zoom: 10,
      });

      let markers = [];
      let routeLayerID = "route";
      let initialMarker = new mapboxgl.Marker()
        .setLngLat([position.coords.longitude, position.coords.latitude])
        .addTo(map);
      markers.push(initialMarker);
      // }

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

async function obtenerCoordenadas(direccion) {
  try {
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${direccion}.json?country=${country}&access_token=${accessToken}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          // const coordenadas = data.features[0].geometry.coordinates;
          mapboxgl.accessToken = accessToken;
          let map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/navigation-day-v1",
            center: [
              data.features[0].geometry.coordinates,
              position.coords.latitude,
            ],
            zoom: 10,
          });

          let markers = [];
          // let routeLayerID = "route";
          let initialMarker = new mapboxgl.Marker()
            .setLngLat([data.features[0].center[0], data.features[0].center[1]])
            .addTo(map);
          markers.push(initialMarker);

          console.log(data);
        } else {
          console.log(`No se encontraron coordenadas para "${direccion}"`);
        }
      });
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
  }
}

// function buscarCoordenadas() {
//   const direccionInput = document.getElementById("direccionInput");
//   const direccion = direccionInput.value;

//   if (direccion.trim() !== "") {
//     obtenerCoordenadas(direccion);
//   } else {
//     console.log("Por favor, ingrese una dirección válida.");
//   }
// }
