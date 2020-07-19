/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file verdura.js-> Sirve para el registro de usuario tipo vendedor
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var seccionverduras = new Vue({
  el: "#vegetales",
  data: {
    verdes: [],
    valor: "",
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
        firebaseDB.ref("listaDeseos/" + newKey).set(
          {
            'arroba': producto.arroba,
            'caja': producto.caja,
            'categoria': producto.categoria,
            'descProducto': producto.descProducto,
            'idProducto': producto.idProducto,
            'idUsuario': producto.idUsuario,
            'idUsuarioObtubo': user.uid,
            'idLista': newKey,
            'imagen': producto.imagen,
            'libra': producto.libra,
            'nombreCooperativa': producto.nombreCooperativa,
            'nombreProducto': producto.nombreProducto,
            'nombreU': producto.nombreU,
            'precioVenta': producto.precioVenta,
            'quintal': producto.quintal,
            'unidad': producto.unidad,
          },
          (error) => {
            if (error) {
              swal.fire({
                title: "Ups...",
                text: "Ocurrio un error al intentar realizar la accion",
                icon: "error",
              });
            } else {
              let mensaje = alertify.success(
                "Producto agregado a tu lista de deseos :)"
              );
              mensaje.delay(2);
              alertify.set("notifier", "position", "top-right");
            }
          }
        );
      } else {
        swal.fire({
          title: "Debes iniciar sesion para utilizar esta opcion",
          icon: "info",
        });
      }
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
    descP: function () {},

    /**
     * Es cuando el usuario selecciona mostrar productos en forma ascendente en base a precio
     * @access public
     * @function ascP
     */
    ascP: function () {},
  },
});
