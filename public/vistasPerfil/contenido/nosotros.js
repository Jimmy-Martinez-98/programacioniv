/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file nosotros.js-> Sirve para la configuracion de la informacion del productor
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var appinfo = new Vue({
  el: "#nosotrosdiv",
  data: {
    infoNosotros: [],
  },
  created: function () {
    this.informacion();
  },
  methods: {
    /**
     * 	Trae imagen y descripcion de la cooperativa o productor
     * @access public
     * @function informacion
     */
    informacion: function () {
      let user = firebaseAuth.currentUser;
      let db = firebaseDB;
      let data = [];
      if (user) {
        db.ref("descUsuario/").on("value", (snap) => {
          snap.forEach((element) => {
            if (user.uid === element.val().idU) {
              data.push(element.val());
            }
          });
          this.infoNosotros = data[0];
        });
      } else {
        console.log("error");
      }
    },
    /**
     * Hace una peticion al archivo procesos.php para traer el id de usuario y asignarlo a appedit en su data: edidar
     * Igualmente le asigna la informacion del item seleccionado
     * @access public
     * @function editardatos
     * @param {object} id - Representa la informacion del item seleccionado
     */
    editarDatos: function (id) {
      appEdit.modificarDatos.idU = id.idU;
      appEdit.modificarDatos.idDesc = id.idDesc;
      appEdit.modificarDatos.imagen = id.imagen;
      appEdit.modificarDatos.descripcion = id.descripcion;
      appEdit.modificarDatos.telefono = id.telefono;
      appEdit.modificarDatos.correo = id.correo;
    },
  },
});

/**
 * @instance objeto de instancia de Vue.js
 */
var appEdit = new Vue({
  el: "#modaleditar",
  data: {
    modificarDatos: {
      idDesc: "",
      idU: "",
      imagen: "",
      descripcion: "",
      telefono: "",
      correo: "",
    },

   
  },
  methods: {
    /**
     * Actualiza los datos de la informacion del usuario
     * @access public
     * @function guardar
     */
    guardar: function () {
      let key = this.modificarDatos.idDesc;
      let data = this.jsonParse(
        key,
        this.modificarDatos.idU,
        this.modificarDatos.imagen,
        this.modificarDatos.descripcion,
        this.modificarDatos.telefono,
        this.modificarDatos.correo
      );

      let db = firebaseDB;
      if (
        (this.modificarDatos.imagen != "" &&
          this.modificarDatos.descripcion != "" &&
          this.modificarDatos.telefono != "" &&
          this.modificarDatos.correo != "") ||
        (this.modificarDatos.imagen != "" &&
          this.modificarDatos.descripcion != "" &&
          this.modificarDatos.telefono != "" &&
          this.modificarDatos.correo != "")
      ) {
        db.ref("descUsuario/" + key)
          .update(data, () => {
            swal.fire({
              title: "OK!",
              text: "Datos Actualizados!!",
              icon: "success",
            });
            appinfo.informacion();
            appEdit.modificarDatos.imagen = "public/img/ico.png";
            appEdit.modificarDatos.descripcion = ''
            appEdit.modificarDatos.telefono = ''
            appEdit.modificarDatos.correo = ''
          })
          .catch(() => {
            swal.fire({
              title: "Ups..",
              text: "Ocurrio un error inesperado",
              icon: "error",
            });
          });
      }
    },
    jsonParse(key, id, imagen, descripcion,telefono, correo) {
      let data = {
        idDesc: key,
        idU: id,
        imagen: imagen,
        descripcion: descripcion,
        telefono: telefono,
        correo: correo,
      };
      return data;
    },

    /**
     * Obtiene la imagen que esta en el tag img para guardarlo en carpeta y
     *  asignarlo a edidar.imagen su direccion
     * @access public
     * @function obtenerimagen
     * @param {objec} e - Representa el cambio en el tag img
     */
    obtenerimagen(e) {
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
             appEdit.modificarDatos.imagen = downloadURL;
             document.getElementById("progress").style.display = "none";
           });
         }
       );
   
    },
  },
});

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
          (this.Information.imageInfo != "",
            this.Information.description != "",
            this.Information.telefono != "",
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
              appNueva.Information.imageInfo='public/img/ico.png'
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
            document.getElementById("imgSinNada").style.display="none";
            document.getElementById("imgCon").style.display = "block";
          });
        }
      );
    },
  },
  created:function(){
     document.getElementById("imgCon").style.display = "none";
  }
});
