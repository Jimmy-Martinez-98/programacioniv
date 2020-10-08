/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file guardar.js-> Sirve para guardar datos de la direccion del usuario
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var user = firebaseAuth.currentUser;
var mostrardirecciones = new Vue({
  el: "#frm-direcciones",
  data: {
    direction: [],
  },
  created: function () {
    this.info();
  },
  methods: {
    /**
     * Trae la direccion de el usuario desde la DB
     * @access public
     * @function info
     */
    info: function () {
      let data = [];
      if (user) {
        firebaseDB.ref("Direcciones/").on("value", (snapshot) => {
          snapshot.forEach((element) => {
            if (user.uid == element.val().idUsuario) {
              data.push(element.val());
            }
          });
          this.direction = data[0];
        });
      }
    },

    /**
     * Asigna el item selecionado a la variable editardirecciones en su data: modirec
     * @access public
     * @function editardire
     * @param {object} modD - contiene la direccion seleccionada
     */
    editardire: function (modD) {
      editardirecciones.modDirec = modD;
      editardirecciones.modDirec.accion = "modificar";
    },
  },
});

/**
 * @instance objeto de instancia de Vue.js
 */
var editardirecciones = new Vue({
  el: "#modalmodificar",
  data: {
    modDirec: {
      accion: "modificar",
    },
  },
  methods: {
    /**
     * Metodo para actualizar direccion
     * @access public
     * @function actualizar
     */
    actualizar: function () {
      let datos = this.jsonParse(
        this.modDirec.idDireccion,
        this.modDirec.idUsuario,
        this.modDirec.direccion
      );
      firebaseDB
        .ref("Direcciones/" + this.modDirec.idDireccion)
        .update(datos, () => {
          swal.fire({
            title: "OK!",
            text: "Dirección Actualizada",
            icon: "success",
          });
          mostrardirecciones.info();
          this.limpiar();
        })
        .catch((error) => {
          swal.fire({
            title: "error",
            text: error,
            icon: "error",
          });
        });
    },
    jsonParse: function (key, idU, direccion) {
      let data = {
        idDireccion: key,
        idUsuario: idU,
        direccion: direccion,
      };
      return data;
    },
    limpiar: function () {
      this.modDirec.idDireccion = '';
      this.modDirec.idUsuario = '';
      this.modDirec.direccion = '';

    }
  },
});

/**
 * @instance objeto de instancia de Vue.js
 */
var nuevadireccion = new Vue({
  el: "#nuevaD1",
  data: {
    Ndireccion: {
      Direccion: "",
      accion: "nuevo",
    },
  },
  methods: {
    /**
     * envia los datos recolectados en el arrego Ndireccion para su procesamiento en php
     * Donde si php responde con Registro Insertado Correctamente mostrara alerta de exito
     *  si no una de error
     * @access public
     * @function almacenar
     */
    almacenar: function () {
      let newKey = firebaseDB.ref().child("Direcciones/").push().key,
        data = this.jsonParse(newKey, user.uid, this.Ndireccion.Direccion);
      if (user) {
        if (this.Direccion != "") {
          firebaseDB
            .ref("Direcciones/" + newKey)
            .set(data)
            .then(() => {
              swal.fire({
                title: "Dirección Registrada",
                text: "",
                icon: "success",
              });
              nuevadireccion.limpiar();
            })
            .catch((error) => {
              swal.fire({
                title: error,
                icon: "error",
              });
            });
        } else {
          swal.fire({
            title: "Complete el campo",
            icon: "info",
          });
        }
      }
    },
    jsonParse: function (key, idU, direccion) {
      let data = {
        idDireccion: key,
        idUsuario: idU,
        direccion: direccion,
      };
      return data;
    },
    limpiar: function () {
      this.Ndireccion.Direccion = "";
    },
  },
});