var mostrardirecciones=new Vue({
	el:'#frm-direcciones',
	data: {
		direction:[]
	},
	created:function(){	
		this.info();
	},
	methods:{

		 /**
		  * Trae la direccion de el usuario desde la DB
		  * Si lo que trae es nulo
		  */
		info:function(){  	
		   fetch(`private/Modulos/direcciones/procesos.php?proceso=mostrardirecciones&direction=${this.direction}`).then( resp=>resp.json() ).then(resp=>{ 			
					this.direction=resp[0];
			});	   	     
		},

		/**
		 * asigna el item selecionado a la variable editardirecciones en su data: modi
		 * @param {contiene la direccion seleccionada} modD 
		 */
		editardire:function(modD){		
			
        	editardirecciones.modDi = modD;
			editardirecciones.modDi.accion = 'modificar';
			console.log(editardirecciones.modDi);
			
		
		}
	}
});





var editardirecciones= new Vue({
	el:'#modalmodificar',
	data:{
		modDi:{
			idDireccion :0,
			fkUsuario	:0,
			accion		:'nuevo',
			Direccion	:''
		}
			
	},
	methods:{
		actualizar:function(){
				
				fetch(`private/Modulos/direcciones/procesos.php?proceso=validarupdate&direction=${JSON.stringify(this.modDi)}`).then( resp=>resp.json() ).then(resp=>{
					if(resp.msg!="Dirección actualizada exitosamente"){	
						Swal.fire({
							position: 'top-end',
							icon: 'error',
							title:resp.msg,
							showConfirmButton: false,
							timer: 1500
						})	
					}else {
						alertify.success(resp.msg);
						this.info();
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
			idusuario:0,
			direccions	:'',
			accion		:'nuevo',
		}
	},
	/**
	 * ejecuta funcion cuando se carga la pagina
	 */
	created:function(){
		this.idlogueo();
	},
	methods:{	
		/**
		 * hace peticion al archivo php para traer desde la DB el id del usuario que esta logueado
		 * Y se le asigna dicho valor a la arreglo: Ndireccion
		 */
		idlogueo:function(){	
			fetch(`Private/Modulos/direcciones/procesos.php?proceso=idlogueo&direction=""`).then(resp=>resp.json()).then(resp=>{
				this.Ndireccion.idusuario=resp[0].idusuario;
			})		
		},
		/**
		 * envia los datos recolectados en el arrego Ndireccion para su procesamiento en php
		 * Donde si php responde con Registro Insertado Correctamente mostrara alerta de exito si no una de error
		 */
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
					alertify.success(resp.msg);
					mostrardirecciones.info();
				}	
				
			});
		}
	}
});



