/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file settings.js-> Sirve para la configuracion de perfil
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var settings = new Vue({
  el: "#settings",
  data: {
    dataUser: [],
    name: "",
  },
  /**
   * metodo created de vue ejecuta lo que se este llamando dentro de el
   * @access public
   * @method created
   */
  created: function () {
    this.getDataUser();
  },
  /**
   * Metodo de computed properties
   * @access public
   * @method computed
   */
  computed: {
    validateImage: function () {
      return this.dataUser.imagen != "" || this.dataUser.imagen != null;
    },
  },
  methods: {
    /**
     * Trae datos del usario logueado
     * @access public
     * @function getDataUser
     */
    getDataUser: function () {
      firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          firebaseDB
            .ref("users/")
            .orderByChild("uId")
            .equalTo(user.uid)
            .on("value", (snap) => {
              snap.forEach((element) => {
                this.dataUser = element.val();
              });
            });
        }
      });
    },
    /**
     * pasa el nombre del usuario al campo de edicion
     * @access public
     * @function passName
     */
    passName: function () {
      this.name = this.dataUser.nombreUsuario;
    },
    /**
     * guarda el cambio en el nombre
     * @access public 
     * @function saveName
     */
    saveName: function () {
      let key = this.dataUser.uId;
      firebaseDB
        .ref("users/" + key)
        .update({
          nombreUsuario: this.name,
        })
        .then(() => {
          this.openNotificacion(
            "primary",
            "Nombre Actualizado Correctamente",
            ""
          );
        });
    },
    /**
     * Es cuando el usuario selecciona una imagen
     * @param {Object} e -> representa el objeto de imagen
     */
    getImage(e) {
      let file = e.target.files[0];
      let random = Math.random();
      let key = this.dataUser.uId;
      let upload = storage
        .ref()
        .child("Perfil/" + file.name + random)
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
                <div class="d-flex align-items-center">
                <strong>Subiendo Imagen...${progress}</strong>
                <div class="spinner-grow ml-auto" role="status" aria-hidden="true"></div>
                </div>`;
        },
        (error) => {
          //muestra error
          swal.fire({
            title: "Ups..",
            text: "Ocurrio un error al cargar Imagen",
            icon: "error",
          });
        },
        () => {
          //cuando la imagen ya esta subida
          upload.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            this.imagen = downloadURL;
            firebaseDB
              .ref("users/" + key)
              .update({
                imagen: this.imagen,
              })
              .then(() => {
                settings.openNotificacion(
                  "primary",
                  "Imagen de Perfil Actualizada Correctamente",
                  ""
                );
              });
            document.getElementById("barra").style.display = "none";
          });
        }
      );
    },
    /**
     * Es cuando pide restablecer la contraseña
     * @access public
     *@function sendPasswordReset
     * @param {String} email -> es el correo del usuario 
     */
    sendPasswordReset: function (email) {
      firebaseAuth
        .sendPasswordResetEmail(email)
        .then(() => {
          this.openNotificacion(
            "primary",
            "Se Ha Enviado Un Correo Para Restablecer Su Contraseña",
            ""
          );
        })
        .catch((e) => {
          this.openNotificacion(
            "danger",
            " Ha Ocurrido Un Error Al Intentar Enviar Un Correo Para Restablecer Su Contraseña",
            ""
          );
        });
    },
    /**
     * 
     * @param {String} color -> representa el color de la notificacion 
     * @param {String} title -> representa el titulo de la notificacion
     * @param {String} text  -> representa el texto de la notificacion
     */
    openNotificacion: function (color, title, text) {
      this.$vs.notification({
        square: true,
        progress: "auto",
        color: color,
        title: title,
        text: text,
        position: "top-right",
      });
    },
  },
});
