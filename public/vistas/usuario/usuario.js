/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file usuario.js-> Sirve para el registro de usuario tipo vendedor
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var fbAuth = firebaseAuth;
var appusuario = new Vue({
  el: "#frm-usuarios",
  data: {
    usuario: {
      nombreUsuario: "",
      correo: "",
      pass: "",
      fechaRegistro: "",
    },
    verificarchek: "",
    check: 0,
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

    /**
     * Verifica si se cumplen los regisitos del formulario para su posterior
     * insercion en la Base de Datos
     * @access public
     * @function guardarusuario
     */
    guardarUsuario: function () {
      if (
        this.usuario.nombreUsuario != "" &&
        this.usuario.fechaRegistro != "" &&
        this.usuario.pass != "" &&
        this.usuario.correo != ""
      ) {
        if (this.check == 5) {
          this.alerts();
          if (this.verificarchek != false || this.verificarchek != "") {
            this.alertsCheck();
            let correo = this.usuario.correo,
              password = this.usuario.pass;
            this.saveUser(correo, password)
          } else {
            document.getElementById("politicaRojo").removeAttribute("hidden");
          }
        } else if (
          this.usuario.nombreUsuario == "" &&
          this.usuario.fechaRegistro != "" &&
          this.usuario.correo != "" &&
          this.usuario.pass != ""
        ) {
          document.getElementById("usernameRojo").removeAttribute("hidden");
        } else if (
          this.usuario.nombreUsuario != "" &&
          this.usuario.fechaRegistro == "" &&
          this.usuario.correo != "" &&
          this.usuario.pass != ""
        ) {
          document.getElementById("fechaRojo").removeAttribute("hidden");
        } else if (
          this.usuario.nombreUsuario != "" &&
          this.usuario.fechaRegistro != "" &&
          this.usuario.correo == "" &&
          this.usuario.pass != ""
        ) {
          document.getElementById("emailRojo").removeAttribute("hidden");
        } else if (
          this.usuario.nombreUsuario !== "" &&
          this.usuario.fechaRegistro !== "" &&
          this.usuario.correo !== "" &&
          this.usuario.pass === ""
        ) {
          document.getElementById("passRojo").removeAttribute("hidden");
        } else if (
          this.usuario.nombreUsuario === "" &&
          this.usuario.fechaRegistro === "" &&
          this.usuario.correo === "" &&
          this.usuario.pass === ""
        ) {
          this.alertsNull();
        }
      } else {
        document.getElementById("alert").removeAttribute("hidden");
      }
    },
    saveUser: function () {
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
              role: 0
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
          this.errorsCatch(errorCode)
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
        document
          .getElementById("registrar")
          .removeAttribute("hidden");
      } else if (errorCode == "auth / invalid-email") {
        document.getElementById("notificacion").innerHTML = `
                    <div class="alert alert-danger" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                      Direccion de Correo Electronico Invalido
                  </div>`;
        document.getElementById("login").setAttribute("hidden", true);
        document
          .getElementById("registrar")
          .removeAttribute("hidden");
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
          color: 'success',
          position: "bottom-center",
          title: "Verificacion de Cuenta",
          text: "Se le a Enviado un Email a su Correo Electronico",
          progress: "auto",
        });
        location.href = "login.html"
      });
    },
    /**
     * Es cuando no cumple la contraseña con los requisitos previos
     * @access public
     * @function alerts
     */
    alerts: function () {
      document.getElementById("alert").setAttribute("hidden", true);
      document.getElementById("usernameRojo").setAttribute("hidden", true);
      document.getElementById("fechaRojo").setAttribute("hidden", true);
      document.getElementById("emailRojo").setAttribute("hidden", true);
      document.getElementById("passRojo").setAttribute("hidden", true);
    },
    /**
     * es cuando no acepta los terminos
     * @access public
     * @function alertsCheck
     */
    alertsCheck: function () {
      document
        .getElementById("politicaRojo")
        .setAttribute("hidden", true);
      document.getElementById("registrar")
        .setAttribute("hidden", true);
      document.getElementById("login")
        .removeAttribute("hidden");
    },
    /**
     * Es  cuando se envia el formulario y los campos estan vacios
     * @access public
     * @function alertsNull
     */

    alertsNull: function () {
      document.getElementById("usernameRojo").removeAttribute("hidden");
      document.getElementById("fechaRojo").removeAttribute("hidden");
      document.getElementById("emailRojo").removeAttribute("hidden");
      document.getElementById("passRojo").removeAttribute("hidden");
    },
    IniciarSesion: function () {
      location.href = "login.html";
    },
  },
});