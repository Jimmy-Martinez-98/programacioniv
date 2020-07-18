/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file cuenta.js-> Sirve para la configuracion de la cuenta
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var AppListaD = new Vue({
  el: "#list_deseos",
  data: {
    AllDeseos: [],
  },
  methods: {
    /**
     * Mustra los productos en lista de deseos
     * @access public
     * @function Lista_Deseos
     */
    Lista_Deseos: function () {
      let data = [];
      let user = firebaseAuth.currentUser;
      firebaseDB.ref("listaDeseos/").on("value", (snap) => {
        snap.forEach((element) => {
          if (user.uid == element.val().idUsuarioObtubo) {
            data.push(element.val());
          }
        });
        this.AllDeseos=data;
      });
    },

    /**
     * Elimina un item
     * @access public
     * @function deleteproducto
     * @param {Int} miproducto - Representa el identificador del producto
     */
    deleteproducto(miproducto) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminalo!",
      }).then((result) => {
        if (result.value) {
            firebaseDB.ref('listaDeseos/'+miproducto).remove().then(()=>{
              swal.fire({
                title:'Eliminado!',
                text:'Producto eliminado de la lista',
                icon:'success'
              }).then(
                this.Lista_Deseos()
              )
            });
        }
      });
    },

    
    comprara: function (info) {
      var data = {
        info,
      };
      sessionStorage.setItem("data", JSON.stringify(data));
      location.href = "productos.html";
    },
  },
  created: function () {
    this.Lista_Deseos();
  },
});
