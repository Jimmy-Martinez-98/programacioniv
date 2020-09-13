/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file bandeja.js-> Sirve para comunicarse con los usuarios
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 *
 */
//var socket = io.connect("http://localhost:3001", { forceNew: true }),
/**
 * @property el  elemento del DOM a enlazar
 */
appbandeja = new Vue({
  el: "#bandejas",
  data: {
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
    displayName:[]
  },
  created() {
    this.estado();
    this.referenciaChats();
    this.chatHistory();
  },
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
    retornarImagen:function(){
      return (
        this.displayName.imagen != "" ||
        (this.displayName.imagen != null) );
    }
  },
  watch: {
    returnNewArray() {},
  },
  methods: {
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
    TraerUsersChats: function (user) {
      firebaseDB.ref("/users").on("value", (snap) => {
        snap.forEach((element) => {
          if (user != element.val().uId) {
            this.evaluarUsuarios(element.val());
          }
        });
      });
    },
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
    obtenerImagen(e) {
      let random = Math.random();
      let file = e.target.files[0];
      let upload = storage
        .ref()
        .child("imageChat/" + file.name + random)
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
    evaluarItem: function (item) {
      if (
        (item.De === this.msg.de && item.Para === this.msg.para) ||
        (item.De === this.msg.para && item.Para === this.msg.de)
      ) {
        this.msgs.push(item);
      }
    },
    headerChat:function(id){
      this.users.forEach(element => {
          if (id==element.uId) {
            this.displayName=element
          }
      });
    }
    
  },
});

