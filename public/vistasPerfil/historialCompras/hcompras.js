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
    compras_M: [],
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
      fetch(
        `Private/Modulos/misproductos/proceso.php?proceso=Mis_Compras&miproducto=${this.productos}`
      )
        .then((resp) => resp.json())
        .then((resp) => {
          this.compras_M = resp;
        });
    },
  },
});
