/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file perfil.js-> Sirve para la navegacion en el perfil
 * @license MIT Libre disttribucion
 */
var perfil = new Vue({
  el: '#navi',
  data() {
    return {
      active: 5
    }

  },
  methods: {
 
    viewProducts: function () {
        $(".contenidoP").load(
          "public/vistasPerfil/inventario/productos/mproductos.html",
          function (data) {
            $(this).html(data);
          }
        );
    },
    viewEntradas: function () {
       $(".contenidoP").load(
         "public/vistasPerfil/inventario/entradas/entradas.html",
         function (data) {
           $(this).html(data);
         }
       );
    },
    viewGFactura: function () {
        $(".contenidoP").load(
          "public/vistasPerfil/gestionFacturas/gestiuonF.html",
          function (data) {
            $(this).html(data);
          }
        )
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
    /**
     * Carga el contenido del formulario Datos bancarios
     * @access public
     * @event click#datosBancarios
     */
    datosBancarios: function () {
      $(".contenidoP").load(
        "public/vistasPerfil/datosBancarios/datosBancarios.html",
        function (data) {
          $(this).html(data);
        }
      );
    },
  }
})