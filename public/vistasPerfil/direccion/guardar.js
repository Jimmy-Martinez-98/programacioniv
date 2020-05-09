var nuevadireccion = new Vue({
	el:'#nuevaD1',
	data:{
		Ndireccion:{
			iddireccion	:0,
			idusuarios:'',
			Direccion	:'',
			accion		:'nuevo',
			msg			:''
		}
		
	},
	
	methods:{

		almacenar:function(){
			fetch(`private/Modulos/direcciones/procesos.php?proceso=recibirDatos&direction=${JSON.stringify(this.Ndireccion)}`).then(resp => resp.json()).then(resp => {
				
				
				if(resp.msg=="por favor ingrese la Dirección"){
					 
					 
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: resp.msg,
						showConfirmButton: false,
						timer: 1500
					})
				}else if(resp.msg=='Registro insertado correctamente'){
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: resp.msg,
						showConfirmButton: false,
						timer: 1500
					  })
				}
				
				
			});
		
			
		},
		obtenerlogin:function(){
			fetch(`Private/Modulos/direcciones/procesos.php?proceso=idlogueo&direction=""`).then(resp=>resp.json()).then(resp=>{
				console.log(this.resp);
				this.almacenar();		
				
				

				
			})
		}
		
		
	}

})