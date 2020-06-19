/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file misproductos.js-> Sirve para la configuracion de los productos
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */

var misproductosapp = new Vue({
	el: '#misprod',
	data: {
		myproductos:[]
	},
	created:function(){ 
	    this.productosmios(); 
	},
	methods:{
	
		/**
		 * Mustra los productos del usuario
		 * @access public
		 * @function productosmios
		 */
		productosmios:function(){	
			fetch(`Private/Modulos/misproductos/proceso.php?proceso=recibirDatos&miproducto=${JSON.stringify(this.myproductos)}`).then( resp=>resp.json() ).then(resp=>{ 
					this.myproductos = resp;	
				
			});
			
		},


		/**
		 * Elimina un item
		 * @access public
		 * @function deleteproducto
		 * @param {Int} miproducto - Representa el identificador del item
		 */
		deleteproducto:function(miproducto){
		
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
					fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=deleteproducto&nuevoP=${miproducto}`).then(resp=>resp.json()).then(resp=>{
						if(resp.msg!='Su  Producto  Ha Sido Eliminado'){
							Swal.fire(
								'Ups...!',
								resp.msg,
								'error'
								
							);
						}else{
							Swal.fire(
								'Eliminado!',
								resp.msg,
								'success'
								
							);
							this.productosmios();	
						}
					});
				}
			});	
		},

		/**
		 * Marca un producto como agotado
		 * @access public
		 * @function agotado
		 * @param {Int} miproducto - Representa el identificador del producto 
		 */
		agotado:function(miproducto){
		
			Swal.fire({
				title: '¿Estás seguro?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Si, Marcar Como Agotado!'
			}).then((result) => {
				if (result.value) {
					fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=agotado&nuevoP=${miproducto}`).then(resp=>resp.json()).then(resp=>{
						if(resp.msg!='Producto Marcado En Agotado'){
							Swal.fire(	
								'Ups...!',		
								resp.msg,
								'error'	
							)
							this.productosmios();	
						}else{
							Swal.fire(	
								'Marcado!',		
								resp.msg,
								'success'	
							)
							this.productosmios();	
						}
					})
				}
			})
		},


		/**
		 * Marca un Producto como habilitado
		 * @access public
		 * @function habilitar
		 * @param {Int} miproducto - Representa el identificador del producto
		 */
		habilitar:function(miproducto){
			console.log(miproducto);
			
			Swal.fire({
				title: '¿Estás seguro?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText:  'Si, Marcar Como Habilitado!'
			}).then((result) => {
				if (result.value) {
					if (result.value) {
						fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=habilitado&nuevoP=${miproducto}`).then(resp=>resp.json()).then(resp=>{
							if(resp.msg!='Producto  Habilitado'){
								Swal.fire(
									'Ups...!',			
									resp.msg,
									'error'	
								)
								this.productosmios(); 
							}else{
								Swal.fire(
									'Habilitado!',			
									resp.msg,
									'success'	
								)
								this.productosmios();	
							}
						})
					}
				}
			})
		}
	}
})


