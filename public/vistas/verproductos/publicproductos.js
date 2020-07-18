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
    cuentalogueada: [],

    Compra: {
      cantidad: "",
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
    contactar: function () {
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
      appcomprar.contador = this.contador;
      if (user) {
        if (this.Compra.select_Cantidad != "") {
          appcomprar.Comprax = id;

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

/**
 * @instance objeto de instancia de Vue.js
 */
var appcomprar = new Vue({
  el: "#staticBackdrop",
  data: {
    Correo: {
      email: "",
      nombre: "",
    },
    Comprax:[],
    producto: [],
    contador: 0,
  },
  methods: {
    /**
     * Es cuando el usuario manda los datos de su nombre y correo para generar una factura
     * @access public
     * @function enviarcorreo
     */
    enviarcorreo: function () {
      fetch(
        `Private/Modulos/publicarproducto/procesos.php?proceso=recibirCorreo&nuevoP=${JSON.stringify(
          this.Correo
        )}`
      )
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.msg == "Mensaje Enviado") {
            this.comprar();
          }
        });
    },

    /**
     * es cuando se muestra la alerta de que se envio correo al usuario
     * @access public
     * @function comprar
     */
    comprar: function () {
      let idComprador = firebaseAuth.currentUser.uid;
      let key = firebaseDB.ref().child("compras/").push().key;

      firebaseDB.ref("compras/" + key).set(
        {
          idComprador: idComprador,
          arroba: this.Comprax.arroba,
          caja: this.Comprax.caja,
          categoria: this.Comprax.categoria,
          descProducto: this.Comprax.descProducto,
          idProducto: this.Comprax.idProducto,
          idUsuario: this.Comprax.idUsuario,
          imagen: this.Comprax.imagen,
          libra: this.Comprax.libra,
          nombreCooperativa: this.Comprax.nombreCooperativa,
          nombreProducto: this.Comprax.nombreProducto,
          nombreU: this.Comprax.nombreU,
          precioVenta: this.Comprax.precioVenta,
          quintal: this.Comprax.quintal,
          unidad: this.Comprax.unidad,
          contador:this.contador
        },
        (error) => {
          if (error) {
            swal.fire({
              title: "Ups..",
              text: "Ocurrio un error al intentar realizar la accion",
              icon: "error",
            });
          } else {
            swal
              .fire({
                title: "Compra Realizada!",
                text:
                  "Se ha Enviado un E-mail a su Correo Electronico con la Factura Junto con Nuestra Información",
                icon: "success",
              })
              .then(() => {
                $("#staticBackdrop").modal("hide");
              });
          }
        }
      );
    },
  },
});
