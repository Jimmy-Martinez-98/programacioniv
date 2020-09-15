var factura = new Vue({
  el: "#staticBackdrop",
  data: {
    facturar: {
      nombreProducto: "",
      tCompra: "",
      contador: 0,
      precioUnitario: 0,
      correo: "",
      distribuidora: "",
      idPedido: "",
    },
    precios: {
      pLibra: 0,
      pArroba: 0,
      pQuintal: 0,
      pCaja: 0,
    },
    ownerName: "",
    total: 0,
    fecha: "",
  },
  computed: {
    update: function () {
      this.verificarPUnitario();
     
    },
  },
  watch: {
    update: function () {},
  },
  methods: {
    verificarPUnitario: function () {
      this.facturar.idPedido = Math.floor(Math.random() * 100);
      if (this.facturar.tCompra == "Libra") {
        this.facturar.precioUnitario = this.precios.pLibra;
      }
      if (this.facturar.tCompra == "Arroba") {
        this.facturar.precioUnitario = this.precios.pArroba;
      }
      if (this.facturar.tCompra == "Quintal") {
        this.facturar.precioUnitario = this.precios.pQuintal;
      }
      if (this.facturar.tCompra == "Caja") {
        this.facturar.precioUnitario = this.precios.pCaja;
      }
      this.total =
        parseFloat(this.facturar.precioUnitario) *
        parseFloat(this.facturar.contador);

      this.total = Math.round(this.total);
      let date = new Date();
      this.fecha = date.toLocaleDateString();
    },
    datosFactura: function () {
      const $elementoParaConvertir = document.getElementById("factura");
      html2pdf()
        .set({
          margin: 1,
          filename: "Factura.pdf",
          image: {
            type: "jpeg",
            quality: 0.98,
          },
          html2canvas: {
            scale: 3, // A mayor escala, mejores gráficos, pero más peso
            letterRendering: true,
          },
          jsPDF: {
            unit: "in",
            format: "a4",
            orientation: "portrait", // landscape o portrait
          },
        })
        .from($elementoParaConvertir)
        .save()
        .catch((err) => console.log(err));
    },
    descargaDatosCuenta: function () {
      const $DateBank = document.getElementById("datosCuenta");
      html2pdf()
        .set({
          margin: 1,
          filename: "Datos_de_cuenta.pdf",
          image: {
            type: "jpeg",
            quality: 0.98,
          },
          html2canvas: {
            scale: 3, // A mayor escala, mejores gráficos, pero más peso
            letterRendering: true,
          },
          jsPDF: {
            unit: "in",
            format: "a4",
            orientation: "portrait", // landscape o portrait
          },
        })
        .from($DateBank)
        .save()
        .catch((err) => console.log(err));
    },
    saveDataFactura: function () {
      let hoy = new Date();
      let dosDias = 1000 * 60 * 60 * 24 * 2; //multiplicamos 1000 milisegundos por sesenta segundos, por sesenta minutos, por 24 horas y finalmente por 2 días.
      let suma = hoy.getTime() + dosDias; //getTime devuelve milisegundos de esa fecha
      let fechaEnDosDias = new Date(suma);
      let fechaFinal =
        fechaEnDosDias.getFullYear() +
        "/" +
        fechaEnDosDias.getMonth() +
        "/" +
        fechaEnDosDias.getDate();

      let key = firebaseDB.ref().child("dataFacturas/").push().key;
      firebaseDB
        .ref("dataFacturas/" + key)
        .set({
          idFacura: key,
          idOwner: this.ownerName,
          idPedido: factura.facturar.idPedido,
          cliente: factura.facturar.correo,
          fecha: factura.fecha,
          fVence: fechaFinal,
          cant: factura.facturar.contador,
          tCompra: factura.facturar.tCompra,
          descripcion: factura.facturar.nombreProducto,
          total: factura.total,
        })
        .then(() => {
          console.log("ok!");
        })
        .catch((err) => {
          console.log(error);
        });
    },
    generarFactura: function () {
      this.saveDataFactura();
      this.datosFactura();
    },
  },
});
