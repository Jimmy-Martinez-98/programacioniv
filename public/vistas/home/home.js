/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file home.js-> Sirve para mostrar todos los productos
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */

var app=new Vue({
	el:"#slider",
	data:{
		productos:[],
		lista_deseox:{
			id_miproducto:'',
			id_usuario:'',
			accion:'nuevo'
		},
		ItSession:0,
		ItValor:'',
		ItCuenta:''
	},
	created:function(){
	this.datoss();
	this.variablesession();
	
	
	},
	methods:{

		/**
		 * Trae todos  los productos 
		 * @access public
		 * @function datoss
		 */
		datoss:function(){         
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirall&miproducto=${JSON.stringify(this.productos )}`).then( resp=>resp.json() ).then(resp=>{ 
			this.productos = resp;		
			
			});		  
		},
		

		/**
		 * Trae la cuenta loguea
		 * @access public
		 * @function cuentalogueada
		 * 
		 */
		cuentalogueada: function () {  
			fetch(`Private/Modulos/usuarios/procesos.php?proceso=traercuenta&login=${this.ItCuenta}`).then(resp=>resp.json()).then(resp=>{
				if(this.ItSession!=1){
					console.log('no hay session');
				
				}else{
					this.lista_deseox.id_usuario=resp[0].idusuario;

					
				}
			})
		},


		/**
		 * Trae los datos de un producto
		 * @access public
		 * @function verProd
		 * @param {object} info - Representa los datos de  un producto
		 */
		verProd(info){
			var data={
			info
			}
			sessionStorage.setItem("data",JSON.stringify(data));
		
		},


		/**
		 * Verifica si hay una variable de session iniciada
		 * @access public
		 * @function variablesession
		 */
		variablesession:function(){
            fetch(`Private/Modulos/usuarios/procesos.php?proceso=verVariable&login=${this.ItValor}`).then(resp=>resp.json()).then(resp=>{
            	if(resp.msg=="regrese"){
					this.ItSession=0;
					console.log('nohay>',resp);
            	}else{
					this.ItSession=1;
					console.log("si hay>",resp);
            	}
			});
			this.cuentalogueada();
		},


		/**
		 * Verifica si hay session iniciada si lo hay agrega el producto a la lista de deseos del usuario logueado
		 * @access public
		 * @function addlista
		 * @param {Int} producto Representa el identificador del producto seleccionado
		 */
		addlista:function(producto){
			if(this.ItSession!=0){
				
				idproducto=producto.miproducto
				this.lista_deseox.id_miproducto=idproducto;
				fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=guardarlista&miproducto=${JSON.stringify(this.lista_deseox) }`).then(resp=>resp.json()).then(resp=>{
					alertify.success(resp.msg);	
				});
					
				
				
			}else{
				
				Swal.fire(
					'Ups...',
					'Debes Iniciar Sesión Para Usar Esta Opción',
					'warning'
				)
	
			}
		}	

	}
});




/**
 * @instance objeto de instancia de Vue.js
 */
var todoproducto= new Vue({
	el:'#todoproducto',
	data:{
		all:[],
		lista_deseo:{
			id_miproducto:'',
			id_usuario:'',
			accion:'nuevo'
		},
		session:''

		
	
	},
	created:function () {
		this.traer_todo();
		this.traersession();
		this.traercuenta();
	},
	methods:{

		/**
		 * Representa todos los productos mostrados despues del carousel
		 * @access public
		 * @function traer_todo
		 */
		traer_todo:function(){
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirall&miproducto=${JSON.stringify(this.all )}`).then( resp=>resp.json() ).then(resp=>{ 
				this.all = resp;		
			});
		},


		/**
		 * Guarda datos del producto en localStorage para su posterior llamada en otra pantalla
		 * @access public
		 * @function verdetalle
		 * @param {object} info - Representa los datos del producto
		 */
		verdetalle:function(info){
			var data={
				info
			};
			sessionStorage.setItem("data",JSON.stringify(data));
		},

		/**
		 * Verifica si hay una variable de session iniciada
		 * @access public
		 * @function traersession
		 */
		traersession:function(){
            fetch(`Private/Modulos/usuarios/procesos.php?proceso=verVariable&login=${this.valor}`).then(resp=>resp.json()).then(resp=>{
            	if(resp.msg=="regrese"){
					this.session=0;
					console.log(resp);
            	}else{
					this.session=1;
					console.log(resp);
            	}
            });
		},

		/**
		 * Verifica si hay session iniciada si lo hay trae la cuenta del usuario logueado
		 * @access public
		 * @function traercuenta
		 */
		traercuenta: function () {  
            fetch(`Private/Modulos/usuarios/procesos.php?proceso=traercuenta&login=${this.datoscuenta}`).then(resp=>resp.json()).then(resp=>{
    			if(this.session!=1){
					console.log('no hay session');
					
				}else{
					this.lista_deseo.id_usuario=resp[0].idusuario;

				}
            })
        },
		

		/**
		 * Guarda el item seleccionado en la lista de deseos del usuario logueado
		 * @access public
		 * @function addlista
		 * @param {object} producto - Representa la informacion de un producto seleccionado 
		 */
		addlista:function(producto){
			if(this.session==1){
				this.lista_deseo.id_miproducto=producto.miproducto;
				
				
				fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=guardarlista&miproducto=${JSON.stringify(this.lista_deseo) }`).then(resp=>resp.json()).then(resp=>{
					alertify.success(resp.msg);	
				});
			
			}else{
				Swal.fire(
					'Ups...',
					'Debes Iniciar Sesión Para Usar Esta Opción',
					'warning'
				)
			}
		}		  
	}
})