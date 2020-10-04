/**
 * @instance objeto de instancia de Vue.js
 */
var appNueva = new Vue({
    el: "#nuevam",
    data: {
        Information: {
            imageInfo: "",
            description: "",
            telefono: "",
            correo: "",
        },
    },
    methods: {
        /**
         * Guarda la Informacion del formulario en Firebase
         * la funcion lo que ejecuta es:
         * 1 - Verificar el usuario logueado si lo esta entonces
         * 2 - Verifica si los datos no estan vacios
         * 3 - Hace la incersion en firebase database
         * @access public
         * @function guardarInformacion
         */
        guardarInformacion: function () {
            let user = firebaseAuth.currentUser;
            let db = firebaseDB;
            if (user) {
                if (
                    (this.Information.imageInfo != "" &&
                        this.Information.description != "" &&
                        this.Information.telefono != "" &&
                        this.Information.correo != "")
                ) {
                    let uId = user.uid;
                    let key = db.ref().child("descUsuario/").push().key;
                    let data = this.jsonParse(
                        uId,
                        key,
                        this.Information.imageInfo,
                        this.Information.description,
                        this.Information.telefono,
                        this.Information.correo,
                    );
                    db.ref("descUsuario/" + key)
                        .set(data)
                        .then(() => {
                            swal.fire({
                                title: "OK!",
                                text: "Datos Guardados Exitosamente",
                                icon: "success",
                            });
                            appNueva.Information.imageInfo = 'public/img/ico.png'
                            appNueva.Information.description = ''
                            appNueva.Information.telefono = ''
                            appNueva.Information.correo = ''
                            document.getElementById("filein").disabled
                        })
                        .catch(() => {
                            swal.fire({
                                title: "Error",
                                text: "Ocurrio un error inesperado",
                                icon: "error",
                            });
                        });
                } else {
                    swal.fire({
                        title: "Alerta!",
                        text: "Complete los campos",
                        icon: "info",
                    });
                }
            } else {
                console.log("no Hay");
            }
        },
        jsonParse(idU, id, imagen, descripcion, telefono, correo) {
            let data = {
                idU: idU,
                idDesc: id,
                imagen: imagen,
                descripcion: descripcion,
                telefono: telefono,
                correo: correo,
            };
            return data;
        },
        obtenerimagenN(e) {
            let file = e.target.files[0];
            let upload = storage
                .ref()
                .child("datos/" + file.name)
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
                        appNueva.Information.imageInfo = downloadURL;
                        document.getElementById("barra").style.display = "none";
                        document.getElementById("imgSinNada").style.display = "none";
                        document.getElementById("imgCon").style.display = "block";
                    });
                }
            );
        },
    },
    created: function () {
        document.getElementById("imgCon").style.display = "none";
    }
});