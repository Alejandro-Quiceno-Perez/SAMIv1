document.addEventListener("DOMContentLoaded", function () {
  let sliderContainer = document.getElementById("imageSlider");
  let slides = sliderContainer.querySelectorAll(".slide");
  let aboutParagraph = document.querySelector(".section-about .about p");

  let currentSlideIndex = 0;
  setInterval(changeSlide, 8000);

  function changeSlide() {
    fadeOut(slides[currentSlideIndex]);
    fadeOut(aboutParagraph, true);

    currentSlideIndex = (currentSlideIndex + 1) % slides.length;

    fadeIn(slides[currentSlideIndex]);
    fadeIn(aboutParagraph, true);
  }

  function fadeIn(element, isText = false) {
    let opacity = 0;
    let interval = setInterval(function () {
      if (opacity < 1) {
        opacity += 2;
        element.style.opacity = opacity;
      } else {
        clearInterval(interval);
      }
    }, 50);
  }

  function fadeOut(element, isText = false) {
    let opacity = 1;
    let interval = setInterval(function () {
      if (opacity > 0) {
        opacity -= 2;
        element.style.opacity = opacity;
      } else {
        clearInterval(interval);
        if (isText) {
          aboutParagraph.innerHTML = getRandomText();
        }
      }
    }, 50);
  }

  function getRandomText() {
    // Lista de mensajes aleatorios
    const messages = [
      "Cuidado urgente a tu alcance. Nuestras ambulancias responden con rapidez, ¡contáctanos ahora!",
      "Tu salud es nuestra prioridad. Ambulancias listas para intervenir en segundos. ¡Confía en nosotros!",
      "Servicio de ambulancia 24/7. Velocidad y atención médica de calidad. Estamos aquí cuando nos necesitas.",
      "SAMI. Tu salud. Nuestra prioridad",
    ];

    // Obtener un índice aleatorio
    const randomIndex = Math.floor(Math.random() * messages.length);

    // Devolver el mensaje aleatorio
    return messages[randomIndex];
  }
});
