var nuevadireccion = new Vue({
	el:'#nuevaD1',
	data:{
		Ndireccion:{
			iddireccion	:0,
			idusuarios:0,
			Direccion	:'',
			accion		:'nuevo',
			msg			:''
		}
	
	},
	
	methods:{
		idlogueo:function(){	
			fetch(`Private/Modulos/direcciones/procesos.php?proceso=idlogueo&direction=""`).then(resp=>resp.json()).then(resp=>{
				this.Ndireccion.idusuarios=resp[0].idusuario;
				
				
			})
			
			
		},
		
		
		almacenar:function(){
			
			fetch(`private/Modulos/direcciones/procesos.php?proceso=recibirDatos&direction=${JSON.stringify(this.Ndireccion)}`).then(resp => resp.json()).then(resp => {						
				if(resp.msg!="Registro insertado correctamente"){
					
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
				
			}),this.idlogueo(); 
			
		}
		
		
	}


})