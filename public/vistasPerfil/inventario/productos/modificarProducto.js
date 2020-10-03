confirmModificacion = new Vue({
  el: "#modificar",
  data: {
    modificacion: {
      arroba: false,
      caja: false,
      quintal: false,
      unidad: false,
      categoria: false,
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
      
      pL: "",
      pA: "",
      pQ: "",
      pC: "",
    },
  },
  methods: {
    confirmarMod: function () {
      if (
        this.modificacion.pU == "" &&
        this.modificacion.pL == "" &&
        this.modificacion.pA == "" &&
        this.modificacion.pQ &&
        this.modificacion.pC == ""
      ) {
        this.openNotificacion(
          "warning",
          "Ocurrio un Error",
          "Verifica la forma en la que venderas el producto"
        );
      } else {
        firebaseDB
          .ref("/Productos/" + confirmModificacion.modificacion.idProducto)
          .update({
            codeProducto: confirmModificacion.modificacion.codeProducto,
            nombreProducto: confirmModificacion.modificacion.nombreProducto,
            descProducto: confirmModificacion.modificacion.descProducto,
            existencias: confirmModificacion.modificacion.existencias,
            categoria: confirmModificacion.modificacion.categoria,
           
            libra: confirmModificacion.modificacion.libra,
            Arroba: confirmModificacion.modificacion.arroba,
            Quintal: confirmModificacion.modificacion.quintal,
            Caja: confirmModificacion.modificacion.caja,
          
            precioLibra: confirmModificacion.modificacion.pL,
            precioArroba: confirmModificacion.modificacion.pA,
            precioQuintal: confirmModificacion.modificacion.pQ,
            precioCaja: confirmModificacion.modificacion.pC,
            idProducto: confirmModificacion.modificacion.idProducto,
            nombreUsuario: confirmModificacion.modificacion.nombreUsuario,
            nombreCooperativa: confirmModificacion.modificacion.nombreCooperativa
          })
          .then(() => {
            misproductosapp.openNotificacion(
              "success",
              "Listo!!",
              "Tu Producto Se Modifico Exitosamente :)"
            );
            misproductosapp.limpiar();
            this.updateTable;
          })

          .then(() => {
            confirmModificacion.openNotificacion(
              "danger",
              "Error!!!",
              "Tu Producto No Se Ha Podido Modificar :("
            );
          });
      }
    },
    verificarCheckBox: function () {
      if (this.modificacion.Unidad == false) {
        this.modificacion.pU = ''
      } else if (this.modificacion.libra == false) {
        this.modificacion.pL = '';
      } else if (this.modificacion.Arroba == false) {
        this.modificacion.pA = '';
      }
    },
    openNotificacion: function (color, title, text) {
      this.$vs.notification({
        square: true,
        progress: "auto",
        color: color,
        title: title,
        text: text,
        width: "100%",
      });
    },
  },
});