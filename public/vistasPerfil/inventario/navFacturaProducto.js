var contenido = new Vue({
  el: "#navegacion",
  data: {},
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
        alert('No Hay Facturas')
      /*$(".contenedor").load(
        "public/vistasPerfil/inventario/facturas",
        function (data) {
          $(this).html(data);
        }
      );*/
    },
  }
});
