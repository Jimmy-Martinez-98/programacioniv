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
      console.log(producto);

      let user = firebaseAuth.currentUser;
      let key = firebaseDB.ref().child("listaDeseos/").push().key;
      if (user) {
        firebaseDB.ref("listaDeseos/" + key).set({
          idUsuarioObtubo: user.uid,
          idLista: key,
          idUsuario: user.uid,
          idProducto: producto.idProducto,
          arroba: producto.Arroba,
          caja: producto.Caja,
          categoria: producto.categoria,
          codeProducto: producto.codeProducto,
          descProducto: producto.descProducto,
          existencias: producto.existencias,
          imagen: producto.imagen,
          libra: producto.libra,
          nombreCooperativa: producto.nombreCooperativa,
          nombreProducto: producto.nombreProducto,
          nombreU: producto.nombreUsuario,
          precioArroba: producto.precioArroba,
          precioCaja: producto.precioCaja,
          precioQuintal: producto.precioQuintal,
          precioLibra: producto.precioLibra,
          quintal: producto.Quintal,
        }).then(() => {
          this.openNotification(' ', 'primary', 'Producto añadido a la lista')
        });
      } else {
        this.openNotification('', 'danger', 'Debes iniciar sesión para realizar esta acción')
      }
    },
    openNotification(msg, notiColor, titulo) {
      const noti = this.$vs.notification({
        square: true,
        color: notiColor,
        position: "bottom-center",
        title: titulo,
        text: msg,
        progress: "auto",
      });

      return noti;
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
      let hoy = new Date();
      let dosDias = 1000 * 60 * 60 * 24 * 2; //multiplicamos 1000 milisegundos por sesenta segundos, por sesenta minutos, por 24 horas y finalmente por 2 días.
      let suma = hoy.getTime() + dosDias; //getTime devuelve milisegundos de esa fecha
      let fechaEnDosDias = new Date(suma);
      let fechaFinal =
        fechaEnDosDias.getFullYear() +
        "/" +
        fechaEnDosDias.getMonth() +
        "/" +
        fechaEnDosDias.getDate();

      factura.limitDate = fechaFinal;

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
           this.openNotification('', 'primary', 'Debes seleciconar una opcion de compra para realizar esta acción')
        }
      } else {
        this.openNotification('', 'danger', 'Debes iniciar sesión para realizar esta acción')
      }
    },
    viewOwner: function (id) {

      var ownerId = {
        id,
      };
      sessionStorage.setItem("owner", JSON.stringify(ownerId));
      location.href = "public/vistas/verproductos/viewProductOwner.html"
    }
  },
});