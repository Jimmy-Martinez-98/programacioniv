/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file verify.js-> Sirve para la verificacion de codigo
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */

var appverifi = new Vue({
  /**
   * @property el elemento del DOM a enlazar
   */
  el: "#frm-verify",
  data: {
    code: {
      codigo: "",
    },
  },

  methods: {
    /**
     * Verifica si el codigo introducido es valido
     * Si lo es lo redirecciona a el login
     * @access public
     * @function verificar
     */
    verificar: function () {
      fetch(
        `Private/Modulos/usuarios/procesos.php?proceso=recibircode&login=${JSON.stringify(
          this.code
        )}`
      )
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.msg === "Usuario Verificado") {
            alertify.alert("Verificacion de Usuario", resp.msg, function () {
              location.href = "login.php";
            });
          } else {
            alertify.alert("Verificacion de Usuario", resp.msg, function () {});
          }
        });
    },
  },
});
