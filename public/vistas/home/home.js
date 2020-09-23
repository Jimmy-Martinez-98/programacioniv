/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file home.js-> Sirve para mostrar todos los productos
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */

 //Carrucel Legumbres
 
var app = new Vue({
  el: "#slider",
  data: {
    productos: [],
  },
  created: function () {
    this.datoss();
  },
  methods: {
    /**
     * Trae todos  los productos
     * @access public
     * @function datoss
     */
    datoss: function () {
      let dataP = [];
      firebaseDB.ref("Productos/").orderByChild("categoria").equalTo("Legumbres").on("value", (snap) => {
        snap.forEach((element) => {
          dataP.push(element.val());
        });
        this.productos = dataP;
      });
    },

    /*==========================
              LISTENERS
      ===========================
    */
    /**
     * Verifica si hay session iniciada si lo hay agrega el producto a la lista de deseos del usuario logueado
     * @access public
     * @function addlista
     * @param {Int} producto Representa el identificador del producto seleccionado
     */
    addlistaC: function (producto) {
      let user = firebaseAuth.currentUser;
      if (user) {
        let key = firebaseDB.ref().child("listaDeseos/").push().key;
        let data = {
          Arroba: producto.Arroba,
          Caja: producto.Caja,
          Quintal: producto.Quintal,
         
          categoria: producto.categoria,
          descProducto: producto.descProducto,
          idLista: key,
          idProducto: producto.idProducto,
          idUsuario: producto.idUsuario,
          idUsuarioObtubo: user.uid,
          imagen: producto.imagen,
          libra: producto.libra,
          nombreCooperativa: producto.nombreCooperativa,
          nombreProducto: producto.nombreProducto,
          nombreUsuario: producto.nombreUsuario,
          precioLibra:producto.precioLibra,
          precioArroba:producto.precioArroba,
          precioQuintal:producto.precioQuintal,
          precioCaja:producto.precioCaja
        };
        firebaseDB
          .ref("listaDeseos/" + key)
          .set(data)
          .then((e) => {
            if (e) {
              let mensaje =
                "Ups Ocurrio un error al guardar el producto en tu lista de deseos";
              this.openNotificationCarrousel(mensaje, "danger", "Error!!!");
            } else {
              let msg = "Guardado Exitosamente :)";
              this.openNotificationCarrousel(msg, "success", "Listoo!!");
            }
          });
      } else {
        let msg = "Debes Iniciar Sesión Para Realizar Esta Función :)";
        this.openNotificationCarrousel(msg, "primary", "Alerta!!!");
      }
    },
    openNotificationCarrousel(msg, notiColor, titulo) {
      const noti = this.$vs.notification({
        square: true,
        color: notiColor,
        position: "top-rigth",
        title: titulo,
        text: msg,
        progress: "auto",
      });

      return noti;
    },
    verProd: function (info) {
      var data = {
        info
      };
      sessionStorage.setItem("data", JSON.stringify(data));
      window.open("productos.html", "_blank");
    },
  },
});

//Carrucel Verduras

