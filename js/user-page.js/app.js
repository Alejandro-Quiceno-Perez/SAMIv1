//selectores
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const userPhone = document.getElementById("user-phone");
const userAddress = document.getElementById("user-address");
const userPatientsNum = document.getElementById("patients");
const userEmergencyGrade = document.getElementById("emergency");
const userEmergencyDescription = document.getElementById("emerg-description");

const btnRequest = document.getElementById("btn-request");

const URLrequest = "http://localhost:3000/requests";

//eventos
btnRequest.addEventListener("click", (event) => {
  event.preventDefault();
  request();
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
  };

  console.log(
    requests.name,
    requests.email,
    requests.phone,
    requests.address,
    requests.patients,
    requests.emergencyGrade,
    requests.emergencyDescription
  );

  await fetch(URLrequest, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requests),
  });
}
