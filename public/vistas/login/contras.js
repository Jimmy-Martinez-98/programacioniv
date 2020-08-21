/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file contras.js-> Sirve para restablecer contraseña de usuario
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var firebaseAuth=firebase.auth();
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
     firebaseAuth.languageCode='es'
     email=this.resetPassword.correo;
     firebaseAuth.sendPasswordResetEmail(email).then(()=>{
         swal.fire({
           title: "Restablecimiento de Contraseña",
           text:
             "Se ha enviado un mensaje a su correo para que actualize su contraseña",
           icon: "info",
         }).then(()=>{
           location.href="login.html"
         })
     })
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
