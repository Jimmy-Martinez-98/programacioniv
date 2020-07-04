/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file carousel.js-> Sirve para mostrar los productos en un carousel 
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 * 
/**
 * Mustra los productos en un carousel de targetas
 * @access public
 *@function $('$slider').on('slide.bs.carousel', function () {})
*/
$('#slider').on('slide.bs.carousel', function (e) {
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 5;
    var totalItems = $('.carousel-item').length;

    if (idx >= totalItems - (itemsPerSlide - 1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i = 0; i < it; i++) {
            // agregar diapositivas para finalizar
            if (e.direction == "left") {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
            }
            else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
});