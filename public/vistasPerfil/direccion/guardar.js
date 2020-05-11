var mostrardirecciones=new Vue({
	el:'#frm-direcciones',
	data: {
		direction:[] ,
   
		},
	created:function(){
		
		this.info();
		
		
	},
	methods:{
   
		info:function(){
		   
		   fetch(`private/Modulos/direcciones/procesos.php?proceso=recibirdireccion&direction=${JSON.stringify(this.direction )}`).then( resp=>resp.json() ).then(resp=>{ 
			   this.direction = resp;	
			   
		   });	   	   
		   
		},
		editardire:function(modificarD){
			editardirecciones.modificarD=modificarD;
			editardirecciones.modificarD.accion='modificar';

			
		}
	
	
	}

});

var editardirecciones= new Vue({
	el:'#moddirec',
	data:{
		modificarD:{
			iddireccion	:0,
			idusuarios:0,
			Direccion	:'',
			accion		:'nuevo',
			msg			:''
		}
			
	},
	methods:{
		
		actualizar:function(){
			fetch(`private/Modulos/direcciones/procesos.php?proceso=recibirDatos&direction=${JSON.stringify(this.modificarD)}`).then( resp=>resp.json() ).then(resp=>{
				
				console.log('array',this.modificarD);
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
	created:function(){
		this.idlogueo();
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
				
			});
			
		}
	
		
		
	}


})