var app = new Vue({
  el: "#sliderverduras",
  data: {
    productos: [],
  },
  created: function () {
    this.datoss();
  },
  methods: {
    /**
     * Trae todos  los productos
     * @access public
     * @function datoss
     */
    datoss: function () {
      let dataP = [];
      firebaseDB.ref("Productos/").orderByChild("categoria").equalTo("Verduras").on("value", (snap) => {
        snap.forEach((element) => {
          dataP.push(element.val());
        });
        this.productos = dataP;
      });
    },

    /*==========================
              LISTENERS
      ===========================
    */
    /**
     * Verifica si hay session iniciada si lo hay agrega el producto a la lista de deseos del usuario logueado
     * @access public
     * @function addlista
     * @param {Int} producto Representa el identificador del producto seleccionado
     */
    addlistaC: function (producto) {
      let user = firebaseAuth.currentUser;
      if (user) {
        let key = firebaseDB.ref().child("listaDeseos/").push().key;
        let data = {
          Arroba: producto.Arroba,
          Caja: producto.Caja,
          Quintal: producto.Quintal,
         
          categoria: producto.categoria,
          descProducto: producto.descProducto,
          idLista: key,
          idProducto: producto.idProducto,
          idUsuario: producto.idUsuario,
          idUsuarioObtubo: user.uid,
          imagen: producto.imagen,
          libra: producto.libra,
          nombreCooperativa: producto.nombreCooperativa,
          nombreProducto: producto.nombreProducto,
          nombreUsuario: producto.nombreUsuario,
          precioLibra:producto.precioLibra,
          precioArroba:producto.precioArroba,
          precioQuintal:producto.precioQuintal,
          precioCaja:producto.precioCaja
        };
        firebaseDB
          .ref("listaDeseos/" + key)
          .set(data)
          .then((e) => {
            if (e) {
              let mensaje =
                "Ups Ocurrio un error al guardar el producto en tu lista de deseos";
              this.openNotificationCarrousel(mensaje, "danger", "Error!!!");
            } else {
              let msg = "Guardado Exitosamente :)";
              this.openNotificationCarrousel(msg, "success", "Listoo!!");
            }
          });
      } else {
        let msg = "Debes Iniciar Sesión Para Realizar Esta Función :)";
        this.openNotificationCarrousel(msg, "primary", "Alerta!!!");
      }
    },
    openNotificationCarrousel(msg, notiColor, titulo) {
      const noti = this.$vs.notification({
        square: true,
        color: notiColor,
        position: "top-rigth",
        title: titulo,
        text: msg,
        progress: "auto",
      });

      return noti;
    },
    verProd: function (info) {
      var data = {
        info
      };
      sessionStorage.setItem("data", JSON.stringify(data));
      window.open("productos.html", "_blank");
    },
  },
});

//Carrucel Frutos

var app = new Vue({
  el: "#sliderfrutos",
  data: {
    productos: [],
  },
  created: function () {
    this.datoss();
  },
  methods: {
    /**
     * Trae todos  los productos
     * @access public
     * @function datoss
     */
    datoss: function () {
      let dataP = [];
      firebaseDB.ref("Productos/").orderByChild("categoria").equalTo("Frutos").on("value", (snap) => {
        snap.forEach((element) => {
          dataP.push(element.val());
        });
        this.productos = dataP;
      });
    },

    /*==========================
              LISTENERS
      ===========================
    */
    /**
     * Verifica si hay session iniciada si lo hay agrega el producto a la lista de deseos del usuario logueado
     * @access public
     * @function addlista
     * @param {Int} producto Representa el identificador del producto seleccionado
     */
    addlistaC: function (producto) {
      let user = firebaseAuth.currentUser;
      if (user) {
        let key = firebaseDB.ref().child("listaDeseos/").push().key;
        let data = {
          Arroba: producto.Arroba,
          Caja: producto.Caja,
          Quintal: producto.Quintal,
         
          categoria: producto.categoria,
          descProducto: producto.descProducto,
          idLista: key,
          idProducto: producto.idProducto,
          idUsuario: producto.idUsuario,
          idUsuarioObtubo: user.uid,
          imagen: producto.imagen,
          libra: producto.libra,
          nombreCooperativa: producto.nombreCooperativa,
          nombreProducto: producto.nombreProducto,
          nombreUsuario: producto.nombreUsuario,
          precioLibra:producto.precioLibra,
          precioArroba:producto.precioArroba,
          precioQuintal:producto.precioQuintal,
          precioCaja:producto.precioCaja
        };
        firebaseDB
          .ref("listaDeseos/" + key)
          .set(data)
          .then((e) => {
            if (e) {
              let mensaje =
                "Ups Ocurrio un error al guardar el producto en tu lista de deseos";
              this.openNotificationCarrousel(mensaje, "danger", "Error!!!");
            } else {
              let msg = "Guardado Exitosamente :)";
              this.openNotificationCarrousel(msg, "success", "Listoo!!");
            }
          });
      } else {
        let msg = "Debes Iniciar Sesión Para Realizar Esta Función :)";
        this.openNotificationCarrousel(msg, "primary", "Alerta!!!");
      }
    },
    openNotificationCarrousel(msg, notiColor, titulo) {
      const noti = this.$vs.notification({
        square: true,
        color: notiColor,
        position: "top-rigth",
        title: titulo,
        text: msg,
        progress: "auto",
      });

      return noti;
    },
    verProd: function (info) {
      var data = {
        info
      };
      sessionStorage.setItem("data", JSON.stringify(data));
      window.open("productos.html", "_blank");
    },
  },
});

