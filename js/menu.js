// selector
var menu = document.querySelector('.hamburger');

// method
function toggleMenu(event) {
    this.classList.toggle('is-active');
    document.querySelector(".menuppal").classList.toggle("is_active");
    event.preventDefault();
}

// event
menu.addEventListener('click', toggleMenu, false);


// PRUEBA CREDENCIALES

const abrir_caja = document.getElementById('abrir_caja');
const cerrar_caja = document.getElementById('cerrar_caja');
const caja = document.getElementById('caja');

abrir_caja.addEventListener('click', function () {
    caja.classList.add('activo');
});

cerrar_caja.addEventListener('click', function () {
    caja.classList.remove('activo');
});



  