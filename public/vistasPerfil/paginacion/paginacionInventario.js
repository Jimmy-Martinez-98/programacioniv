var paginations = new Vue({
  el: "#paginacion",
  data: {},
  methods: {
    tablaProducto: function () {
      $("#v-pills-inicio").load(
        "public/vistasPerfil/inventario/productos/mproductos.html",
        function (data) {
          $(this).html(data);
        }
      );
    },
    tablaEntradas:function(){
          $("#v-pills-entradas").load(
            "public/vistasPerfil/inventario/entradas/entradas.html",
            function (data) {
              $(this).html(data);
            }
          );
    }
  },
});
