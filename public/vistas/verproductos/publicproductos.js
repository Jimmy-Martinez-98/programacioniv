/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file publicproductos.js-> Sirve para ver detalladamente el producto
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var mostrardetalle = new Vue({
  el: "#productovista",
  data: {
    detallesprod: [],
    productosrelacionados: [],
    contador: 1,
    lista_deseo: {
      id_miproducto: "",
      id_usuario: "",
      accion: "nuevo",
    },
    session: "",
    valor: "",

    Compra: {
      select_Cantidad: "",
      usuario: "",
      idProducto: "",
    },
  },
  created: function () {
    this.todo();
  },
  methods: {
    /**
     * Obtiene la informacion del item seleccinado desde localStorage para mostrarlo y asignarle siertos datos a Compra
     * @access public
     * @function todo
     *
     */
    todo: function () {
      var dataFromStorage = JSON.parse(sessionStorage.getItem("data"));
      this.detallesprod = dataFromStorage;
      this.Compra.usuario = dataFromStorage.info.idUsuario;
      this.Compra.idProducto = dataFromStorage.info.idProducto;
    },

    /**
     * Es cuando se le da clic al boton agregar a deseos.
     * @access public
     * @function addlista
     * @param {object} producto - Reprecenta la informacion del item seleccionado
     */
    addlista: function (producto) {
      let user = firebaseAuth.currentUser;
      let key = firebaseDB.ref().child("listaDeseos/").push().key;
      if (user) {
        firebaseDB.ref("listaDeseos/" + key).set(
          {
            idUsuarioObtubo: user.uid,
            idLista: key,
            idUsuario: user.uid,
            idProducto: producto.idProducto,
            arroba: producto.arroba,
            caja: producto.caja,
            categoria: producto.categoria,
            codeProducto: producto.codeProducto,
            descProducto: producto.descProducto,
            existencias: producto.existencias,
            fechaSubida: producto.fechaSubida,
            imagen: producto.imagen,
            libra: producto.libra,
            nombreCooperativa: producto.nombreCooperativa,
            nombreProducto: producto.nombreProducto,
            nombreU: producto.nombreU,
            precio: producto.precio,
            precioVenta: producto.precioVenta,
            unidad: producto.unidad,
            quintal: producto.quintal,
          },
          (error) => {
            if (error) {
              swal.fire({
                title: "Error",
                text: "Ocurrio un error inesperado",
                icon: "error",
              });
            } else {
              alertify.success("Producto añadido a tu lista de deseos");
              alertify.set("notifier", "position", "top-right");
            }
          }
        );
      } else {
        Swal.fire(
          "Ups...",
          "Debes Iniciar Sesión Para Usar Esta funcion",
          "warning"
        );
      }
    },
    /**
     * Es cuando le da click a  boton +
     * @access public
     * @function suma
     */
    suma: function () {
      this.contador++;
    },

    /**
     * Es cuando le da click a boton -
     * @access public
     * @function resta
     */
    resta: function () {
      if (this.contador === 1) {
        this.contador = 1;
      } else if (this.contador <= 0) {
        this.contador = 1;
      } else {
        this.contador--;
      }
    },

    /**
     * Redirige al usuario a la pantalla de chat con usuario dueño de producto
     * @access public
     * @function contactar
     */
    contactar: function (id) {
      var userPara = {
        id,
      };
      sessionStorage.setItem("data", JSON.stringify(userPara));
      location.href = "public/vistas/chat/chat.html";
    },

    /**
     * Verifica si hay variable de session iniciada si lo hay abre la ventana modal
     * Y pasa los datos del producto a Comprax
     * @access public
     * @function passdatos
     * @param {object} id - Representa los datos del producto
     */
    passdatos: function (id) {
      let user = firebaseAuth.currentUser;

      if (user) {
        let idcliente = user.uid;
        if (this.Compra.select_Cantidad != "") {
          factura.facturar.contador = this.contador;
          factura.facturar.tCompra = this.Compra.select_Cantidad;
          factura.facturar.nombreProducto = id.nombreProducto;
          factura.precios.pLibra = id.precioLibra;
          factura.precios.pArroba = id.precioArroba;
          factura.precios.pQuintal = id.precioQuintal;
          factura.precios.pCaja = id.precioCaja;
          factura.facturar.correo = user.email;
          factura.ownerName = id.idUsuario;
          factura.idClient = idcliente;
          factura.ProductDesc = id.descProducto;
          factura.image = id.imagen;

          if (id.nombreCooperativa != "") {
            factura.facturar.distribuidora = id.nombreCooperativa;
          } else {
            factura.facturar.distribuidora = id.nombreUsuario;
          }

          $("#staticBackdrop").modal("show");
        } else {
          swal.fire({
            title: "Ups..",
            text: "debes escoger un tipo de compra para utilizar esta funcion",
            icon: "info",
          });
        }
      } else {
        swal
          .fire({
            title: "Debes iniciar sesion para utilizar esta funcion",
            text: "",
            icon: "info",
          })
          .then(() => {
            location.href = "login.html";
          });
      }
    },
  },
});
