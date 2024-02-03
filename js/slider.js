// Add your custom JavaScript here
$(document).ready(function () {
    $("#custom-slider").on("input change", function () {

        let value = parseFloat($(this).val()).toFixed(1);
        $('#slider-value').text('Grado: ' + value);

        // Calculate color based on the slider value
        let colorClass;
        if (value <= 1) {
            colorClass = 'color-0';
        } else if (value <= 2) {
            colorClass = 'color-1';
        } else if (value <= 3) {
            colorClass = 'color-2';
        } else if (value <= 4) {
            colorClass = 'color-3';
        } else if (value <= 5) {
            colorClass = 'color-4';
        } else {
            colorClass = 'color-5';
        }

        $('#slider-value').attr('class', 'color-' + Math.round(value));
    });
});

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