/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file app.js-> Sirve para la interaccion con la barra de navegacion
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var validarsession = new Vue({
   /**
    * @property el elemento del DOM a enlazar
    */
   el: "#hola",
   data: {
      valor: '',
      session: '',
      datoscuenta: []
   },


   created: function () {
      this.traersession();
      this.traercuenta();
      $("#contenedor").load("public/vistas/home/home.html", function (data) {
         $(this).html(data);
      });
   },
   methods: {

      /**
       * Trae el resultado de la verificacion de una variable de session 
       * @access public
       * @function traersession
       */
      traersession: function () {
         fetch(`Private/Modulos/usuarios/procesos.php?proceso=verVariable&login=${this.valor}`).then(resp => resp.json()).then(resp => {
            if (resp.msg == "regrese") {
               this.session = 0;
            } else {
               this.session = 1;
            }
         })
      },

      /**
       * Trae los datos de la cuenta del usuario logueado
       * @access public
       * @function traercuenta
       */
      traercuenta: function () {
         fetch(`Private/Modulos/usuarios/procesos.php?proceso=traercuenta&login=${this.datoscuenta}`).then(resp => resp.json()).then(resp => {
            this.datoscuenta = resp;
         })
      },

      /**
       * Animacion para la barra de navegacion responsive
       * @access public
       * @function colapsar
       */
      colapsar: function () {
         $("#toggles").animate({
            height: 'toggle'
         });
      },

      slide: function () {
         $('.dropdown-menu').slideToggle();
      },
      /**
       * Carga un archivo html en contenedor
       * @access public
       * @function inicio
       */
      inicio() {
         todoproducto.traersession();
         $("#contenedor").load("public/vistas/home/home.html", function (data) {
            $(this).html(data);
         });
      },

      /**
       * Carga un archivo html en contenedor
       * @access public
       * @function verdura
       */
      verdura() {
         $("#contenedor").load("public/vistas/verduras/verduras.html", function (data) {
            $(this).html(data);
         });
      },

      /**
       * Carga un archivo html en contenedor
       * @access public
       * @function legumbre
       */
      legumbre() {
         $("#contenedor").load("public/vistas/legumbres/legumbres.html", function (data) {
            $(this).html(data);
         });
      },

      /**
       * Carga un archivo html en contenedor
       * @access public
       * @function fruto
       */
      fruto() {
         $("#contenedor").load("public/vistas/frutos/frutos.html", function (data) {
            $(this).html(data);
         });
      },

      /**
       * Carga un archivo html en contenedor
       * @access public
       * @function blog
       */
      blog: function () {
         $("#contenedor").load("public/vistas/blog/blog.html", function (data) {
            $(this).html(data);
         });
      },

      /**
       * Redirige al archivo login 
       * @access public
       * @function login
       */
      login() {
         location.href = "login.php"
      }
   }
});
