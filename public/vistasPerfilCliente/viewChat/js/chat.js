var inbox = new Vue({
    el: "#inbox",
    data: {
        content: {
            de: '',
            para: '',
            msg: '',
            img: '',

        },
        users: [],
        refChats: [],
        userLogin: '',
        allmsg: [],
        msgs: [],
        displayName: []
    },
    created: function () {
        this.estadoUser();
        this.referenceChat();
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
        retornarImagen: function () {
            return (
                this.displayName.imagen != "" ||
                (this.displayName.imagen != null));
        }
    },
    watch: {
        returnNewArray() { },

    },
    methods: {
        estadoUser: function () {
            firebaseAuth.onAuthStateChanged(user => {
                if (user) {
                    this.getUserForChat(user.uid)
                    this.content.de = user.uid;
                    this.userLogin = user.uid
                }
            })
        },
        getUserForChat: function (user) {
            firebaseDB.ref('users/').on('value', snap => {
                snap.forEach(element => {
                    if (user != element.val().uId) {


                        this.evaluateUsers(element.val())
                    }
                });
            })
        },
        referenceChat: function () {
            firebaseDB.ref('/chat').on('value', snap => {
                snap.forEach(element => {
                    this.refChats.push({
                        De: element.val().De,
                        Para: element.val().Para
                    })
                });
            })
        },
        evaluateUsers: function (item) {
            let usuario = firebaseAuth.currentUser.uid
            let arr;
            this.refChats.forEach((element) => {

                if ((item.uId == element.De && usuario == element.Para) ||
                    (item.uId == element.Para && usuario == element.De)) {
                    arr = [item];

                }
            })


            let unicos = new Set(arr);
            unicos.forEach((items) => {
                this.users.push(items);
            })

        },
        chatHistory: function () {

            let historial = [];
            historial = [];
            firebaseDB.ref("/chat").on("value", (snap) => {

                snap.forEach((element) => {

                    historial.push(element.val());
                });
            });

            return this.allmsg = historial;
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
            this.headerChat(id)

        },
        evaluarItem: function (item) {
            if (
                (item.De === this.content.de && item.Para === this.content.para) ||
                (item.De === this.content.para && item.Para === this.content.de)
            ) {
                this.msgs.push(item);
            }
        },
        headerChat: function (id) {
            this.users.forEach(element => {
                if (id == element.uId) {
                    this.displayName = element
                }
            });
        },
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
        obtenerImagen(e) {
            let file = e.target.files[0];
            let upload = storage
                .ref()
                .child("imageChat/" + file.name+Math.random())
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
        hola:function(){
            console.log('hola');
            
        }

    }
})