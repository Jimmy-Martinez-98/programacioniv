var mostrardirecciones=new Vue({
	el:'#frm-direcciones',
	data: {
		direction:[]
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
	
		editardire:function(modD){
			
        	editardirecciones.modDi = modD;
            editardirecciones.modDi.accion = 'modificar';
            console.log("datos",modD.idusuario );       
        }
	}

});

var editardirecciones= new Vue({
	el:'#moddirec',
	data:{
		modDi:{
			iddireccion	:0,
			idusuarios	:0,
			accion		:'nuevo',
			Direccion	:'',	
			msg			:''
		}
			
	},
	created:function(){
		this.idlogueo();
	},
	
	
	methods:{
		idlogueo:function(){	
			fetch(`Private/Modulos/direcciones/procesos.php?proceso=idlogueo&direction=""`).then(resp=>resp.json()).then(resp=>{
				this.modDi.idusuarios=resp[0].idusuario;	
				console.log('manda datos',this.modDi.idusuarios);
								
			})
			
			
		},
	
		actualizar:function(){
			console.log(this.modDi.idusuario);
			console.log("usuarios",this.modDi.idusuarios);
			fetch(`private/Modulos/direcciones/procesos.php?proceso=recibirDatos&direction=${JSON.stringify(this.modDi)}`).then( resp=>resp.json() ).then(resp=>{
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



