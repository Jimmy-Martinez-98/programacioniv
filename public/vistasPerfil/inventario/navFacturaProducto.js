var contenido = new Vue({
  el: "#navegacion",
  
  created: function () {
    this.productos()
  },
  methods: {
    productos: function () {
      $("#contenedor").load(
        "public/vistasPerfil/paginacion/paginacionInventario.html",
        function (data) {
          $(this).html(data);
        }
      );
    },
    facturas: function () {
      $("#contenedor").load(
        "public/vistasPerfil/gestionFacturas/gestiuonF.html",
        function (data) {
          $(this).html(data);
        }
      );
    },
  }
});