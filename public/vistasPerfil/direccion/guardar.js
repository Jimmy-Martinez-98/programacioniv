/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file guardar.js-> Sirve para guardar datos de la direccion del usuario
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */

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
		  * @access public
		  * @function info 
		*/
		info:function(){  	
			fetch(`private/Modulos/direcciones/procesos.php?proceso=recibirdireccionView&direction=${JSON.stringify(this.direction)}`).then( resp=>resp.json() ).then(resp=>{ 			
				this.direction=resp;
			});	   	     
		},

		/**
		 * Asigna el item selecionado a la variable editardirecciones en su data: modirec
		 * @access public
		 * @function editardire
		 * @param {object} modD - contiene la direccion seleccionada
		 */
		editardire:function(modD){		
        	editardirecciones.modDirec = modD[0];
			editardirecciones.modDirec.accion = 'modificar';
			
		}
	}
});



	/** 
	 * @instance objeto de instancia de Vue.js
	*/
var editardirecciones= new Vue({
	el:'#modalmodificar',
	data:{
		modDirec:{
			idDireccion :0,
			Direccion	:'',
			accion		:'modificar'
		}
			
	},
	methods:{
		/**
		 * Metodo para actualizar direccion 
		 * @access public
		 * @function actualizar
		 */
		actualizar:function(){
				fetch(`private/Modulos/direcciones/procesos.php?proceso=recibirDatos&direction=${JSON.stringify(this.modDirec)}`).then( resp=>resp.json() ).then(resp=>{
					if(resp.msg=="Dirección actualizada exitosamente"){	
						alertify.success(resp.msg);
						mostrardirecciones.info();
					}else {
						Swal.fire({
							position: 'top-end',
							icon: 'error',
							title:resp.msg,
							showConfirmButton: false,
							timer: 1500
						})	
					}	
				});
		}
	}
});






	/** 
	 * @instance objeto de instancia de Vue.js
	*/
var nuevadireccion = new Vue({
	el:'#nuevaD1',
	data:{
		Ndireccion:{
			idDireccion	:0,
			fkUsuario:0,
			Direccion	:'',
			accion		:'nuevo',
		}
	},

	created:function(){
		this.idlogueo();
	},
	methods:{	

		/**
		 * hace peticion al archivo php para traer desde la DB el id del usuario que esta logueado
		 * Y se le asigna dicho valor a la arreglo: Ndireccion
		 * @access public
		 * @function idlogueo
		 */
		idlogueo:function(){	
			fetch(`Private/Modulos/direcciones/procesos.php?proceso=idlogueo&direction=""`).then(resp=>resp.json()).then(resp=>{
				this.Ndireccion.fkUsuario=resp[0].idusuario;
			})		
		},
		/**
		 * envia los datos recolectados en el arrego Ndireccion para su procesamiento en php
		 * Donde si php responde con Registro Insertado Correctamente mostrara alerta de exito
		 *  si no una de error
		 * @access public
		 * @function almacenar
		 */
		almacenar:function(){	
			fetch(`private/Modulos/direcciones/procesos.php?proceso=recibirDatos&direction=${JSON.stringify(this.Ndireccion)}`).then(resp => resp.json()).then(resp => {
				if(resp.msg!="Dirección Guardada Correctamente"){		
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



