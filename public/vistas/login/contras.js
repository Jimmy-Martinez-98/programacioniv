/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file contras.js-> Sirve para restablecer contraseña de usuario
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var firebaseAuth = firebase.auth();
var appcontras = new Vue({
  el: "#frm-Recuperar",
  data: {
    resetPassword: {
      correo: "",
    },
  },
  methods: {
    /**
     * redirige al usuario a la pantalla de login si se actualizo la contraseña
     * @access public
     * @function Recuperar
     */
    Recuperar: function () {
      firebaseAuth.languageCode = "es";
      email = this.resetPassword.correo;
      firebaseAuth.sendPasswordResetEmail(email)
        .then(() => {
        swal
          .fire({
            title: "Restablecimiento de Contraseña",
            text: "Se ha enviado un mensaje a su correo para que actualize su contraseña",
            icon: "info",
            buttonStyling: true,
            showCloseButton: true,
            closeButtonArialLabel: "cerrar alerta",
            position: "top",
            allowOutsideClick: false,
            allowEscapeKey: false,
          })
          .then(() => {
            location.href = "login.html";
          });
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, "=>", errorMessage);
        if (errorCode == "auth/user-not-found") {
          document.getElementById(
            "alerta"
          ).innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                      El Usuario con este correo no existe en nuestra base de datos 
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>`;
        }

      });
    },

    /**
     * Redirige al usuario a la pantalla de login
     * @access public
     * @function atras
     */
    atras: function () {
      location.href = "login.html";
    },
  },
});