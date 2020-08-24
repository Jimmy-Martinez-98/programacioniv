/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file productosadd.js-> Sirve para publicar productos
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var DB = firebaseDB;
var publicarp = new Vue({
  el: "#frm-productoN",
  data: {
    publicP: {
      idUsuario: "",
      nombreProducto: "",
      descProducto: "",
      codeProducto: "",
      categoria: "",
      libra: "",
      Quintal: "",
      Arroba: "",
      Caja: "",
      Unidad: "",
      imagen: "",
      existencias: "",
      precio: "",
      precioVenta: "",
      fechaSubida: "",
    },
  },
  created: function () {
    this.traerid();
  },
  methods: {
    /**
     * Trae el identificador del usuario logueado
     * @access public
     * @function traerid
     */
    traerid: function () {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          var dbchild = DB.ref("users/");
          dbchild.on("value", (snap) => {
            snap.forEach((element) => {
              if (user.uid === element.key) {
                publicarp.publicP.idUsuario = element.val().uId;
              } else {
                console.log("no coincide id");
              }
            });
          });
        } else {
          console.log("error");
        }
      });
    },
      

    /**
     * Publica el producto del usuario en la base de datos
     * @access public
     * @function guardar
     */
    guardar: function () {
      //Crea nueva key para el json del producto
      var newKey = DB.ref().child("Productos/").push().key;
      var arrayData = this.JsonParse(
        newKey,
        this.publicP.idUsuario,
        this.publicP.nombreProducto,
        this.publicP.descProducto,
        this.publicP.codeProducto,
        this.publicP.categoria,
        this.publicP.libra,
        this.publicP.Arroba,
        this.publicP.Quintal,
        this.publicP.Unidad,
        this.publicP.Caja,
        this.publicP.imagen,
        this.publicP.existencias,
        this.publicP.precio,
        this.publicP.precioVenta,
        this.publicP.fechaSubida
      );

      if (
        this.publicP.idUsuario != "" ||
        (this.publicP.idUsuario != null && this.publicP.nombreProducto != "") ||
        (this.publicP.nombreProducto != null &&
          (this.publicP.descProducto != "") |
            (this.publicP.descProducto != null) &&
          this.publicP.codeProducto != "") ||
        (this.publicP.codeProducto != null && this.publicP.categoria != "") ||
        (this.publicP.categoria != null && this.publicP.imagen != "") ||
        (this.publicP.imagen != null && this.publicP.existencias != "") ||
        (this.publicP.existencias != null && this.publicP.precio != "") ||
        (this.publicP.precio != null && this.publicP.precioVenta != "") ||
        (this.publicP.precioVenta != null && this.publicP.fechaSubida != "") ||
        this.publicP.fechaSubida != null
      ) {
        //insercion
      
        DB.ref("Productos/" + newKey).set(arrayData, (error) => {
          if (error) {
            swal.fire({
              title: "Error ",
              text: error,
              icon: "error",
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Tu Producto Se Publico",
            });
           this.limpiarDatos();
          }
        });
      } else {
        swal.fire({
          title: "Error",
          text: "no se permiten campos vacios",
          icon: "warning",
        });
      }
    },
    limpiarDatos:function(){
       this.publicP.idUsuario = "";
            this.publicP.nombreProducto = "";
            this.publicP.descProducto = "";
            this.publicP.codeProducto;
            this.publicP.categoria = "";
            this.publicP.libra = "";
            this.publicP.Arroba = "";
            this.publicP.Quintal = "";
            this.publicP.Unidad = "";
            this.publicP.Caja = "";
            this.publicP.imagen = "";
            this.publicP.existencias = "";
            this.publicP.precio = "";
            this.publicP.precioVenta = "";
            this.publicP.fechaSubida = "";
    },
    JsonParse: function (
      idP,
      idU,
      nombreProducto,
      descProducto,
      codeProducto,
      categoria,
      libra,
      Arroba,
      Quintal,
      Unidad,
      Caja,
      imagen,
      existencias,
      precio,
      precioVenta,
      fechaSubida
    ) {
      let nombreU, nombreCooperativa;
      DB.ref("users/").on("value", (snap) => {
        snap.forEach((element) => {
          if (idU === element.val().uId) {
            nombreU = element.val().nombreU;
            nombreCooperativa = element.val().nombreCooperativa;
          }
        });
      });
      let Data = {
        idProducto: idP,
        idUsuario: idU,
        nombreProducto: nombreProducto,
        descProducto: descProducto,
        codeProducto: codeProducto,
        categoria: categoria,
        libra: libra,
        Arroba: Arroba,
        Quintal: Quintal,
        Unidad: Unidad,
        Caja: Caja,
        imagen: imagen,
        existencias: existencias,
        precio: precio,
        precioVenta: precioVenta,
        fechaSubida: fechaSubida,
        nombreU: nombreU,
        nombreCooperativa: nombreCooperativa,
      };

      return Data;
    },

    /**
     * Obtiene la imagen que esta en el tag img, lo almacena en una carpeta y
     *  la direccion la asigna a publicP.imagen
     * @access public
     * @function obtenerimagen
     * @param {object} e - Representa el cambio que sucede en el tag img
     */
    obtenerimagen(e) {
      let file = e.target.files[0];
      let upload = storage
        .ref()
        .child("productos/" + file.name)
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
            text: "Ocurrio un error al cargar Imagen",
            icon: "error",
          });
        },
        () => {
          //cuando la imagen ya esta subida
          upload.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            publicarp.publicP.imagen = downloadURL;
            document.getElementById("barra").style.display = "none";
          });
        }
      );
    },
  },
});

/**
 * Asigna la mascara de dinero a los inputs
 */
$(function () {
  // $(".money").mask("000.00");
});
