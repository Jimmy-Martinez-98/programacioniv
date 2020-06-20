/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file frutos.js-> Sirve para mostrar los productos de categoria frutos 
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 * 
 */
var seccionfrutas =new Vue({
	el:'#frutas',
	data:{
		fruta:[],
		valor:'',
		ItSession:0,
		ItValor:'',
		ItCuenta:'',
		lista_deseox:{
			id_miproducto:'',
			id_usuario:'',
			accion:'nuevo'
		}
	},
		created:function(){
			this.traer();
			this.variablesession();
			
		},
	methods:{

		/**
		 * Trae los productos categorizados en frutos
		 * @access public
		 * @function traer
		 */
		traer(){
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirfrutos&miproducto=${JSON.stringify(this.fruta)}`).then(resp=>resp.json()).then(resp=>{
				this.fruta=resp;	
			});
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
		 * Verifica si hay session iniciada si lo hay agrega el producto a la lista de deseos del usuario logueado
		 * @access public
		 * @function addlista
		 * @param {Int} producto Representa el identificador del producto seleccionado
		 */
		addlistaF:function(producto){
			if(this.ItSession!=0){
				
				idproducto=producto.miproducto;
				this.lista_deseox.id_miproducto=idproducto;
				
				
				fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=guardarlista&miproducto=${JSON.stringify(this.lista_deseox) }`).then(resp=>resp.json()).then(resp=>{
					var alerta = alertify.success(resp.msg);	
					alerta.delay(2);	
					alertify.set('notifier','position', 'top-right');
				});
					
				
				
			}else{
				
				Swal.fire(
					'Ups...',
					'Debes Iniciar Sesión Para Usar Esta Opción',
					'warning'
				)
	
			}
		},	


		/**
		 * Es cuando el input esta vacion ejecuta denuevo la funcion de traer los productos
		 * @access public
		 * @function autobusquda
		 */
		autobusquda:function(){
			if(this.valor==''){
				this.traer();
			}
		},

		/**
		 * Busca los productos en base a lo ingresado en el input
		 * @access public
		 * @function buscarF
		 */
		buscarF:function(){		
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=buscarproductoss&miproducto=${this.valor}`).then(resp=>resp.json()).then(resp=>{
				
				this.fruta=resp;	
            });

		},

		/**
		 * Sirve para mostrar la informacion de un producto
		 * @access public
		 * @function verProd
		 * @param {object} info - Representa los datos de un producto
		 */
		verProd(info){
			var data={
				info
			}
			sessionStorage.setItem("data",JSON.stringify(data));
			location.href="productos.html"
		} ,

		/**
		 * Muestra los productos en orden descendente en base al precio
		 * @access public
		 * @function descF
		 */
		descF:function () {
				
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirbusquedatipovFdesc&miproducto=${JSON.stringify(this.fruta)}`).then(resp=>resp.json()).then(resp=>{		
				this.fruta=resp;	
			});
		} ,

		/**
		 * Muestra los productos en orden ascendente en base al precio
		 * @access public
		 * @function ascF
		 */
		ascF:function () {
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirbusquedatipovFasc&miproducto=${JSON.stringify(this.fruta)}`).then(resp=>resp.json()).then(resp=>{		
				this.fruta=resp;	
			});
		} 
	}
})