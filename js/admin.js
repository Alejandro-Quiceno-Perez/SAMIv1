import urlDesplegada from "../helpers/constantes";

const states = {
  active: "active",
  started: "started",
  completed: "completed",
  deleted: "deleted",
};

// selectores
let container_cards = document.getElementById("conCards");
let containerServicesActive = document.querySelector(".servicesActive");
let containerServicesStarted = document.querySelector(".servicesStart");
let containerServicesCompleted = document.querySelector(".servicesCompleted");
let tbodyAllServices = document.querySelector(".allServices tbody");

let btnEliminar;
let btnAccept;
let btnStart;
let btnComplete;

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  obtenerInfo();
});

const obtenerInfo = async () => {
  try {
    const response = await fetch(`${urlDesplegada}/requests`);
    const data = await response.json();
    pintarCardsRight(data);
  } catch (error) {
    console.log(error.message);
  }
};

const pintarCardsRight = (data) => {
  // Reinicializa el contenido del container_cards
  container_cards.innerHTML = "";
  containerServicesActive.innerHTML = "";
  containerServicesStarted.innerHTML = "";
  containerServicesCompleted.innerHTML = "";
  tbodyAllServices.innerHTML = "";

  data.forEach((i) => {
    if (i.state === "pending") {
      container_cards.innerHTML += `
    <div class="card m-3">
            <h5 class="card-header">New service</h5>
            <div class="card-body">
              <h5 class="card-text">${i.name}</h5>
              <p class="card-text">Email: ${i.email}</p>
              <p class="card-text">Tel: ${i.phone}</p>
              <p class="card-text">Address: ${i.address}</p>
              <p class="card-text">Patients: ${i.patients}</p>
              <p class="card-text">Emergency Grade: ${i.emergencyGrade}</p>
              <p class="card-text">Emergency Description: <br>${i.emergencyDescription}</br></p>
              <div class="modal-footer">
                <button class="btn btn-danger eliminar" id=${i.id}>Cancel</button>
                <button class="btn btn-success mx-3 accept" id=${i.id} >Accept</button>
              </div>
            </div>
          </div>
        `;
    } else if (i.state === states.active) {
      containerServicesActive.innerHTML += `
        <div class="card mt-3">
            <h5 class="card-header">Active service</h5>
            <div class="card-body">
              <h5 class="card-title">${i.name}</h5>
              < class="card-text">Emergency Grade: ${i.emergencyGrade}
              <br>Patients: ${i.patients}</br>
              <br>Emergency Description: ${i.emergencyDescription}</br>
              </p>
              <div class="modal-footer">
                <button class="btn btn-success start" id=${i.id}>Start service</button>
              </div>
            </div>
          </div>`;
    } else if (i.state === states.started) {
      containerServicesStarted.innerHTML += `
        <div class="card mt-3">
            <h5 class="card-header">Started service</h5>
            <div class="card-body">
              <h5 class="card-title">${i.name}</h5>
              <p class="card-text">Email: ${i.email}
              <br>Phone: ${i.phone}</br></p>
              <div class="modal-footer">
                <button class="btn btn-info mx-3 complete" id=${i.id}>Completed</button>
                <button class="btn btn-danger eliminar"id=${i.id}>Delete service</button>
              </div>
            </div>
          </div>`;
    } else if (i.state === states.completed) {
      containerServicesCompleted.innerHTML += `
        <div class="card mt-3">
        <div class="card-header">
          Service Completed: Id: ${i.id}
        </div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>Nombre: ${i.name}</p>
          </blockquote>
        </div>
      </div>`;
    }
    tbodyAllServices.innerHTML += `
        <tr>
                <th scope="row">${i.id}</th>
                <td>${i.name}</td>
                <td>${i.state}</td>
           
              </tr>`;
  });

  btnComplete = document.querySelectorAll(".complete");
  btnComplete.forEach((i) => {
    i.addEventListener("click", (e) => {
      e.preventDefault();
      completeService(i.id);
    });
  });

  btnStart = document.querySelectorAll(".start");
  btnStart.forEach((i) => {
    i.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(e.target);
      startService(i.id);
    });
  });

  btnAccept = document.querySelectorAll(".accept");
  btnAccept.forEach((i) => {
    i.addEventListener("click", (e) => {
      e.preventDefault();
      acceptService(i.id);
    });
  });

  btnEliminar = document.querySelectorAll(".eliminar");
  btnEliminar.forEach((i) => {
    i.addEventListener("click", (e) => {
      e.preventDefault();
      eliminarService(i.id);
    });
  });
};

const updateServiceState = async (id, newState) => {
  try {
    const service = await fetch(`${urlDesplegada}/requests/${id}`);

    const data = await service.json();

    if (!data) {
      console.log("El servicio no existe");
      return;
    }

    await fetch(`${urlDesplegada}/requests/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, state: newState }),
    });

    obtenerInfo();
  } catch (error) {
    console.log(error.message);
  }
};

const startService = async (id) => {
  await updateServiceState(id, states.started);
};

const completeService = async (id) => {
  await updateServiceState(id, states.completed);
};

const acceptService = async (id) => {
  await updateServiceState(id, states.active);
};

const eliminarService = async (id) => {
  await updateServiceState(id, states.deleted);
};

// const startService = async (id) => {
//   try {
//     const service = await fetch(`${urlDesplegada}/requests/${id}`);

//     const data = await service.json();

//     if (!data) {
//       console.log("El servicio no existe");
//       return;
//     }

//     await fetch(`${urlDesplegada}/requests/${data.id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ ...data, state: states.started }),
//     });

//     obtenerInfo();
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const completeService = async (id) => {
//   try {
//     const service = await fetch(`${urlDesplegada}/requests/${id}`);

//     const data = await service.json();

//     if (!data) {
//       console.log("El servicio no existe");
//       return;
//     }

//     await fetch(`${urlDesplegada}/requests/${data.id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ ...data, state: states.completed }),
//     });

//     obtenerInfo();
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const acceptService = async (id) => {
//   try {
//     const service = await fetch(`${urlDesplegada}/requests/${id}`);

//     const data = await service.json();

//     if (!data) {
//       console.log("El servicio no existe");
//       return;
//     }

//     await fetch(`${urlDesplegada}/requests/${data.id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ ...data, state: states.active }),
//     });

//     obtenerInfo();
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const eliminarService = async (id) => {
//   try {
//     const service = await fetch(`${urlDesplegada}/requests/${id}`);

//     const data = await service.json();

//     if (!service) {
//       console.log("el servicio no existe");
//       return;
//     }
//     await fetch(`${urlDesplegada}/requests/${data.id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ ...data, state: states.deleted }),
//     });

//     obtenerInfo();
//   } catch (error) {
//     console.log(error.message);
//   }
// };
