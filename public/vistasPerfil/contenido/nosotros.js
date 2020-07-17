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
            this.infoNosotros=data[0];
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
      appEdit.modificarDatos.idU=id.idU
      appEdit.modificarDatos.idDesc=id.idDesc;
      appEdit.modificarDatos.imagen=id.imagen;
      appEdit.modificarDatos.descripcion=id.descripcion
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
      idDesc:'',
      idU:'',
      imagen:'',
      descripcion:''
    },

    imagenlittle: "",
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
        this.modificarDatos.descripcion
      );

      let db = firebaseDB;
      if (
        (this.modificarDatos.imagen != "" &&
          this.modificarDatos.descripcion != "") ||
        (this.modificarDatos.imagen != "" &&
          this.modificarDatos.descripcion != "")
      ) {
        db.ref("descUsuario/" + key)
          .update(data,()=>{
            swal.fire({
              title: "OK!",
              text: "Datos Actualizados!!",
              icon: "success",
            });
            appinfo.informacion();
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
    jsonParse(key, id, imagen, descripcion) {
      let data = {
        idDesc: key,
        idU: id,
        imagen: imagen,
        descripcion: descripcion,
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
      var respuesta = null;
      var formData = new FormData($("#imgs")[0]);
      var ruta = "Private/Modulos/about/guardarimagencoo.php";
      $.ajax({
        type: "POST",
        url: ruta,
        data: formData,
        contentType: false,
        processData: false,
        async: false,
        success: function (response) {
          respuesta = response;
        },
      });
      this.modificarDatos.imagen = "Private/Modulos/about/" + respuesta;
      this.cargar(file);
    },

    /**
     * Carga la imagen en el tag img
     * @access public
     * @function cargarimagen
     * @param {object} file -Reprecenta el archivo de imagen
     */
    cargar(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.imagenlittle = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
  computed: {
    /**
     * Retorna la imagen en el tag img
     * @access public
     * @function bindearimagen
     * @returns imagenlittle - Representa la imagen en si
     */
    bindearimagen() {
      return this.imagenlittle;
    },
  },
});

/**
 * @instance objeto de instancia de Vue.js
 */
var appnueva = new Vue({
  el: "#nuevam",
  data: {
    descripciones: {
      imagen: "",
      descripcion: "",
    },
    imglittle: "",
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
        console.log("si Hay");
        if (
          (this.descripciones.imagen != "",
          this.descripciones.descripcion != "")
        ) {
          let uId = user.uid;
          let key = db.ref().child("descUsuario/").push().key;
          let data = this.jsonParse(
            uId,
            key,
            this.descripciones.imagen,
            this.descripciones.descripcion
          );
          db.ref("descUsuario/" + key)
            .set(data)
            .then(() => {
              swal.fire({
                title: "OK!",
                text: "Datos Guardados Exitosamente",
                icon: "success",
              });
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
    jsonParse(idU, id, imagen, descripcion) {
      let data = {
        idU: idU,
        idDesc: id,
        imagen: imagen,
        descripcion: descripcion,
      };
      return data;
    },
    obtenerimagenN(e) {
      let file = e.target.files[0];

      this.cargar(file);

      var respuesta = null;

      var formData = new FormData($("#datos")[0]);

      var ruta = "Private/Modulos/about/guardarimagencoo.php";

      $.ajax({
        type: "POST",
        url: ruta,
        data: formData,
        contentType: false,
        processData: false,
        async: false,
        success: function (response) {
          respuesta = response;
        },
      });

      this.descripciones.imagen = "Private/Modulos/about/" + respuesta;
    },
    cargar(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.imglittle = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
  computed: {
    bindearimagenN() {
      return this.imglittle;
    },
  },
});
