const slider = document.querySelector(".range-input");
const boxSlider = document.querySelector(".box-slider");
const value = document.querySelector(".value");

value.textContent = slider.value;

slider.oninput = function () {
  value.textContent = this.value;

  // Calculate color based on the slider value
  if (this.value <= 20) {
    boxSlider.className = "box-slider color-1";
  } else if (this.value <= 40) {
    boxSlider.className = "box-slider color-2";
  } else if (this.value <= 60) {
    boxSlider.className = "box-slider color-3";
  } else if (this.value <= 80) {
    boxSlider.className = "box-slider color-4";
  } else {
    boxSlider.className = "box-slider color-5";
  }
};