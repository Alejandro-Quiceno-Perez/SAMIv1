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
})

// const scriptMap = document.querySelector(".script-map");
// scriptMap.innerHTML = `<script async src="https://maps.googleapis.com/maps/api/js?key=${key}&callback=console.debug&libraries=maps,marker&v=beta">
// </script>`
