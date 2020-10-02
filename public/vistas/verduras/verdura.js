/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file verdura.js-> Sirve para el registro de usuario tipo vendedor
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var seccionverduras = new Vue({
  el: "#vegetales",
  data() {
    return {
      valor: "",
      verdes: [],

    }
  },
  created: function () {
    this.traer();
  },
  methods: {
    /**
     * Trae los productos de categoria verduras
     * @access public
     * @function traer
     */
    traer() {
      firebaseDB
        .ref("Productos/")
        .orderByChild("categoria")
        .equalTo("Verduras")
        .on("value", (snap) => {
          this.verdes = snap.val();
        });
    },

    /**
     * es cuando el input de busqueda esta vacio llama la funcion que trae los productos
     * @access public
     * @function autobusquda
     */
    autobusquda: function () {
      if (this.valor == "") {
        this.traer();
      }
    },

    /**
     * Es cuando el usuario busca un producto
     * @access public
     * @function buscarV
     */
    buscarV: function () {
      let data = [];
      firebaseDB
        .ref("Productos/")
        .orderByChild("nombreProducto/")
        .startAt(this.valor)
        .on("value", (snap) => {
          snap.forEach((element) => {
            if (element.val().categoria == "Verduras") {
              data.push(element.val());
            }
          });
          this.verdes = data;
        });
    },

    /**
     * Verifica si hay session iniciada si lo hay agrega el producto a la lista de deseos del usuario logueado
     * @access public
     * @function addlista
     * @param {Int} producto Representa el identificador del producto seleccionado
     */
    addlistaV: function (producto) {
      let user = firebaseAuth.currentUser;
      let newKey = firebaseDB.ref().child("listaDeseos").push().key;
      if (user) {
        let key = firebaseDB.ref().child("listaDeseos/").push().key;
        let data = {
          Arroba: producto.Arroba,
          Caja: producto.Caja,
          Quintal: producto.Quintal,
          categoria: producto.categoria,
          descProducto: producto.descProducto,
          idLista: newKey,
          idProducto: producto.idProducto,
          idUsuario: producto.idUsuario,
          idUsuarioObtubo: user.uid,
          imagen: producto.imagen,
          libra: producto.libra,
          nombreCooperativa: producto.nombreCooperativa,
          nombreProducto: producto.nombreProducto,
          nombreUsuario: producto.nombreUsuario,
          precioLibra: producto.precioLibra,
          precioQuintal: precioQuintal,
          precioArroba: precioArroba,
          precioCaja: precioCaja,
        };
        firebaseDB
          .ref("listaDeseos/" + key)
          .set(data)
          .then((e) => {
            if (e) {
              let mensaje =
                "Ups Ocurrio un error al guardar el producto en tu lista de deseos";
              this.openNotificationCarrousel(mensaje, "danger", "Error!!!", "< i class = 'bx bx-error-circle' > < /i>");
            } else {
              let msg = "Guardado Exitosamente :)";
              this.openNotificationCarrousel(msg, "success", "Listoo!!", "<i class='bx bx-check-multiple' ></i>");
            }
          });
      } else {
        let msg = "Debes Iniciar Sesión Para Realizar Esta Función :)";
        this.openNotificationCarrousel(msg, "primary", "Alerta!!!", "<i class='bx bx-info-square' ></i>");
      }
    },

    openNotificationCarrousel(msg, notiColor, titulo,icono) {
      const noti = this.$vs.notification({
        square: true,
        color: notiColor,
        icon:icono,
        position: "bottom-rigth",
        title: titulo,
        text: msg,
        progress: "auto",
      });

      return noti;
    },

    /**
     * Guarda el item en localStorage temporalmente para su uso posterior
     * @access public
     * @function verProd
     * @param {object} info - Representa la informacion del item seleccionado
     */
    verProd(info) {
      var data = {
        info,
      };

      sessionStorage.setItem("data", JSON.stringify(data));
      location.href = "productos.html";
    },

    /**
     * Es cuando el usuario selecciona mostrar productos en forma descendente en base a precio
     * @access public
     * @function descP
     */
    descP: function () {
      let data = [];
      if (this.verdes.precioLibra != '') {
        firebaseDB
          .ref("Productos/")
          .orderByChild("precioLibra")
          .on("value", (snap) => {
            snap.forEach((element) => {
              if (element.val().categoria == "Verduras") {
                data.push(element.val());
              }
            });
          });
        return (this.verdes = data);
      }
    },

    /**
     * Es cuando el usuario selecciona mostrar productos en forma ascendente en base a precio
     * @access public
     * @function ascP
     */
    ascP: function () {
      let data = [];
      if (this.verdes.preciocaja != '') {
        firebaseDB
          .ref("Productos/")
          .orderByChild("precioCaja")
          .on("value", (snap) => {
            snap.forEach((element) => {
              if (element.val().categoria == "Verduras") {
                data.push(element.val());
              }
            });
          });
        return (this.verdes = data);
      }

    },
  },
});