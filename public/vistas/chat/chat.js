/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file chat.js-> Sirve para comunicarse con el usuario dueño de un producto
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 *
 */

/**
 * @property el  elemento del DOM a enlazar
 */
var appChat = new Vue({
  el: "#frm-chats",
  data: {
    mensajes: {
      de: "",
      para: "",
      msg: "",
    },
    allMessages: [],
    usuarioChat: {
      perfil: "",
      nombre: "",
    },
  },
  created() {
    this.estado();
    this.chatHistory();
  },
  computed: {
    update: function () {
      this.chatHistory();
    },
    imagen: function () {
      return this.usuarioChat.imagen != "";
    }
  },
  watch: {
    allMessages: function (val) {
      this.allMessages = val;
    },
  },

  methods: {


    estado: function () {
      firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          //cargarUsuariosBandeja
          console.log("Bienvenido");
          var dataFromStorage = JSON.parse(sessionStorage.getItem("data"));
          this.mensajes.para = dataFromStorage.id;
          this.datosUser(dataFromStorage.id);
          this.mensajes.de = user.uid;
        } else {
          location.href = "../../../login.html";
        }
      });
    },
    datosUser: function (user) {
      firebaseDB.ref("users/").on("value", (snap) => {
        snap.forEach((element) => {
          if (user === element.val().uId) {
            appChat.usuarioChat.imagen = element.val().imagen;
            appChat.usuarioChat.nombre = element.val().nombreU;
          }
        });
      });
    },
    chatHistory: function () {
      firebaseDB.ref("/chat").on("value", (snap) => {
        this.allMessages = [];
        snap.forEach((element) => {
          if (
            (element.val().De === this.mensajes.de &&
              element.val().Para === this.mensajes.para) ||
            (element.val().De === this.mensajes.para &&
              element.val().Para === this.mensajes.de)
          ) {
            this.allMessages.push(element.val());
          }
        });
      });
    },



    /**
     *
     * Es cuando el usuario manda el mensaje
     * @access public
     * @function enviarMensaje
     */
    enviarMensaje() {
      if (this.mensajes.msg != "" && this.mensajes.para != "") {
        firebaseDB
          .ref("/chat")
          .push({
            De: appChat.mensajes.de,
            Para: appChat.mensajes.para,
            Mensaje: appChat.mensajes.msg,
          })
          .then((this.mensajes.msg = ""));
      }
    },
    obtenerImagen(e) {
      // === Client side ===
      const crypto = window.crypto || window.msCrypto;
      var array = new Uint32Array(1);
      crypto.getRandomValues(array); // Compliant for security-sensitive use cases
      let file = e.target.files[0];
      let upload = storage
        .ref()
        .child("imageChat/" + file.name + crypto.getRandomValues(array))
        .put(file);
      upload.on(
        "state_changed",
        (snapshot) => {
          //muestra el progreso
          let progress = Math.round(
            (snapshot.bytesTransferred * 100) / snapshot.totalBytes
          ).toFixed(0);

          document.getElementById("target").innerHTML = `
          <div class="progress">
             <div class="progress-bar bg-dark" role="progressbar"
              style="width:${progress}%;" aria-valuenow="25
              " aria-valuemin="25" aria-valuemax="100">${progress}%</div>
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
          //cuando la imagen ya  esta subida

          upload.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            firebaseDB
              .ref("/chat")
              .push({
                De: appChat.mensajes.de,
                Para: appChat.mensajes.para,
                Mensaje: "",
                imagenMensaje: downloadURL,
              })
              .then(() => {
                document.getElementById("target").style.display = "none";
              });
          });
        }
      );
    },
  },
});