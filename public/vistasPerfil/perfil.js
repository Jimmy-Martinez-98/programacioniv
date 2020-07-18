/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file perfil.js-> Sirve para la navegacion en el perfil
 * @license MIT Libre disttribucion
 */
$(document).ready(function () {
  /**
   * Carga el contenido del formulario nosotros
   * @access public
   * @event click#nosotros
   */
  $("#nosotros").click(() => {
    $(".contenidoP").load(
      "public/vistasPerfil/contenido/nosotros.html",
      function (data) {
        $(this).html(data);
      }
    );
  });

  /**
   * Carga el contenido del formulario direccion
   * @access public
   * @event click#direccion
   */
  $("#direccion").click(() => {
    $(".contenidoP").load(
      "public/vistasPerfil/direccion/direccion.html",
      function (data) {
        $(this).html(data);
      }
    );
  });

  /**
   * Carga el contenido del formulario historial
   * @access public
   * @event click#historial
   */
  $("#historial").click(() => {
    $(".contenidoP").load(
      "public/vistasPerfil/historialCompras/historialCompras.html",
      function (data) {
        $(this).html(data);
      }
    );
  });

  /**
   * Carga el contenido del formulario productos
   * @access public
   * @event click#productos
   */
  $("#productos").click(() => {
    $(".contenidoP").load(
      "public/vistasPerfil/misproductos/mproductos.html",
      function (data) {
        $(this).html(data);
      }
    );
  });

  /**
   * Carga el contenido del formulario horario
   * @access public
   * @event click#horario
   */
  $("#horario").click(() => {
    $(".contenidoP").load("public/vistasPerfil/horario/horario.html", function (
      data
    ) {
      $(this).html(data);
    });
  });
});
