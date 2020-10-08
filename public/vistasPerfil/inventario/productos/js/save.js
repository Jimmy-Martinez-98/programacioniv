var guardarProducto = new Vue({
    el: "#addP",
    data: {
        agregar: {
            arroba: false,
            caja: false,
            quintal: false,
            unidad: false,
            categoria: false,
            pU: "",
            pL: "",
            pA: "",
            pQ: "",
            pC: "",
            codeProducto: "",
            descProducto: "",
            existencias: "",
            fechaSubida: "",
            idProducto: "",
            idUsuario: "",
            imagen: "",
            libra: false,
            nombreCooperativa: "",
            nombreProducto: "",
            nombreUsuario: "",
        },
    },
    created: function () {
        this.datosUser();
    },
    methods: {
        limpiar: function () {
            this.agregar.codeProducto = "";
            this.agregar.nombrePro = "";
            this.agregar.categoria = "";
            this.agregar.codeProducto = "";
            this.agregar.descProducto = "";
            this.agregar.existencias = "";
            this.agregar.fechaSubida = "";
            this.agregar.idProducto = "";
            this.agregar.idUsuario = "";
            this.agregar.imagen = "";
            this.agregar.libra = "";
            this.agregar.nombreCooperativa = "";
            this.agregar.nombreProducto = "";
            this.agregar.nombreUsuario = "";
            this.agregar.precioVent = "";
            this.agregar.arroba = "";
            this.agregar.caj = "";
            this.agregar.quintal = "";
            this.agregar.unidad = "";
            this.agregar.categoria = "";
            this.agregar.pU = "";
            this.agregar.pL = "";
            this.agregar.pA = "";
            this.agregar.pQ = "";
            this.agregar.pC = "";
            document.getElementById("imgP").setAttribute("hidden", true)
        },
        limpieza: function () {

            this.limpiar();
        },
        cerrar: function () {
            this.limpiar();
        },
        Guardar: function () {
            if (
                this.agregar.codeProducto != "" &&
                this.agregar.nombreProducto &&
                this.agregar.categoria != "" &&
                this.agregar.descProducto != "" &&
                this.agregar.existencias != "" &&
                this.agregar.fechaSubida != "" &&
                this.agregar.idProducto != "" &&
                this.agregar.idUsuario != "" &&
                this.agregar.imagen != "" &&
                this.agregar.nombreUsuario != ""
            ) {

                if (

                    this.agregar.pL == "" &&
                    this.agregar.pA == "" &&
                    this.agregar.pQ == "" &&
                    this.agregar.pC == "" &&
                    this.agregar.arroba == "" &&
                    this.agregar.caja == "" &&
                    this.agregar.quintal == "" &&
                    this.agregar.unidad == "" &&
                    this.agregar.categoria == ""
                ) {

                    guardarProducto.openNotificacion(
                        "danger",
                        "Espera!",
                        "Por Favor Espere A Que La Imagen Se Carge O Completa Los Campos Faltantes",
                        "<i class='bx bx-error-circle' ></i>"
                    );
                } else if (this.agregar.pL != '' || this.agregar.pA != '' || this.agregar.pQ !== '' || this.agregar.pC != '') {
                    if (this.agregar.imagen != "") {
                        this.saveUser();
                    } else {
                        guardarProducto.openNotificacion(
                            "danger",
                            "Ups...",
                            "Espera a que se carge la imagen",
                            "<i class='bx bx-info-circle' ></i>"
                        );
                    }
                }
            } else {
                guardarProducto.openNotificacion('dark', 'Por favor complete los campos :)', '', "<i class='bx bx-info-circle' ></i>")
            }
        },
        /**
         * Guarda los datos en la base de datos
         * @access public
         * @function saveUser
         */
        saveUser: function () {
            firebaseDB
                .ref("Productos/" + this.agregar.idProducto)
                .set({
                    idProducto: guardarProducto.agregar.idProducto,
                    codeProducto: guardarProducto.agregar.codeProducto,
                    nombreProducto: guardarProducto.agregar.nombreProducto,
                    descProducto: guardarProducto.agregar.descProducto,
                    existencias: guardarProducto.agregar.existencias,
                    categoria: guardarProducto.agregar.categoria,

                    libra: guardarProducto.agregar.libra,
                    Arroba: guardarProducto.agregar.arroba,
                    Quintal: guardarProducto.agregar.quintal,
                    Caja: guardarProducto.agregar.caja,
                    nombreUsuario: guardarProducto.agregar.nombreUsuario,
                    nombreCooperativa: guardarProducto.agregar.nombreCooperativa,
                    idUsuario: guardarProducto.agregar.idUsuario,
                    precioLibra: guardarProducto.agregar.pL,
                    precioArroba: guardarProducto.agregar.pA,
                    precioQuintal: guardarProducto.agregar.pQ,
                    precioCaja: guardarProducto.agregar.pC,
                    imagen: guardarProducto.agregar.imagen,
                })
                .then(() => {
                    guardarProducto.openNotificacion(
                        "success",
                        "Agregado!!",
                        "El Producto Fue Agregado Exitosamente",
                        "<i class='bx bx-select-multiple' ></i>"
                    );
                    this.limpiar();
                });
        },
        datosUser: function () {
            let user = firebaseAuth.currentUser.uid;
            firebaseDB
                .ref("/users")
                .orderByChild("uId")
                .equalTo(user)
                .on("value", (snap) => {
                    snap.forEach((element) => {
                        this.agregar.nombreUsuario = element.val().nombreUsuario;
                        this.agregar.idUsuario = element.val().uId;
                        this.agregar.nombreCooperativa = element.val().nombreCooperativa;
                    });
                });

            var nueva = firebaseDB.ref().child("Productos/").push().key;
            this.agregar.idProducto = nueva;
        },
        subirImagen: function (e) {
           
            let file = e.target.files[0];
            // === Client side ===
            const crypto = window.crypto || window.msCrypto;
            var array = new Uint32Array(1);
            crypto.getRandomValues(array); // Compliant for security-sensitive use cases
            let upload = storage
                .ref()
                .child("productos/" + file.name + crypto.getRandomValues(array))
                .put(file);

            upload.on(
                "state_changed",
                (snapshot) => {
                    //muestra el progreso
                    let progress = Math.round(
                        (snapshot.bytesTransferred * 100) / snapshot.totalBytes
                    ).toFixed(0);
                    let img = document.getElementById("barra");
                    img.innerHTML = `<div class="d-flex align-items-center">
                                    <strong>Subiendo... ${progress}%</strong>
                                    <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
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
                        guardarProducto.agregar.imagen = downloadURL;
                        document.getElementById("barra").style.display = "none";
                        document.getElementById("imgP").style.display="block"
                        document.getElementById("imgP").removeAttribute("hidden")
                    })
                }
            );
        },
        /**
         * La notificacion
         * @access public
         * @function openNotificacion
         * @param {String} color ->Representa el color en la notificaion 
         * @param {String} title ->Representa el titulo
         * @param {String} text  ->Representa el comentario
         * @param {String} icon  ->Representa el icono
         */
        openNotificacion: function (color, title, text, icon) {
            this.$vs.notification({
                square: true,
                icon: icon,
                progress: "auto",
                color: color,
                title: title,
                text: text,
                width: "100%",
            });
        },
    },
});