/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file cuenta.js-> Sirve para la eliminar un horario y pasar datos para modificar
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var appleerH = new Vue({
  el: "#leerhorario",
  data: {
    horarios: [],
  },
  created: function () {
    this.verHorarios();
  },
  methods: {
    verHorarios: function () {
      let user = firebaseAuth.currentUser,
        db = firebaseDB,
        data = [];
      if (user) {
        db.ref("horarioTrabajo/").on("value", (snap) => {
          snap.forEach((element) => {
            if (user.uid === element.val().idU) {
              data.push(element.val());
            }
          });
          this.horarios = data;
        });
      } else {
        console.log("error");
      }
    },
    /**
     * pasa los datos del item seleccionados a apphorarios.horario para su modificacion
     * @access public
     * @function modifier
     * @param {object} Htrabajo - Representa los datos del item
     */
    modifier: function (Htrabajo) {
      appHorarios.horario = Htrabajo;
      appHorarios.horario.accion = "modificar";
    },

    /**
     * Elimina un item
     * @access public
     * @function deleteH
     * @param {Int} id_horario - Representa el identificador del item a eliminar
     */
    del: function (id_horario) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminalo!",
      }).then((result) => {
        if (result.value) {
          firebaseDB
            .ref("horarioTrabajo/" + id_horario)
            .remove()
            .then(() => {
              Swal.fire({
                text: "Horario Eliminado",
                icon: "success",
              });
              this.verHorarios();
            })
            .catch((error) => {
              swal.fire({
                text: error,
                icon: "error",
              });
            });
        }
      });
    },
  },
});