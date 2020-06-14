var misproductosapp = new Vue({
	el: '#misprod',
	data: {
	 myproductos:[]
	
	 },
	 created:function(){
		 
		 this.productosmios();
		 
	 },
	 methods:{
	
		 productosmios:function(){	
			fetch(`Private/Modulos/misproductos/proceso.php?proceso=recibirDatos&miproducto=${JSON.stringify(this.myproductos)}`).then( resp=>resp.json() ).then(resp=>{ 
					this.myproductos = resp;	
				
			});
			
		 },
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
						Swal.fire(
							'Eliminado!',
							resp.msg,
							'success'
							
						  )
						  this.productosmios();	
					})
				}
			  })	
			 			
		}


	  }
		
		 
	})