/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file perfil.js-> Sirve para la navegacion en el perfil
 * @license MIT Libre disttribucion
 */
var perfil = new Vue({
  el: '#navi',
  data() {
    return {
      active: 4
    }

  },
  methods: {
    /**
     * Carga el contenido del formulario productos
     * @access public
     * @event click#productos
     */
    inventario: function () {
      $(".contenidoP").load(
        "public/vistasPerfil/inventario/navFacturaProductos.html",
        function (data) {
          $(this).html(data);
        }
      );
    },
    hWork: function () {
      $(".contenidoP").load(
        "public/vistasPerfil/horario/horario.html",
        function (data) {
          $(this).html(data);
        }
      );
    },
    /**
     * Carga el contenido del formulario direccion
     * @access public
     * @event click#direccion
     */
    direction: function () {
      $(".contenidoP").load("public/vistasPerfil/direccion/direccion.html", function (
        data
      ) {
        $(this).html(data);
      });
    },
    /**
     * Carga el contenido del formulario nosotros
     * @access public
     * @event click#nosotros
     */
    we: function () {
      $(".contenidoP").load(
        "public/vistasPerfil/contenido/nosotros.html",
        function (data) {
          $(this).html(data);
        }
      );
    },
  }
})