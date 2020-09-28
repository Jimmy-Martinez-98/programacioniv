var inbox = new Vue({
    el: "#inbox",
    data: {
        content: {
            de: "",
            para: "",
            msg: "",
            img: "",
        },
        users: [],
        refChats: [],
        userLogin: "",
        allmsg: [],
        msgs: [],
        displayName: [],
    },
    /**
     * llama las functiones para ejecutarlas
     * @instance Propiedad de instancias
     */
    created: function () {
        this.estadoUser();
        this.referenceChat();
        this.returnUsers;
        this.chatHistory();
        this.finalChat();
    },
    /**
     * Proiedades computadas
     * @property {updateChat} - Vacia la propiedad refChat
     * @property {returnNewArray}- Retorna los mensajes nuevos para la vista del chat
     * y estos actualize la vista automaticamente
     * @property {retornarImagen}- retorna la validacion de propiedad displayName
     * @property {returnUsers}- retorna los usuarios traidos de la basededados
     */
    computed: {
        updateChat: function () {
           
            this.refChats = [];
        },
        returnNewArray: function () {
            this.chatHistory();
            this.msgs = [];
            this.users = [];
            this.allmsg.forEach((element) => {
                this.evaluarItem(element);
            });
        },

        retornarImagen: function () {
            return this.displayName.imagen != "" || this.displayName.imagen != null;
        },
        returnUsers: function () {
            this.getUserForChat();
        },
    },

    /**
     * observador de cambios reactivo llama las propiedades para que estas
     * reaccionen al cambio en datos automaticamente
     */
    watch: {
        returnNewArray() {},
        returnUsers() {},
    },

    methods: {
        /**
         * observa el estado del usuario logueado para asignar el dato en la propiedades llamadas
         * @access public
         * @function estadoUser
         */
        estadoUser: function () {
            firebaseAuth.onAuthStateChanged((user) => {
                if (user) {
                    this.content.de = user.uid;
                    this.userLogin = user.uid;
                }
            });
        },
        /**
         * obtiene los usuarios de la base de datos firebase('users')
         * valida si el usuario logeado no esta en los datos devueltos por la DB y llama la funcion evaluateUsers
         * @access public
         * @function getUserForChat
         */
        getUserForChat: function () {
            let user = firebaseAuth.currentUser.uid;
            firebaseDB.ref("users/").on("value", (snap) => {
                snap.forEach((element) => {
                    if (user != element.val().uId) {
                        this.evaluateUsers(element.val());
                    }
                });
            });
        },
        /**
         * obtiene los datos del nodo de chat y asignar los necesarios en la propiedad refChats
         * @access public
         * @function referenceChat
         */
        referenceChat: function () {
            firebaseDB.ref("/chat").on("value", (snap) => {
                snap.forEach((element) => {
                    this.refChats.push({
                        De: element.val().De,
                        Para: element.val().Para,
                    });
                });
            });
        },
        /**Evalua los datos de el parametro
         * @access public
         * @function evaluateUsers
         * @param {object} item - los usuarios que pasan el filtro de la funcion que llama a esta
         */
        evaluateUsers: function (item) {
            let usuario = firebaseAuth.currentUser.uid;
            let arr;
            this.refChats.forEach((element) => {
                if (
                    (item.uId == element.De && usuario == element.Para) ||
                    (item.uId == element.Para && usuario == element.De)
                ) {
                    arr = [item];
                }
            });
            let unicos = "";
            unicos = new Set(arr);

            unicos.forEach((items) => {
                this.users.push(items);
            });
        },
        /**
         * Trae los datos del nodo de chat de la DB
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

            return (this.allmsg = historial);
        },
        /**
         * Abre el historial del chat seleccionado
         * @access public
         * @function openchat
         * @param {Int} id - Representa el Identificador del chat seleccionado
         */
        openchat: function (id) {
            this.content.para = id;
            this.msgs = [];

            this.allmsg.forEach((item) => {
                this.evaluarItem(item);
            });

            return this.headerChat(id);
        },
        /**
         * evalua cada mensaje para verificar si el usuario que loguea esta dentro de esos datos y los asigna
         * a la propiedad msgs
         * @access public
         * @function evaluarItem
         * @param {object} item - todos los mensajes
         */
        evaluarItem: function (item) {
            if (
                (item.De === this.content.de && item.Para === this.content.para) ||
                (item.De === this.content.para && item.Para === this.content.de)
            ) {
                return this.msgs.push(item);
            }
        },
        /**
         * evalua si el chat clickeado es igual a uno de la propiedad users, retorna los datos del usuario que pasa el filtro
         * @access public
         * @function headerChat
         * @param {String} id
         */
        headerChat: function (id) {
            this.users.forEach((element) => {
                if (id == element.uId) {
                    return (this.displayName = element);
                }
            });
        },
        /**
         * Es cuando el usuario envia el mensaje
         * @access public
         * @function sendMessage
         *
         */
        sendMessage: function () {
            if (
                this.content.msg.trim() != "" &&
                this.content.para != "" &&
                this.content.de != ""
            ) {
                firebaseDB
                    .ref("/chat")
                    .push({
                        De: inbox.content.de,
                        Para: inbox.content.para,
                        Mensaje: inbox.content.msg,
                    })
                    .then((this.content.msg = ""));
            }
        },
        /**
         * Es cuando el usuario selecciona una imagen para enviar en el chat.
         * Esta se guarda en el storage de firebase.
         * @access public
         * @function obtenerImagen
         * @param {object} e
         */
        obtenerImagen(e) {
            let file = e.target.files[0];
            let upload = storage
                .ref()
                .child("imageChat/" + file.name + Math.random())
                .put(file);
            upload.on(
                "state_changed",
                (snapshot) => {
                    //muestra el progreso
                    let progress = Math.round(
                        (snapshot.bytesTransferred * 100) / snapshot.totalBytes
                    );

                    document.getElementById("carga").innerHTML = `
                       <div class="d-flex align-items-center">
                        <strong>Subiendo... ${progress}%</strong>
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
                    //cuando la imagen ya document.getElementById("target").style.display='none' esta subida

                    upload.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        firebaseDB
                            .ref("/chat")
                            .push({
                                De: inbox.content.de,
                                Para: inbox.content.para,
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
       
    },
});
