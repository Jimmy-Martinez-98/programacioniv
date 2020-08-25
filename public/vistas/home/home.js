/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file home.js-> Sirve para mostrar todos los productos
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */

var app = new Vue({
  el: "#slider",
  data: {
    productos: [],
    lista_deseox: {
      id_miproducto: "",
      id_usuario: "",
      accion: "nuevo",
    },
    ItSession: 0,
    ItValor: "",
    ItCuenta: "",
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

      firebaseDB.ref("Productos/").on("value", (snap) => {
        snap.forEach((element) => {
          dataP.push(element.val());
        });
        this.productos = dataP;
      });
    },
    /**
     * Verifica si hay session iniciada si lo hay agrega el producto a la lista de deseos del usuario logueado
     * @access public
     * @function addlista
     * @param {Int} producto Representa el identificador del producto seleccionado
     */
    addlistaC: function (producto) {
      /* let user= firebaseAuth.currentUser
       */
    },
  },
});

/**
 * @instance objeto de instancia de Vue.js
 */
var todoproducto = new Vue({
  el: "#todoproducto",
  data: {
    all: [],
    lista_deseo: {
      id_miproducto: "",
      id_usuario: "",
      accion: "nuevo",
    },
    session: "",
  },
  created: function () {
    this.traer_todo();
  },
  methods: {
    /**
     * Representa todos los productos mostrados despues del carousel
     * @access public
     * @function traer_todo
     */
    traer_todo: function () {
      let dataP = [];
      firebaseDB.ref("Productos/").on("value", (snap) => {
        snap.forEach((element) => {
          dataP.push(element.val());
        });
        this.all = dataP;
      });
    },

    /*
    ======================
          LISTENER
    ======================  
    */
    /**
     * Guarda datos del producto en localStorage para su posterior llamada en otra pantalla
     * @access public
     * @function verdetalle
     * @param {object} info - Representa los datos del producto
     */
    verdetalle: function (info) {
      var data = {
        info,
      };
      sessionStorage.setItem("data", JSON.stringify(data));
      window.open("productos.html", "_blank");
    },

    addlista: function (datos) {
      let user = firebaseAuth.currentUser;
      if (user) {
        let key = firebaseDB.ref().child("listaDeseos/").push().key;
        let data = {
          Arroba: datos.Arroba,
          Caja: datos.Caja,
          Quintal: datos.Quintal,
          Unidad: datos.Unidad,
          categoria: datos.categoria,
          descProducto: datos.descProducto,
          idLista: key,
          idProducto: datos.idProducto,
          idUsuario: datos.idUsuario,
          idUsuarioObtubo: user.uid,
          imagen: datos.imagen,
          libra: datos.libra,
          nombreCooperativa: datos.nombreCooperativa,
          nombreProducto: datos.nombreProducto,
          nombreU: datos.nombreU,
          precioVenta: datos.precioVenta,
        };

        firebaseDB
          .ref("listaDeseos/" + key)
          .set(data)
          .then((e) => {
            if (e) {
              let mensaje='Ups Ocurrio un error al guardar el producto en tu lista de deseos'
              this.openNotification(mensaje,'danger','Error!!!');
            } else {
              let msg = "Guardado Exitosamente :)";
              this.openNotification(msg,'success','Listoo!!');
            }
          });
      } else{
         let msg = "Debes Iniciar Sesión Para Realizar Esta Función :)";
         this.openNotification(msg,'primary','Alerta!!!');
      }

    },
    openNotification(msg,notiColor,titulo) {
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
  },
});
