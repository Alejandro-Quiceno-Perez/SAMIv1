const btnOpen = document.querySelector("#open-menu");

const btnClose = document.querySelector("#close-menu");
const nav = document.querySelector("#menu");

btnOpen.addEventListener("click", (e) => {
  e.preventDefault();
  nav.classList.add("visible");
});

btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  nav.classList.remove("visible");
});
