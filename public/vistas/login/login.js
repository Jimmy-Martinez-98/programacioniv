/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file login.js-> Sirve para loguear al usuario a la webapp
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var DB = firebase.database();

var applogin = new Vue({
  el: "#frm-login",
  data: {
    name: {
      correo: "",
      pass: "",
    },
  },

  methods: {
    /**
     * Llama la funcion Session y le pasa los parametros
     * @access public
     * @function inicioSesion
     */
    inicioSesion: function () {
      let email = this.name.correo,
        password = this.name.pass;

      this.Session(email, password);
      document.getElementById("login").setAttribute("hidden", true);
      document.getElementById("btnCarga").removeAttribute("hidden");
    },
    /**
     * @access public
     * @function Session - Administra la persistencia del usuario con una session y a la vez
     * Inicia session con dicha cuenta
     * @param {String} email - Representa el correo introducido en el formulario
     * @param {String} password - Representa la contraseña introducida en el formulario
     */
    Session: function (email, password) {

      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function () {
        /* Los estados de autenticación existentes y futuros ahora persisten en el estado actual
        solo sesión. Cerrar la ventana eliminaría cualquier estado existente incluso
        si un usuario olvida cerrar sesión.
        ...
        El nuevo inicio de sesión se mantendrá con la persistencia de la sesión.*/

        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
          let user = firebaseAuth.currentUser;
          if (user.emailVerified) {
            location.href = "index.html"
          } else if (!user.emailVerified) {
            document.getElementById(
              "alerta"
            ).innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                      Debe Verificar su cuenta para poder iniciar sesion
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>`;
            document
              .getElementById("btnCarga")
              .setAttribute("hidden", true);
            document.getElementById("login").removeAttribute("hidden");
          }

        }).catch(function (error) {

          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, "=>", errorMessage);


          if (errorCode == "auth/wrong-password") {
            document.getElementById(
              "alerta"
            ).innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                      Contraseña es incorrecta
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>`;
            document
              .getElementById("btnCarga")
              .setAttribute("hidden", true);
            document
              .getElementById("login")
              .removeAttribute("hidden");
          } else if (errorCode == "auth/user-not-found") {
            document.getElementById(
              "alerta"
            ).innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                      El Usuario con este correo no existe en nuestra base de datos 
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>`;
            document
              .getElementById("btnCarga")
              .setAttribute("hidden", true);
            document.getElementById("login").removeAttribute("hidden");
          }
          // ...
        });
      })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, "=>", errorMessage);
        });
    },
    /**
     * Redirige al usuario al formulario de registro
     * @access public
     * @function Registrate
     */
    Registrate: function () {
      location.href = "Registro.html";
    },
    /**
     * Redirige al usuario al formulario de recuperacion de contraseña
     * @access public
     * @function Recuperar
     */
    Recuperar: function () {
      location.href = "password.html";
    },
  },
});