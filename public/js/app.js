/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file app.js-> Sirve para la interaccion con la barra de navegacion
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var fireAuth = firebase.auth();
var validarsession = new Vue({
   /**
    * @property el elemento del DOM a enlazar
    */
   el: "#hola",
   data: {
      valor: '',
      session: '',
      datoscuenta: [],

   },



   created: function () {
      this.traercuenta();
      $("#contenedor").load("public/vistas/home/home.html", function (data) {
         $(this).html(data);
      });
   },
   methods: {
      /**
       * Trae los datos de la cuenta del usuario logueado
       * @access public
       * @function traercuenta
       */
      traercuenta: function () {

         fireAuth.onAuthStateChanged(function (user) {
            if (user) {
               validarsession.session = 'Bienvenido';
               console.log('**********');
               console.log(validarsession.session);
               console.log('**********');

            } else {
               validarsession.session = 'regrese';
               console.log('**********');
               console.log(validarsession.session);
               console.log('**********');

            }
         });
      },
      singOut: function () {
         fireAuth.signOut().catch(function (error) {
            alertify.warning('Ocurrio un error', error)
         });
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
         location.href = "login.html"
      }
   }
});
