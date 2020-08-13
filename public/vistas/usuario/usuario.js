/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file usuario.js-> Sirve para el registro de usuario tipo vendedor
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */

var db = firebase.database();
var fAuth = firebase.auth();
var appusuario = new Vue({
  el: "#frm-usuarios",
  data: {
    usuario: {
      nombreU: "",
      selectU: "",
      nombreCooperativa: "",
      telefono: "",
      correo: "",
      pass: "",
      fechaRegistro: "",
    },
    verificarchek: "",
  },
  methods: {
    /**
     * Muestra un mensaje para indicar si la contraseña cumple con los requisitos
     * @access public
     * @function alerta
     */
    alerta: function () {
      var mayus = new RegExp("^(?=.*[A-Z])");
      var especial = new RegExp("^(?=.*[*_.-])");
      var numeros = new RegExp("^(?=.*[0-9])");
      var lower = new RegExp("^(?=.*[a-z])");
      var len = new RegExp("^(?=.{8,})");
      var regexp = [mayus, especial, numeros, lower, len];
      var checkval = 0;

      var wordpass = $("#contra").val();
      for (var i = 0; i < 5; i++) {
        if (regexp[i].test(wordpass)) {
          checkval++;
        }
      }

      if (checkval >= 0 && checkval <= 2) {
        $("#msgs").text("Muy Insegura!").css("color", "red");
      } else if (checkval >= 3 && checkval <= 4) {
        $("#msgs").text("Poco Segura!").css("color", "orange");
      } else if (checkval === 5) {
        $("#msgs").text("Segura!").css("color", "green");
      }
    },

    /**
     * Verifica si se cumplen los regisitos del formulario para su posterior
     * insercion en la Base de Datos
     * @access public
     * @function guardarusuario
     */
    guardarUsuario: function () {
      if (this.verificarchek != false || this.verificarchek != "") {
        if ($("#msgs").val("Segura!")) {
          fAuth
            .createUserWithEmailAndPassword(
              this.usuario.correo,
              this.usuario.pass
            )
            .then(() => {
              //Registra el usuario en la Base de Datos...
              db.ref("users/" + fAuth.currentUser.uid)
                .set({
                  uId: fAuth.currentUser.uid,
                  nombreU: this.usuario.nombreU,
                  selectU: this.usuario.selectU,
                  nombreCooperativa: this.usuario.nombreCooperativa,
                  telefono: this.usuario.telefono,
                  correo: fAuth.currentUser.email,
                  password: this.usuario.pass,
                  fechaRegistro: this.usuario.fechaRegistro,
                })
                .then(() => {
                  this.enviarEmail();
                })
                .catch((error) => {
                 swal.fire({
                   title:error,
                   icon:'error'
                 })
                });
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode, errorMessage);
            });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "la contraseña no comple con los requisitos ",
          });
        }
      } else {
        Swal.fire({
          icon: "warning",
          text: "Debe Aceptar La Política de Privacidad ",
        });
      }
    },
    enviarEmail() {
      let user = fAuth.currentUser;
      user.sendEmailVerification().then(() => {
        swal.fire(
          "Se le envio  un mensaje a su correo para verificar su cuenta",
          "",
          "success"
        );
      });
    },

    IniciarSesion: function () {
      location.href = "login.html";
    },
    rCliente: function () {
      location.href = "registroCliente.php";
    },
  },
});

/**
 * Sirve para mostrar los mensajitos de popovers
 * @function
 */
$(function () {
  $('[data-toggle="popover"]').popover();
});
