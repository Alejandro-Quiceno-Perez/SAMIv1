document.addEventListener("DOMContentLoaded", function () {
  let sliderContainer = document.getElementById("imageSlider");
  let slides = sliderContainer.querySelectorAll(".slide");

  let currentSlideIndex = 0;
  setInterval(changeSlide, 8000);

  function changeSlide() {
    slides[currentSlideIndex].style.opacity = 0;

    currentSlideIndex = (currentSlideIndex + 1) % slides.length;

    fadeIn(slides[currentSlideIndex]);
  }

  function fadeIn(element) {
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
});
