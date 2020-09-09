/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file frutos.js-> Sirve para mostrar los productos de categoria frutos
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 *
 */
var seccionfrutas = new Vue({
  el: "#frutas",
  data: {
    fruta: [],
    valor: "",
  },
  created: function () {
    this.traer();
  },
  methods: {
    /**
     * Trae los productos categorizados en frutos
     * @access public
     * @function traer
     */
    traer() {
      firebaseDB
        .ref("Productos/")
        .orderByChild("categoria")
        .equalTo("Frutos")
        .on("value", (snap) => {
          this.fruta = snap.val();
        });
    },

    /**
     * Verifica si hay session iniciada si lo hay agrega el producto a la lista de deseos del usuario logueado
     * @access public
     * @function addlista
     * @param {Int} producto Representa el identificador del producto seleccionado
     */
    addListaFrutos: function (producto) {
      let user = firebaseAuth.currentUser;
      let newKey = firebaseDB.ref().child("listaDeseos").push().key;
      if (user) {
        firebaseDB.ref("listaDeseos/" + newKey).set(
          {
            Arroba: producto.Arroba,
            Caja: producto.Caja,
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
            nombreUsuario: producto.nombreUsuario,
            precioVenta: producto.precioVenta,
            Quintal: producto.Quintal,
            
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
     * Es cuando el input esta vacion ejecuta denuevo la funcion de traer los productos
     * @access public
     * @function autobusquda
     */
    autobusquda: function () {
      if (this.valor == "") {
        this.traer();
      }
    },

    /**
     * Busca los productos en base a lo ingresado en el input
     * @access public
     * @function buscarF
     */
    buscarF: function () {
      let data = [];
      firebaseDB
        .ref("Productos/")
        .orderByChild("nombreProducto/")
        .startAt(this.valor)
        .on("value", (snap) => {
          snap.forEach((element) => {
            if (element.val().categoria == "Frutos") {
              data.push(element.val());
            }
          });
          this.fruta = data;
        });
    },

    /**
     * Sirve para mostrar la informacion de un producto
     * @access public
     * @function verProd
     * @param {object} info - Representa los datos de un producto
     */
    verProd(info) {
      var data = {
        info,
      };
      sessionStorage.setItem("data", JSON.stringify(data));
      location.href = "productos.html";
    },

    /**
     * Muestra los productos en orden descendente en base al precio
     * @access public
     * @function descF
     */
    descF: function () {
      /* data=[]
     firebaseDB.ref('Productos/').orderByChild('categoria/').equalTo('Frutos').on('value',snap=>{      
      data.push(snap.val())
     })
     this.fruta=data*/
    },

    /**
     * Muestra los productos en orden ascendente en base al precio
     * @access public
     * @function ascF
     */
    ascF: function () {},
  },
});
