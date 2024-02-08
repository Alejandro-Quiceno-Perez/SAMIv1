import {randomAmbulancia} from "./ambulance.js";
const btnOpen = document.querySelector("#open-menu");

const btnClose = document.querySelector("#close-menu");
const nav = document.querySelector("#menu");
const prueba = document.getElementById("prueba");

btnOpen.addEventListener("click", (e) => {
  e.preventDefault();
  nav.classList.add("visible");
});

btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  nav.classList.remove("visible");
});

prueba.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(randomAmbulancia());
});
