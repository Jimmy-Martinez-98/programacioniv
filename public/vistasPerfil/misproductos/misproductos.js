/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file misproductos.js-> Sirve para la configuracion de los productos
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var firebaseDB = firebase.database();
var Authf = firebase.auth();
var misproductosapp = new Vue({
  el: "#misprod",
  data: {
    myproductos: [],
  },
  methods: {
    /**
     * Mustra los productos del usuario
     * @access public
     * @function productosmios
     */
    productosmios: function () {
      var user = firebase.auth().currentUser;
      let dbchild = firebaseDB.ref("Productos/");
      if (user) {
        dbchild.on("value", (snapshot) => {
          let todoProducto = [];
          snapshot.forEach((element) => {
            if (user.uid === element.val().idUsuario) {
              todoProducto.push(element.val());
            }
          });
          this.myproductos = todoProducto;
        });
      } else {
        // No user is signed in.
      }
    },
  },
  created: function () {
    this.productosmios();
  },
});
