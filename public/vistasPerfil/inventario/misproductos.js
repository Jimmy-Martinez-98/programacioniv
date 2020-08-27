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
    modificacion: {
      arroba: false,
      caja: false,
      quintal: false,
      unidad: false,
      categoria: false,
      codeProducto: false,
      descProducto: false,
      existencias: false,
      fechaSubida: false,
      idProducto: false,
      idUsuario: false,
      imagen: false,
      libra: false,
      nombreCooperativa: false,
      nombreProducto: false,
      nombreU: false,
      precio: false,
      precioVenta: false,
    },
  },

  methods: {
    // toggleEdit: function () {
    //   document.getElementById("mod").setAttribute("hidden", true);
    //   document.getElementById("confirmar").removeAttribute("hidden");
    // },
    editar: function (id) {
      document.getElementById("code").removeAttribute("hidden");
      document.getElementById("name").removeAttribute("hidden");
      document.getElementById("desc").removeAttribute("hidden");
      document.getElementById("stock").removeAttribute("hidden");
      document.getElementById("categoria").removeAttribute("hidden");

      this.modificacion.codeProducto = id.codeProducto;
      this.modificacion.nombreProducto = id.nombreProducto;
      this.modificacion.descProducto = id.descProducto;
      this.modificacion.existencias = id.existencias;
      this.modificacion.categoria = id.categoria;
      this.modificacion.unidad = id.Unidad;
      this.modificacion.libra = id.libra;
      this.modificacion.arroba = id.Arroba;
      this.modificacion.quintal = id.Quintal;
      this.modificacion.caja = id.Caja;
      document.getElementById("ventasT").setAttribute("hidden", false);
      document.getElementById("selectVentas").removeAttribute("hidden");
    },
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
    deleteproducto: function (id) {
      Swal.fire({
        title: "Estas seguro?",
        text: "No podras revertir esto",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminalo!",
      }).then((result) => {
        if (result.value) {
          firebaseDB
            .ref("Productos/" + id)
            .remove()
            .then(() => {
              swal.fire({
                title: "Eliminado",
                text: "Producto Eliminado",
                icon: "success",
              });
            })
            .catch((error) => {
              swal.fire({
                title: "Ups..",
                text: "Ocurrio un error inesperdado",
                icon: "error",
              });
            });
        }
      });
    },
  },
  created: function () {
    this.productosmios();
  },
});
