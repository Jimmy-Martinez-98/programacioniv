/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file cooperativa.js-> Sirve para la navegacion en el perfil
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var firebaseAuth = firebase.auth();
var firebaseDB = firebase.database();
var appcooperativa = new Vue({
  el: "#navbarrr",
  data: {
    perfil: [],
  },
  methods: {
    /**
     * Trae la cuenta del usuario logueado
     * @access public
     * @function traerdatosusuario
     */
    traerdatosusuario: function () {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          var dbchild = firebaseDB.ref("users/");
          dbchild.on("value", (snap) => {
            snap.forEach((element) => {
              if (user.uid === element.key) {
                appcooperativa.perfil = element.val();
              } 
            });
          });
        } else {
          location.href = "login.html";
        }
      });
    },
    signOut: function () {
      firebaseAuth
        .signOut().then(()=>{
          location.href="index.html"
        })
        .catch(() => {
          swal.fire({
            title: "Ocurrio un error inesperado",
            icon: "warning",
          });
        });
    },
    slidedropdown: function () {
      $(".dropdown-menu").slideToggle();
    },
  },
  created: function () {
    this.traerdatosusuario();
  },
});

/**
 * cuando la pagina este lista los eventos podran ser ejecutados
 */
$(document).ready(function () {
  /**
   * ejecuta funcion de animacion
   */
  toggle();

  /**
   * carga formulario en el contenedor
   * @event #info
   *
   */
  $("#info").click(() => {
    $("#contenedorP").load("public/vistasPerfil/infoperfil.html", function (
      data
    ) {
      $(this).html(data);
    });
  });

  /**
   * carga formulario en el contenedor
   * @event #addProductos
   *
   */
  $("#addProductos").click(() => {
    $("#contenedorP").load(
      "public/vistasPerfil/addproducto/addproducto.html",
      function (data) {
        $(this).html(data);
      }
    );
  });

  /**
   * carga formulario en el contenedor
   * @event #listadeseos
   *
   */
  $("#listdeseos").click(() => {
    $("#contenedorP").load(
      "public/vistasPerfil/listadeseos/listadeseos.html",
      function (data) {
        $(this).html(data);
      }
    );
  });

  /**
   * carga formulario en el contenedor
   * @event #POferta
   *
   */
  $("#POferta").click(() => {
    $("#contenedorP").load(
      "public/vistasPerfil/productosOferta/addoferta.html",
      function (data) {
        $(this).html(data);
      }
    );
  });

  /**
   * carga formulario en el contenedor
   * @event #COnfigc
   *
   */
  $("#Configc").click(() => {
    $("#contenedorP").load(
      "public/vistasPerfil/configCuenta/configcuenta.html",
      function (data) {
        $(this).html(data);
      }
    );
  });

  /**
   * carga formulario en el contenedor
   * @event #modP
   *
   */
  $("#modP").click(() => {
    $("#contenedorP").load(
      "public/vistasPerfil/editarpublicacion/editar.html",
      function (data) {
        $(this).html(data);
      }
    );
  });
});

/**
 * Animacion en la barra de navegacion responsive
 * @access public
 * @function toggle
 */
function toggle() {
  $("#colapsar").click(function () {
    $(".collapse").animate({
      height: "toggle",
    });
  });
}
