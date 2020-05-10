var editardirecciones= new Vue({
	el:'#moddirec',
	data:{
		texto:{
			
		},

		modificarD:[]
		
	},
	methods:{
		actualizar:function(){
			fetch(`private/Modulos/direcciones/procesos.php?proceso=recibirDatos&direction=${JSON.stringify(this.modificarD)}`).then( resp=>resp.json() ).then(resp=>{
				this.modificarD.msg = resp.msg;
				console.log(this.resp);
				if(resp.msg!="Dirección actualizada exitosamente"){
					
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title:resp.msg,
						showConfirmButton: false,
						timer: 1500
					})
				}else {
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: resp.msg,
						showConfirmButton: false,
						timer: 1500
					  })
				}	
				
				
            });
		}
	
	}


});

