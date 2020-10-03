/** 
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file entradas.js-> Sirve para la configuracion de entradas de productos
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
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
      entry: [],
      paginacion: 0,
      allProducts: 0,
      page: 1,
      pages: [],
      perPage: 4,


    }
  },
  /**
   * Metodo que ejecuta funciones que esten dentro de el
   * @access public
   * @method created
   */
  created: function () {
    this.obtenerProductos();
    this.traerEntry();
  },
  /**
   * Propiedades computadas son como las propiedades escritas en el data pero estas llevan un poco de logica
   * @method computed
   */
  computed: {
    displayEntry: function () {
      return this.paginate(this.entry);
    }
  },
  /**
   * metodo de vue para observar cambios en las propiedades llamadas en el metodo
   * @access public
   * @method watch
   */
  watch: {
    update() {
      this.traerEntry()
    },
    entry() {
      this.setEntry()
    }

  },

  methods: {
    /**
     * obtiene los productos de la db
     * @access public
     * @function obtenerProductos
     */
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
    /**
     * trae las entradas de la db
     * @access public
     * @function traerEntry
     */
    traerEntry: function () {
      let user = firebaseAuth.currentUser.uid;
      let todo = []
      firebaseDB.ref("historialEntradas/").on("value", (snapshot) => {
        todo = []
        snapshot.forEach((element) => {
          if (user == element.val().idUsuario) {
            todo.push(element.val())
          }
        });
      });
      this.entry = todo
    },
    /**
     * cuenta las paginas que se mostraran
     * @access public
     * @function setEntry
     */
    setEntry: function () {
      let numberOfPages = Math.ceil(this.entry.length / this.perPage);
      this.pages = []
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    },

    paginate: function (entry) {
      let page = this.page
      let perPage = this.perPage
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return entry.slice(from, to)
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