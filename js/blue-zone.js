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
      "Urgent care at your fingertips. Our ambulances respond quickly, contact us now!",
      "Your health is our priority. Ambulances ready to intervene in seconds. Trust us!",
      "24/7 ambulance service. Speed ​​and quality medical care. We are here when you need us.",
      "SAMI. Your health. Our priority",
    ];

    // Obtener un índice aleatorio
    const randomIndex = Math.floor(Math.random() * messages.length);

    // Devolver el mensaje aleatorio
    return messages[randomIndex];
  }
});
