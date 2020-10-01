/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file cuenta.js-> Sirve para la configuracion de la cuenta
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */

var datosCuenta = new Vue({
  el: "#cuenta",
  data: {
    datosPerfil: [],
  },
  methods: {
    /**
     * Trae el identificador del usuario logueado
     * @access public
     * @function traerdatosusuario
     */
    traerdatosusuario: function () {
      let user = firebaseAuth.currentUser;
      let datos = [];
      if (user) {
        firebaseDB.ref("users/").on("value", (snap) => {
          snap.forEach((element) => {
            if (user.uid === element.key) {
              datos.push(element.val());
            }
          });
        });
        this.datosPerfil = datos[0];
      }
    },

    /**
     * Pasa los datos del item seleccionado  a otra variable para su edicion
     * @access public
     * @function modfoto
     * @param {object} update - Representa los datos a modificar
     */
    modfoto: function (update) {
      editfoto.updatefoto.imagen = update;
    },

    /**
     * pasa los datos de lo seleccionado a otra variable para su modificacion
     * @param {object} passs - Representa los datos a modificacion
     */
    modificacionpass: function (passs) {
      editpass.cambiopass = passs;
    },
  },
  created: function () {
    this.traerdatosusuario();
  },
});

/**
 * @instance objeto de instancia de Vue.js
 */
var editfoto = new Vue({
  el: "#fotoperfiledit",
  data: {
    updatefoto: {
      imagen: "",
    },
  },
  created: function () {},
  methods: {
    /**
     * Es cuando le da cargar foto, guarda los datos
     * @access public
     * @function Guardarimg
     */
    Guardarimg: function () {
      let id = firebaseAuth.currentUser.uid;
      firebaseDB
        .ref("users/" + id)
        .update({
          imagen: editfoto.updatefoto.imagen,
        })
        .then(() => {
          swal.fire({
            title: "ok",
            text: "Imagen de Perfil Actualizada",
            icon: "success",
          });
          datosCuenta.traerdatosusuario();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /**
     * Obtiene la imagen que esta en el tag img para guardarlo en carpeta y
     *  asignarlo a updatefoto.imagen su direccion
     * @access public
     * @function obtenerimagen
     * @param {objec} e - Representa el cambio en el tag img
     */
    obtenerimagen(e) {
      let file = e.target.files[0];
      let upload = storage
        .ref()
        .child("Perfil/" + file.name)
        .put(file);

      upload.on(
        "state_changed",
        (snapshot) => {
          //muestra el progreso
          let progress = Math.round(
            (snapshot.bytesTransferred * 100) / snapshot.totalBytes
          );
          let img = document.getElementById("barra");
          img.innerHTML = `
                <div class="progress">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    style="width: ${progress}%;"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    ${progress}%
                  </div>
                </div>`;
        },
        (error) => {
          //muestra error
          swal.fire({
            title: "Ups..",
            text: "Ocurrio al cargar Imagen",
            icon: "error",
          });
        },
        () => {
          //cuando la imagen ya esta subida
          upload.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            editfoto.updatefoto.imagen = downloadURL;
            document.getElementById("barra").style.display = "none";
            document.getElementById("imgSin").style.display = "none";
          });
        }
      );
    },
  },
});

/**
 * @instance objeto de instancia de Vue.js
 */
var editpass = new Vue({
  el: "#edicontra",
  data: {
    changePassword: {
      correo: "",
    },
    cambiopass: {
      contra: "",
    },
  },
  methods: {
    /**
     * Manda los datos al archivo.php para su procesamiento
     * y si es exitoso el cambio muestra una alerta
     * @access public
     * @function updatepass
     */
    updatepass: function () {
      emailPerfil = firebaseAuth.currentUser.email;
      if (this.changePassword.correo == emailPerfil) {
        firebaseAuth.languageCode = "es";
        email = this.changePassword.correo;
        firebaseAuth
          .sendPasswordResetEmail(email)
          .then(() => {
            swal.fire({
              title: "Enviando Correo..",
              icon: "info",
            });
          })
          .catch(() => {
            swal.fire({
              title: "Ups...",
              text:
                "Ocurrio un error al intentar enviar correo para cambiar contrase",
            });
          });
      } else {
        swal.fire({
          title: "Ups",
          text: "El correo no pertenece a esta cuenta",
          icon: "error",
        });
      }
    },
  },
});
