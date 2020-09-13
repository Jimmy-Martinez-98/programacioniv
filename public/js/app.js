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
      fireAuth.signOut().catch(function (error) {
        alertify.warning("Ocurrio un error", error);
      });
    },
    UsuarioLogueado: function () {
      var dbchild = firebaseDB.ref("users/");
      let uid=fireAuth.currentUser.uid;
      dbchild.on("value", (snap) => {
        snap.forEach((element) => {
          if(uid===element.key){
           
           this.datoscuenta = element.val();
          }
        });
      });
    },

    observarUsuario:function(){
      let role=[]
      firebaseDB.ref('users/').on('value',snap=>{
        snap.forEach(element => {
          role=element.val()
        });
      })

      if (role.role==1) {
        location.href="public/vistasPerfilCliente/perfilCliente.html"
      }else if(role.role==0){
         location.href = "cooperativa.html";
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
      $("#contenedor").load("public/vistas/home/home.html", function (data) {
        $(this).html(data);
      });
    },

    /**
     * Carga un archivo html en contenedo/r
     * @access public
     * @function verdura
     */
    verdura() {
      $("#contenedor").load("public/vistas/verduras/verduras.html", function (
        data
      ) {
        $(this).html(data);
      });
    },

    /**
     * Carga un archivo html en contenedor
     * @access public
     * @function legumbre
     */
    legumbre() {
      $("#contenedor").load("public/vistas/legumbres/legumbres.html", function (
        data
      ) {
        $(this).html(data);
      });
    },

    /**
     * Carga un archivo html en contenedor
     * @access public
     * @function fruto
     */
    fruto() {
      $("#contenedor").load("public/vistas/frutos/frutos.html", function (
        data
      ) {
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
      location.href = "login.html";
    },
  },
});
