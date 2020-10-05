/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file bandeja.js-> Sirve para comunicarse con los usuarios
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 * @property el  elemento del DOM a enlazar
 * @property msg
 * @property msgs
 * @property users
 * @property allmsg
 * @property refChats
 * @property displayName
 */
var appbandeja = new Vue({
  el: "#bandejas",
  data() {
    return {
      msg: {
        de: "",
        para: "",
        msg: "",
        imagenMensaje: "",
      },
      msgs: [],
      users: [],
      allmsg: [],
      refChats: [],
      displayName: [],

    }
  },
  /**
   * llama a los metodos pa ejecutarlos al cargar el DOM
   */
  created() {
    this.estado();
    this.referenciaChats();
    this.chatHistory();

  },
  /**
   * propiedades computadas
   * @property updateChat
   * @property returnNewArray
   * @property retornarImagen
   */
  computed: {
    updateChat: function () {
      this.refChats = [];
    },
    returnNewArray: function () {
      this.chatHistory();
      this.msgs = [];
      this.allmsg.forEach((element) => {
        this.evaluarItem(element);

      });
    },
    retornarImagen: function () {
      return (
        this.displayName.imagen != "" ||
        (this.displayName.imagen != null));
    },



  },
  /** 
   * llama a la propiedades para poder observar su estado y si cambia su estado retornar el nuevo estado
   * @access public
   * watch
   */
  watch: {
    returnNewArray() {},

  },
  methods: {
    /**
     * evalua el estado de la sesión
     * @access public
     * @function estado
     */
    estado: function () {
      firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          //cargarUsuariosBandeja
          this.TraerUsersChats(user.uid);
          this.msg.de = user.uid;
        } else {
          location.href = "../../../login.html";
        }
      });
    },
    /**
     * hacer referencia al nodo de usuarios 
     * @access public 
     * @function TraerUsersChats
     * @param {String} user ->String de id de usuario 
     */
    TraerUsersChats: function (user) {
      firebaseDB.ref("/users").on("value", (snap) => {
        snap.forEach((element) => {
          if (user != element.val().uId) {
            this.evaluarUsuarios(element.val());
          }
        });
      });
    },
    /**
     * hace referencia al nodo de chat
     * @access public 
     * @function referenciaChats
     */
    referenciaChats: function () {
      firebaseDB.ref("/chat").on("value", (snap) => {
        snap.forEach((element) => {
          this.refChats.push({
            De: element.val().De,
            Para: element.val().Para,
          });
        });
      });
    },
    /**
     * los datos pasan por nun filtro que evalua si existe dicho item en el nodo de chat para mostrarlo en el panel de chats
     * @access public
     * @function evaluarUsuarios
     * @param {object} item -> objeto con los usuarios 
     */
    evaluarUsuarios: function (item) {
      let userLogueado = firebaseAuth.currentUser.uid;
      let arr;
      this.refChats.forEach((element) => {
        if (
          (item.uId == element.De && userLogueado == element.Para) ||
          (item.uId == element.Para && userLogueado == element.De)
        ) {
          arr = [item];
        }
      });
      let unicos = new Set(arr);
      unicos.forEach((element) => {
        return this.users.push(element);
      });
    },
    /**
     * carga el historial de mensajes
     * @access public 
     * @function chatHistory
     */
    chatHistory: function () {
      let historial = [];
      historial = [];
      firebaseDB.ref("/chat").on("value", (snap) => {
        snap.forEach((element) => {
          historial.push(element.val());
        });
      });

      this.allmsg = historial;

    },

    /**
     * Es cuando el usuario envia un mensaje a otro usuario.
     * @access public
     * @function enviarMensaje
     */
    enviarMensaje() {
      if (
        this.msg.msg.trim() != "" &&
        this.msg.para != "" &&
        this.msg.de != ""
      ) {
        firebaseDB
          .ref("/chat")
          .push({
            De: appbandeja.msg.de,
            Para: appbandeja.msg.para,
            Mensaje: appbandeja.msg.msg,
          })
          .then((this.msg.msg = ""));
      }
    },
    /**
     * es cuando el usuario selecciona una imagen del dispositivo
     * @access public 
     * @function obtenerImagen
     * @param {object} e -> objeto de imagen 
     */
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
          );

          document.getElementById("carga").innerHTML = `
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
          //cuando la imagen ya document.getElementById("target").style.display='none' esta subida

          upload.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            firebaseDB
              .ref("/chat")
              .push({
                De: appbandeja.msg.de,
                Para: appbandeja.msg.para,
                Mensaje: "",
                imagenMensaje: downloadURL,
              })
              .then(() => {
                document.getElementById("carga").style.display = "none";
              });
          });
        }
      );
    },
    /**
     * Abre el historial del chat seleccionado
     * @access public
     * @function openchat
     * @param {Int} id - Representa el Identificador del chat seleccionado
     */
    openchat: function (id) {
      this.msg.para = id;
      this.msgs = [];

      this.allmsg.forEach((item) => {
        this.evaluarItem(item);
      });
      this.headerChat(id)

    },
    /**
     * pasa por un filtro todos los datos para mostrar los correctos
     * @access public
     * @function evaluarItem
     * @param {object} item ->objeto que contiene los datos 
     */
    evaluarItem: function (item) {
      if (
        (item.De === this.msg.de && item.Para === this.msg.para) ||
        (item.De === this.msg.para && item.Para === this.msg.de)
      ) {
        this.msgs.push(item);

      }
    },


    /**
     * es cuando se muestra el nombre del titulo del chat
     * @access public
     * @function headerChat
     * @param {String} id -> String de ID de usuario 
     */
    headerChat: function (id) {
      this.users.forEach(element => {
        if (id == element.uId) {
          this.displayName = element
        }
      });
    }

  },
});