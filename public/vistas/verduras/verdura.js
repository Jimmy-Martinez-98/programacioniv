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
    lista_deseox: {
      id_miproducto: "",
      id_usuario: "",
      accion: "nuevo",
    },
    ItSession: 0,
    ItValor: "",
    ItCuenta: "",
  },
  created: function () {
    this.traer();
    this.variablesession();
  },
  methods: {
    /**
     * Trae los productos de categoria verduras
     * @access public
     * @function traer
     */
    traer() {
      fetch(
        `Private/Modulos/inicio+secciones/procesos.php?proceso=recibirverduras&miproducto=${JSON.stringify(
          this.verdes
        )}`
      )
        .then((resp) => resp.json())
        .then((resp) => {
          this.verdes = resp;
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
      fetch(
        `Private/Modulos/inicio+secciones/procesos.php?proceso=buscarproductosV&miproducto=${this.valor}`
      )
        .then((resp) => resp.json())
        .then((resp) => {
          this.verdes = resp;
        });
    },

    /**
     * Verifica si hay una variable de session iniciada
     * @access public
     * @function variablesession
     */
    variablesession: function () {
      fetch(
        `Private/Modulos/usuarios/procesos.php?proceso=verVariable&login=${this.ItValor}`
      )
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.msg == "regrese") {
            this.ItSession = 0;
            console.log("nohay>", resp);
          } else {
            this.ItSession = 1;
            console.log("si hay > ", resp);
          }
        });
      this.cuentalogueada();
    },

    /**
     * Trae la cuenta loguea
     * @access public
     * @function cuentalogueada
     *
     */
    cuentalogueada: function () {
      fetch(
        `Private/Modulos/usuarios/procesos.php?proceso=traercuenta&login=${this.ItCuenta}`
      )
        .then((resp) => resp.json())
        .then((resp) => {
          if (this.ItSession != 1) {
            console.log("no hay session");
          } else {
            this.lista_deseox.id_usuario = resp[0].idusuario;
          }
        });
    },

    /**
     * Verifica si hay session iniciada si lo hay agrega el producto a la lista de deseos del usuario logueado
     * @access public
     * @function addlista
     * @param {Int} producto Representa el identificador del producto seleccionado
     */
    addlistaV: function (producto) {
      if (this.ItSession != 0) {
        var idproducto = producto.miproducto;
        this.lista_deseox.id_miproducto = idproducto;
        fetch(
          `Private/Modulos/inicio+secciones/procesos.php?proceso=guardarlista&miproducto=${JSON.stringify(
            this.lista_deseox
          )}`
        )
          .then((resp) => resp.json())
          .then((resp) => {
            var alerta = alertify.success(resp.msg);
            alerta.delay(2);
            alertify.set("notifier", "position", "top-right");
          });
      } else {
        Swal.fire(
          "Ups...",
          "Debes Iniciar Sesión Para Usar Esta Opción",
          "warning"
        );
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
    descP: function () {
      fetch(
        `Private/Modulos/inicio+secciones/procesos.php?proceso=recibirbusquedatipo&miproducto=${JSON.stringify(
          this.verdes
        )}`
      )
        .then((resp) => resp.json())
        .then((resp) => {
          this.verdes = resp;
        });
    },

    /**
     * Es cuando el usuario selecciona mostrar productos en forma ascendente en base a precio
     * @access public
     * @function ascP
     */
    ascP: function () {
      fetch(
        `Private/Modulos/inicio+secciones/procesos.php?proceso=recibirbusquedatipovasc&miproducto=${JSON.stringify(
          this.verdes
        )}`
      )
        .then((resp) => resp.json())
        .then((resp) => {
          this.verdes = resp;
        });
    },
  },
});
