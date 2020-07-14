/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file cuenta.js-> Sirve para la configuracion de la cuenta
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */

var db = firebase.database();
var dbAuth = firebase.auth();
var datosCuenta = new Vue({
  el: "#cuenta",
  data: {
    datosPerfil: [],
  },
  methods: {
    /**
     * Trae el identificador del usuario logueado
     * @access public
     * @function traerdatosusuario
     */
    traerdatosusuario: function () {
      let user = dbAuth.currentUser;
      let datos = [];
      if (user) {
        db.ref("users/").on("value", (snap) => {
          snap.forEach((element) => {
            if (user.uid === element.key) {
              datos.push(element.val());
            }
          });
        });
        this.datosPerfil = datos[0];
      }
    },

    /**
     * Pasa los datos del item seleccionado  a otra variable para su edicion
     * @access public
     * @function modfoto
     * @param {object} update - Representa los datos a modificar
     */
    modfoto: function (update) {
      editfoto.updatefoto = update;
    },

    /**
     * pasa los datos de lo seleccionado a otra variable para su modificacion
     * @param {object} passs - Representa los datos a modificacion
     */
    modificacionpass: function (passs) {
      editpass.cambiopass = passs;
    },
  },
  created: function () {
    this.traerdatosusuario();
  },
});

/**
 * @instance objeto de instancia de Vue.js
 */
var editfoto = new Vue({
  el: "#fotoperfiledit",
  data: {
    updatefoto: {
      imagen: "",
    },
    imagenvista: "",
  },
  created: function () {},
  methods: {
    /**
     * Es cuando le da cargar foto, guarda los datos
     * @access public
     * @function Guardarimg
     */
    Guardarimg: function () {
      let id = dbAuth.currentUser.uid;
      db.ref("users/" + id)
        .update(this.updatefoto)
        .then(() => {
          swal.fire({
            title: "ok",
            text: "Imagen de Perfil Actualizada",
            icon: "success",
          });
          datosCuenta.traerdatosusuario();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /**
     * Obtiene la imagen que esta en el tag img para guardarlo en carpeta y
     *  asignarlo a updatefoto.imagen su direccion
     * @access public
     * @function obtenerimagen
     * @param {objec} e - Representa el cambio en el tag img
     */
    obtenerimagen(e) {
      let file = e.target.files[0];

      var respuesta = null;
      var formdata = new FormData($("#editfotoo")[0]);
      var ruta = "Private/Modulos/usuarios/imgperfil.php";

      $.ajax({
        type: "POST",
        url: ruta,
        data: formdata,
        contentType: false,
        processData: false,
        async: false,
        success: function (response) {
          respuesta = response;
        },
      });

      this.updatefoto.imagen = "Private/Modulos/usuarios/" + respuesta;
      this.cargarimagen(file);
    },

    /**
     * Carga la imagen en el tag img
     * @access public
     * @function cargarimagen
     * @param {object} file -Reprecenta el archivo de imagen
     */
    cargarimagen(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.imagenvista = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
  computed: {
    /**
     * Retorna la imagen en el tag img
     * @access public
     * @function imagenes
     * @returns imagenvista - Representa la imagen en si
     */
    imagenes() {
      return this.imagenvista;
    },
  },
});

/**
 * @instance objeto de instancia de Vue.js
 */
var editpass = new Vue({
  el: "#edicontra",
  data: {
    changePassword:{
      correo:''
    },
    cambiopass: {
      contra: "",
    },
  },
  methods: {
    /**
     * Manda los datos al archivo.php para su procesamiento
     * y si es exitoso el cambio muestra una alerta
     * @access public
     * @function updatepass
     */
    updatepass: function () {
      
     emailPerfil= dbAuth.currentUser.email
     if(this.changePassword.correo==emailPerfil){
      dbAuth.languageCode='es'
      email=this.changePassword.correo;
      dbAuth.sendPasswordResetEmail(email).then(()=>{
        swal.fire({
          title:'Enviando Correo..',
          icon:'info'
        })
      }).catch(()=>{
        swal.fire({
          title:'Ups...',
          text:'Ocurrio un error al intentar enviar correo para cambiar contrase'
        })
      });
     }else{
       swal.fire({
         title:'Ups',
         text:'El correo no pertenece a esta cuenta',
         icon:'error'
       })
     }
    
    }
  }
});
