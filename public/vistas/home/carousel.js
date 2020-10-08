/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file carousel.js-> Sirve para mostrar los productos en un carousel 
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 * 
/**
 * Mustra los productos en un carousel de targetas tiene la funcion de los botones
 * @access public
 *@function $('$slider').on('slide.bs.carousel', function () {})
*/
$("#slider").on("slide.bs.carousel", function (e) {
  let $e = $(e.relatedTarget),
    idx = $e.index(),
    itemsPerSlide = $(".carousel-item").length,
    totalItems = $(".carousel-item").length;

  if (idx >= totalItems - (itemsPerSlide - 1)) {
    let it = itemsPerSlide - (totalItems - idx);
    for (let i = 0; i < it; i++) {
      // agregar diapositivas para finalizar
      if (e.direction == "left") {
        $(".carousel-item").eq(i).appendTo(".carousel-inner");
      } else {
        $(".carousel-item").eq(0).appendTo(".carousel-inner");
      }
    }
  }
});
