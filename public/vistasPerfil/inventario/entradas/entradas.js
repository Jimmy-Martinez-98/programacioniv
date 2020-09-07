var entradas = new Vue({
  el: "#Entradas",
  data: {
    seleccion: "",
    productos: [],
    historialEntradas: {
      fecha: "",
      cantidad: "",
      codigoProducto: "",
      nombreProducto: "",
    },
    entradas: [],
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
      let myEntradas = [];
      firebaseDB.ref("historialEntradas/").on("value", (snapshot) => {
        snapshot.forEach((element) => {
          if (user == element.val().idUsuario) {
            myEntradas.push(element.val());
          }
        });
      });
      this.entradas = myEntradas;
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
