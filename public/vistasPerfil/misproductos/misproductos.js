/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file misproductos.js-> Sirve para la configuracion de los productos
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var firebaseDB = firebase.database();
var Authf = firebase.auth();
var misproductosapp = new Vue({
  el: "#misprod",
  data: {
    myproductos: [],
  },
  methods: {
    /**
     * Mustra los productos del usuario
     * @access public
     * @function productosmios
     */
    productosmios: function () {
      var user = firebase.auth().currentUser;
      let dbchild = firebaseDB.ref("Productos/");
      if (user) {
        dbchild.on("value", (snapshot) => {
          let todoProducto = [];
          snapshot.forEach((element) => {
            if (user.uid === element.val().idUsuario) {
              todoProducto.push(element.val());
            }
          });
          this.myproductos = todoProducto;
        });
      } else {
        // No user is signed in.
      }
    },
    deleteproducto:function(id){
      Swal.fire({
        title: 'Estas seguro?',
        text: "No podras revertir esto",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminalo!'
      }).then((result) => {
        if (result.value) {
          firebaseDB.ref('Productos/'+id).remove().then(()=>{
            swal.fire({
              title:'Eliminado',
              text:'Producto Eliminado',
              icon:'success'
            });
          }).catch((error)=>{
            swal.fire({
              title:'Ups..',
              text:'Ocurrio un error inesperdado',
              icon:'error'
            })
          })
        }
      })
      
    }
  },
  created: function () {
    this.productosmios();
  },
});
