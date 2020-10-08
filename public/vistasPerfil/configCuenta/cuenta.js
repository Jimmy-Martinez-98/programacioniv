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
    imagen: '',

  },
  methods: {
    /**
     * Trae el identificador del usuario logueado
     * @access public
     * @function traerdatosusuario
     */
    traerdatosusuario: function () {
      let user = firebaseAuth.currentUser,
        datos = [];
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
      firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          firebaseDB.ref('users/').orderByChild('uId').equalTo(user.uid).on('value', snap => {
            snap.forEach(element => {
              this.datosPerfil = element.val()
            });
          })
        }
      })
    },

    /**
     * pasa los datos de lo seleccionado a otra variable para su modificacion
     * @param {object} passs - Representa los datos a modificacion
     */
    resetPass: function (passs) {

      var auth = firebase.auth();


      auth.sendPasswordResetEmail(passs).then(() => {
        datosCuenta.$vs.notification({
          square: true,
          progress: "auto",
          color: 'danger',
          title: "Hemos enviado un enlace para que restablesca su contraseña  ",
          position: 'bottom-center',
        });
      }).catch(function (error) {
        // An error happened.
        if (error.message == "We have blocked all requests from this device due to unusual activity. Try again later.") {
          datosCuenta.$vs.notification({
            square: true,
            progress: "auto",
            color: 'danger',
            title: "Hemos bloqueado todas las solicitudes de este dispositivo debido a una actividad inusual.Inténtelo de nuevo más tarde",
            position: 'bottom-center',
          });
        }
      });


    },
    obtenerImagen(e) {
      let file = e.target.files[0];
      const crypto = window.crypto || window.msCrypto;
      var array = new Uint32Array(1);
      crypto.getRandomValues(array); // Compliant for security-sensitive use cases
      let upload = storage
        .ref()
        .child("Perfil/" + file.name + crypto.getRandomValues(array))
        .put(file);

      upload.on(
        "state_changed",
        (snapshot) => {
          //muestra el progreso
          let progress = Math.round(
            (snapshot.bytesTransferred * 100) / snapshot.totalBytes
          ).toFixed(0)
          let img = document.getElementById("barra");
          img.innerHTML = `
                <div class="d-flex align-items-center">
                  <strong>Subiendo...${progress}</strong>
                  <div class="spinner-grow ml-auto" role="status" aria-hidden="true"></div>
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

            datosCuenta.imagen = downloadURL;
            datosCuenta.guardarImagen()
            document.getElementById("barra").style.display = "none";

          });
        }
      );
    },
    guardarImagen: function () {
      let key = firebaseAuth.currentUser.uid
      firebaseDB.ref('users/' + key).update({
        'imagen': this.imagen
      })
    }
  },
  created: function () {
    this.traerdatosusuario();
  },
});