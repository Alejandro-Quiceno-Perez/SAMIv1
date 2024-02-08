const info = document.querySelector(".info-userService");

document.addEventListener("DOMContentLoaded", () => {
  pintarData();
});

export const pintarData = () => {
  const request = localStorage.getItem("request");
  const parseData = JSON.parse(request);

  parseData
    ? (info.innerHTML = ` <div class="card ">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h3 class="fw-bold">Information about your service</h3>
      <h5>Count - Second</h5>
    </div>
    <div class="card-body row">
      <p class="card-text col-4 fw-bold">
        Information Id service: <span class="fw-normal">${parseData.id}</span>
      </p>
      <p class="card-text col-4 fw-bold">
        Name of the driver: <span class="fw-normal">${parseData.ambulance.conductor}</span>
      </p>
      <p class="card-text col-4 fw-bold">
        Ambulance type: <span class="fw-normal">${parseData.ambulance.tipo}</span>
      </p>
      <p class="card-text col-4 fw-bold">License Plate: <span class="fw-normal">${parseData.ambulance.placa}</span></p>
      <p class="card-text col-4 fw-bold">
        Cost of Service: <span class="fw-normal">$0-100% discount</span>
      </p>
      <div class="modal-footer">
        <a id="prueba" href="index.html" class="btn btn-danger mx-3">
          Cancel
        </a>
      </div>
    </div>
  </div>`)
    : (info.innerHTML = "");

  const location = {
    lat: parseData.ambulance.lat,
    lng: parseData.ambulance.lng,
  };
  return location;
};
