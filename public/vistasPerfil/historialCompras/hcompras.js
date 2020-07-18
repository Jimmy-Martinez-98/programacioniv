/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file hcompras.js-> Sirve para mostrar las compras hecha por el usuario
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var appprod = new Vue({
  el: "#productoss",
  data: {
    productos: [],
  },
  created: function () {
    this.fullp();
  },
  methods: {
    /**
     * Trae todos los productos de su lista de compras
     * @access public
     * @function fullp
     */
    fullp: function () {
      firebaseDB.ref('compras/').on('value',snap=>{
          this.productos=snap.val();
      })
    },
  },
});
