import { states, apiUrl } from "../../helpers/conts.js";
//selectores
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const userPhone = document.getElementById("user-phone");
const userAddress = document.getElementById("user-address");
const userPatientsNum = document.getElementById("patients");
const userEmergencyGrade = document.getElementById("emergency");
const userEmergencyDescription = document.getElementById("emerg-description");

const btnRequest = document.getElementById("btn-request");

const obtainInfoUser = localStorage.getItem("userSami");

const user = JSON.parse(obtainInfoUser);

document.addEventListener("DOMContentLoaded", () => {
  user ? (userEmail.value = user.email) : "";
});
//eventos
btnRequest.addEventListener("click", (event) => {
  event.preventDefault();
  request();
  window.open("../../requestService.html");
});

//functions

async function request() {
  const requests = {
    name: userName.value,
    email: userEmail.value,
    phone: userPhone.value,
    address: userAddress.value,
    patients: userPatientsNum.value,
    emergencyGrade: userEmergencyGrade.value,
    emergencyDescription: userEmergencyDescription.value,
    userId: user.id,
    state: states.pending,
  };

  const data = await fetch(`${apiUrl}/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requests),
  });
}
