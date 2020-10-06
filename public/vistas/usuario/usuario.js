/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file usuario.js-> Sirve para el registro de usuario tipo vendedor
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var fbAuth = firebaseAuth;
var appUsuario = new Vue({
  el: "#frm-usuarios",
  data: {
    //datos del usuario
    usuario: {
      nombreUsuario: "",
      correo: "",
      pass: "",
      fechaRegistro: "",
    },
    //cuando selecciona que acepta la politica
    verificarchek: "",
    //para evaluar el cumplimiento de requisitos de contraseña
    check: 0,
  },

  methods: {
    /**
     * Verifica si se cumplen los regisitos del formulario para su posterior
     * insercion en la Base de Datos
     * @access public
     * @function guardarusuario
     */
    guardarUsuario: function () {
      let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (
        this.usuario.nombreUsuario !== "" &&
        this.usuario.fechaRegistro !== "" &&
        this.usuario.pass !== "" &&
        this.usuario.correo !== ""
      ) {
        if (this.check === 5) {
          document.getElementById("alert").setAttribute("hidden", true);
          if (this.verificarchek === true) {
            this.alertsCheck();
            document.getElementById("alert").setAttribute("hidden", true);
            let correo = this.usuario.correo,
              password = this.usuario.pass;
            if (emailRegex.test(this.usuario.correo)) {
              this.saveUser(correo, password);
            } else {
              document.getElementById("registrar").removeAttribute("hidden");
              document.getElementById("login").setAttribute("hidden", true);
              document.getElementById(
                "notificacion"
              ).innerHTML = `<div class="alert alert-danger w-100" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                      Correo no Valido!!!!
                  </div>`;
            }
          } else {
            document.getElementById("politicaRojo").removeAttribute("hidden");
          }
        } else {
          document.getElementById("alert").removeAttribute("hidden");
        }
      } else {
        document.getElementById("notificacion").removeAttribute("hidden");
        document.getElementById("notificacion").innerHTML = `
         <div class="alert alert-danger w-100" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>  
                      Campos Vacios!!!!
                  </div>`;
      }
    },
    saveUser: function (correo, password) {
      fbAuth
        .createUserWithEmailAndPassword(correo, password)
        .then(() => {
          //Registra el usuario en la Base de Datos...
          firebaseDB
            .ref("users/" + firebaseAuth.currentUser.uid)
            .set({
              uId: firebaseAuth.currentUser.uid,
              nombreUsuario: appusuario.usuario.nombreUsuario,
              correo: appusuario.usuario.correo,
              fechaRegistro: appusuario.usuario.fechaRegistro,
              role: 0,
            })
            .then(() => {
              this.enviarEmail();
            })
            .catch((error) => {
              this.$vs.notification({
                square: true,
                color: notiColor,
                position: "bottom-center",
                title: error,
                text: "",
                progress: "auto",
              });
            });
        })
        .catch(function (error) {
          // Handle Errors here.
          let errorCode = error.code;
          appUsuario.errorsCatch(errorCode);
        });
    },

    /**
     * capturacion de errores posibles al intentar iniciar sesion
     * @access public
     * @function errorsCatch
     */
    errorsCatch: function (errorCode) {
      if (errorCode == "auth/email-already-in-use") {
        document.getElementById("notificacion").innerHTML = `
                    <div class="alert alert-danger" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>  
                       Dirección de Correo Electronico Ya Existe
                  </div>`;
        document.getElementById("login").setAttribute("hidden", true);
        document.getElementById("registrar").removeAttribute("hidden");
      } else if (errorCode == "auth / invalid-email") {
        document.getElementById("notificacion").innerHTML = `
                    <div class="alert alert-danger" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                      Direccion de Correo Electronico Invalido
                  </div>`;
        document.getElementById("login").setAttribute("hidden", true);
        document.getElementById("registrar").removeAttribute("hidden");
      }
    },

    /**
     * Envia un correo a la direccion proporcionada en el formulario para poder verificarla
     * @access public
     * @function enviarEmail
     */
    enviarEmail() {
      let user = firebaseAuth.currentUser;
      user.sendEmailVerification().then(() => {
        this.$vs.notification({
          square: true,
          color: "success",
          position: "bottom-center",
          title: "Verificacion de Cuenta",
          text: "Se le a Enviado un Email a su Correo Electronico",
          progress: "auto",
        });
        location.href = "login.html";
      });
    },

    /**
     * es cuando no acepta los terminos
     * @access public
     * @function alertsCheck
     */
    alertsCheck: function () {
      document.getElementById("politicaRojo").setAttribute("hidden", true);
      document.getElementById("registrar").setAttribute("hidden", true);
      document.getElementById("login").removeAttribute("hidden");
    },
    /**
     * Muestra un mensaje para indicar si la contraseña cumple con los requisitos
     * @access public
     * @function alerta
     */
    alerta: function () {
      var mayus = new RegExp("^(?=.*[A-Z])"),
        especial = new RegExp("^(?=.*[*_.-])"),
        numeros = new RegExp("^(?=.*[0-9])"),
        lower = new RegExp("^(?=.*[a-z])"),
        len = new RegExp("^(?=.{8,})"),
        regexp = [mayus, especial, numeros, lower, len],
        checkval = 0;

      var wordpass = $("#contra").val();
      for (var i = 0; i < 5; i++) {
        if (regexp[i].test(wordpass)) {
          checkval++;
        }
      }
      if (checkval == 0) {
        document.getElementById("msgs").setAttribute("hidden", true);
      } else if (checkval >= 0 && checkval <= 2) {
        document.getElementById("msgs").removeAttribute("hidden");
        $("#msgs").text("Muy Insegura!").css("color", "red");
      } else if (checkval >= 3 && checkval <= 4) {
        document.getElementById("msgs").removeAttribute("hidden");
        $("#msgs").text("Poco Segura!").css("color", "orange");
      } else if (checkval === 5) {
        this.check = 5;
        document.getElementById("msgs").removeAttribute("hidden");
        $("#msgs").text("Segura!").css("color", "green");
      }
    },

    IniciarSesion: function () {
      location.href = "login.html";
    },
  },
});
