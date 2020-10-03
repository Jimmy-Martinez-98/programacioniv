var entradas = new Vue({
  el: "#Entradas",
  data() {
    return {
      seleccion: "",
      productos: [],
      historialEntradas: {
        fecha: "",
        cantidad: "",
        codigoProducto: "",
        nombreProducto: "",
      },
      entradas: [],
      paginacion: 0,
      allProducts: 0,
      pagPrincipal: 1,
      numResult: 4

    }
  },

  created: function () {
    this.obtenerProductos();
    this.traerEntradas();
  },

  methods: {
    obtenerProductos: function () {
      let user = firebaseAuth.currentUser.uid;
      let productos = [];
      firebaseDB.ref("/Productos").on("value", (snapshot) => {
        snapshot.forEach((element) => {
          if (user == element.val().idUsuario) {
            productos.push(element.val());
          }
        });
      });
      this.productos = productos;
    },
    traerEntradas: function () {
      let user = firebaseAuth.currentUser.uid;
      this.entradas = [];
      firebaseDB.ref("historialEntradas/").on("value", (snapshot) => {
        entradas.entradas = [];
        snapshot.forEach((element) => {
          if (user == element.val().idUsuario) {
            this.entradas.push(element.val());
          }
        });
      });
     
      this.paginacion = Math.round(this.entradas.length / this.numResult).toFixed(0)
      this.allProducts = this.entradas.length
    },

    /**
     * Listener
     */
    guardarEntrada: function () {
      this.historialEntradas.codigoProducto = this.seleccion.codeProducto;
      this.historialEntradas.nombreProducto = this.seleccion.nombreProducto;

      if (
        this.historialEntradas.fecha != "" &&
        this.historialEntradas.cantidad != "" &&
        this.historialEntradas.codigoProducto != "" &&
        this.historialEntradas.nombreProducto != ""
      ) {
        let newkey = firebaseDB.ref().child("historialEntradas/").push().key;
        firebaseDB
          .ref("historialEntradas/" + newkey)
          .set({
            codigoProducto: entradas.historialEntradas.codigoProducto,
            nombreProducto: entradas.historialEntradas.nombreProducto,
            fechaEntrada: entradas.historialEntradas.fecha,
            cantidadEntradas: entradas.historialEntradas.cantidad,
            idUsuario: entradas.seleccion.idUsuario,
            key: newkey,
          })
          .then(() => {
            this.aumentarStock();
            this.openNotification(
              "success",
              "Guardado de Entrada",
              "La entrada se guardo exitosamente",
              ""
            );
          });
      } else {
        this.openNotification(
          "dark",
          "Guardado de Entrada",
          "Por Favor Complete los campos",
          ""
        );
      }
    },
    aumentarStock: function () {
      let sumaStock =
        parseInt(this.seleccion.existencias) +
        parseInt(this.historialEntradas.cantidad);

      firebaseDB.ref("Productos/" + entradas.seleccion.idProducto).update({
        existencias: sumaStock,
      });
    },
    openNotification: function (color, title, text, width) {
      this.$vs.notification({
        square: true,
        progress: "auto",
        color: color,
        title: title,
        text: text,
        width: width,
      });
    },
    borrar: function () {
      this.historialEntradas.fecha = "";
      this.historialEntradas.cantidad = "";
      this.historialEntradas.codigoProducto = "";
      this.historialEntradas.nombreProducto = "";
      this.seleccion = "";
    },
    cerrar: function () {
      this.historialEntradas.fecha = "";
      this.historialEntradas.cantidad = "";
      this.historialEntradas.codigoProducto = "";
      this.historialEntradas.nombreProducto = "";
      this.seleccion = "";
    },
  },
});