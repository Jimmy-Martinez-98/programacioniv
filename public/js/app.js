/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file app.js-> Sirve para la interaccion con la barra de navegacion
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var fireAuth = firebase.auth();
var firebaseDB = firebase.database();
var validarsession = new Vue({
  /**
   * @property el elemento del DOM a enlazar
   */
  el: "#hola",
  /**
   * @property propiedades utilizadas
   */
  data: {
    valor: "",
    session: "",
    datoscuenta: [],

  },

  created: function () {
    this.traercuenta();
    $.get("public/vistas/home/home.html", (data) => {
      $('#contenedor').html(data);
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
          validarsession.session = "Bienvenido";
          console.log("**********");
          console.log(validarsession.session);
          console.log("**********");

          validarsession.UsuarioLogueado();
        } else {
          validarsession.session = "regrese";
          console.log("**********");
          console.log(validarsession.session);
          console.log("**********");
        }
      });
    },
    singOut: function () {
      fireAuth.signOut()
    },
    UsuarioLogueado: function () {
      var dbchild = firebaseDB.ref("users/");
      let uid = fireAuth.currentUser.uid;
      dbchild.on("value", (snap) => {
        snap.forEach((element) => {
          if (uid === element.key) {
            this.datoscuenta = element.val();
          }
        });
      });
    },

    observarUsuario: function () {
      let role = [];
      let user = firebaseAuth.currentUser.uid;

      firebaseDB.ref("users/").on("value", (snap) => {
        snap.forEach((element) => {
          if (user == element.val().uId) {
            role = element.val();
          }
        });
      });

      if (role.role == 1) {
        location.href = "cooperativa.html";
      } else if (role.role == 0 || role.role == null) {
        location.href = "public/vistasPerfilCliente/perfilCliente.html";
      } else if (role.role == 2) {
        location.href="public/vistasPerfilAdmin/admin.html"
      }
    },

    /**
     * Animacion para la barra de navegacion responsive
     * @access public
     * @function colapsar
     */
    colapsar: function () {
      $("#toggles").animate({
        height: "toggle",
      });
    },

    slide: function () {
      $(".dropdown-menu").slideToggle();
    },
    /**
     * Carga un archivo html en contenedor
     * @access public
     * @function inicio
     */
    inicio() {
      $.get("public/vistas/home/home.html", (data) => {
        $('#contenedor').html(data);
      });
    },

    /**
     * Carga un archivo html en contenedo/r
     * @access public
     * @function verdura
     */
    verdura() {
      $.get("public/vistas/verduras/verduras.html", (data) => {
        $('#contenedor').html(data);
      });
    },

    /**
     * Carga un archivo html en contenedor
     * @access public
     * @function legumbre
     */
    legumbre() {
      $.get("public/vistas/legumbres/legumbres.html",(data)=> {
        $('#contenedor').html(data);
      });
    },

    /**
     * Carga un archivo html en contenedor
     * @access public
     * @function fruto
     */
    fruto() {
      $.get("public/vistas/frutos/frutos.html",  (data)=> {
        $('#contenedor').html(data);
      });
    },

    /**
     * Carga un archivo html en contenedor
     * @access public
     * @function blog
     */
    blog: function () {
      $.get("public/vistas/blog/blog.html", (data)=> {
        $('#contenedor').html(data);
      });
    },

    /**
     * Redirige al archivo login
     * @access public
     * @function login
     */
    login() {
      location.href = "login.html";
    },
  },
});