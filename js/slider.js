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

