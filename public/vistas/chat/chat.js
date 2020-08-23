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
appChat = new Vue({
  el: "#frm-chats",
  data: {
    mensajes: {
      de: "",
      para: "",
      msg: "",
    },
    allMessages: [],
  },
  created() {
    this.estado();
    this.chatHistory();
  },
  computed: {
    update: function () {
      console.log(this.allMessages);

      this.chatHistory();
    },
   
  },
  watch: {
    allMessages: function (val) {
      this.allMessages = val;
    },
  },

  methods: {
    /*
    ======================
           METODOS
    ======================
    */

    estado: function () {
      firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          //cargarUsuariosBandeja
          console.log("Bienvenido");
          var dataFromStorage = JSON.parse(sessionStorage.getItem("data"));
          this.mensajes.para = dataFromStorage.id;
          this.mensajes.de = user.uid;
        } else {
          location.href = "login.html";
        }
      });
    },
    chatHistory: function () {
      let data = [];
      data = [];

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

    /*
      =========================
              LISTENERS
      =========================
      */

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
  },
});
