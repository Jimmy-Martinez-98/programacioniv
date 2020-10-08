/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file legumbress.js-> Sirve para mostrar todos los productos de categoria legumbres
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var seccionlegumbre = new Vue({
  el: "#legum",
  data: {
    legumbressss: [],
    valor: "",
  },
  methods: {
    /**
     * Trae los productos legumbres
     * @access public
     * @function traerlegumbres
     */
    traerlegumbres: function () {
      firebaseDB
        .ref("Productos/")
        .orderByChild("categoria")
        .equalTo("Legumbres")
        .on("value", (snap) => {
          this.legumbressss = snap.val();
        });
    },

    /**
     * Busca los productos en base a lo ingresado en el input
     * @access public
     * @function buscarL
     */
    buscarL: function () {
      let data = [];
      firebaseDB
        .ref("Productos/")
        .orderByChild("nombreProducto/")
        .startAt(this.valor)
        .on("value", (snap) => {
          snap.forEach((element) => {
            if (element.val().categoria == "Legumbres") {
              data.push(element.val());
            }
          });
          this.legumbressss = data;
        });
    },

    /**
     * Verifica si hay session iniciada si lo hay agrega el producto a la lista de deseos del usuario logueado
     * @access public
     * @function addlista
     * @param {Int} producto Representa el identificador del producto seleccionado
     */
    addlistaL: function (producto) {
      let user = firebaseAuth.currentUser,
        newKey = firebaseDB.ref().child("listaDeseos").push().key;
      if (user) {
        firebaseDB.ref("listaDeseos/" + newKey).set({
          arroba: producto.arroba,
          caja: producto.caja,
          categoria: producto.categoria,
          descProducto: producto.descProducto,
          idProducto: producto.idProducto,
          idUsuario: producto.idUsuario,
          idUsuarioObtubo: user.uid,
          idLista: newKey,
          imagen: producto.imagen,
          libra: producto.libra,
          nombreCooperativa: producto.nombreCooperativa,
          nombreProducto: producto.nombreProducto,
          nombreUsuario: producto.nombreUusuario,
          precioVenta: producto.precioVenta,
          quintal: producto.quintal,
        }).then(() => {
          let msg = "Guardado Exitosamente :)";
          this.openNotificationCarrousel(msg, "success", "Listoo!!", "<i class='bx bx-select-multiple' ></i>");
        })
      } else {
        let msg = "Debes Iniciar Sesión Para Realizar Esta Función :)";
        this.openNotificationCarrousel(msg, "primary", "Alerta!!!", "<i class='bx bx-info-square' ></i>");
      }
    },
    openNotificationCarrousel(msg, notiColor, titulo, icono) {
      const noti = this.$vs.notification({
        square: true,
        icon: icono,
        color: notiColor,
        position: "top-rigth",
        title: titulo,
        text: msg,
        progress: "auto",
      });

      return noti;
    },

    /**
     * Es cuando el input esta vacion ejecuta denuevo la funcion de traer los productos
     * @access public
     * @function autobusquda
     */
    autobusquda: function () {
      if (this.valor == "") {
        this.traerlegumbres();
      }
    },

    /**
     * Guarda los datos de un item en localStorage para su posterior uso
     * @access public
     * @function verProd
     * @param {object} info - Representa los datos de un item
     */
    verProd(info) {
      var data = {
        info,
      };
      sessionStorage.setItem("data", JSON.stringify(data));
      location.href = "productos.html";
    },

    /**
     * Ordena los items de forma descendente en base al precio
     * @access public
     * @function descL
     */
    descL: function () {},

    /**
     * Ordena los items de forma ascendente en base al precio
     * @access public
     * @function ascL
     */
    ascL: function () {},
  },
  created: function () {
    this.traerlegumbres();
  },
});