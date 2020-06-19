/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file cuenta.js-> Sirve para la configuracion de la cuenta
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var AppListaD =new Vue({
    el:'#list_deseos',
    data:{
        AllDeseos:[]
    },
    methods:{

		/**
		 * Mustra los productos en lista de deseos
		 * @access public 
		 * @function Lista_Deseos
		 */
        Lista_Deseos:function(){
            fetch(`Private/Modulos/misproductos/proceso.php?proceso=lista_deseos&miproducto=${this.AllDeseos}`).then(resp=>resp.json()).then(resp=>{
                this.AllDeseos=resp;  
            });
		},
		
		/**
		 * Elimina un item
		 * @access public
		 * @function deleteproducto
		 * @param {Int} miproducto - Representa el identificador del producto 
		 */
        deleteproducto(miproducto){

            Swal.fire({
				title: '¿Estás seguro?',
				text: "¡No podrás revertir esto!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Si, Eliminalo!'
			}).then((result) => {
				if (result.value) {
                    fetch(`Private/Modulos/misproductos/proceso.php?proceso=DelItemList&miproducto=${miproducto}`)
                    .then(resp=>resp.json()).then(resp=>{
                        if (resp.msg!='Eliminado de la Lista') {
							Swal.fire(
								'Ups...!',
								'Ocurrio un Error Inesperado!'
								
							);
						}else{
							Swal.fire(
								'Eliminado de la Lista!',
								resp.msg,
								'success'
								
							);
                            this.Lista_Deseos();
						}
					});
				}
			});	
            
            
        }
    },
    created:function(){
        this.Lista_Deseos();
    }
})