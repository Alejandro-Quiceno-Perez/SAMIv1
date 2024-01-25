<<<<<<< HEAD
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
=======
// // selector
// var menu = document.querySelector('.hamburger');

// // method
// function toggleMenu(event) {
//     this.classList.toggle('is-active');
//     document.querySelector(".menuppal").classList.toggle("is_active");
//     event.preventDefault();
// }

// // event
// menu.addEventListener('click', toggleMenu, false);
>>>>>>> a142f64f78544b28996feb0f5a947273eef34fb2
