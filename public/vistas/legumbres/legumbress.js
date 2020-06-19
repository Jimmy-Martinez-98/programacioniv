/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file legumbress.js-> Sirve para mostrar todos los productos de categoria legumbres
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var seccionlegumbre = new Vue({
	el:'#legum',
	data:{
		legumbressss:[],
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
	methods:{

		/**
		 * Trae los productos legumbres
		 * @access public
		 * @function traerlegumbres
		 */
		traerlegumbres:function(){
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirlegumbres&miproducto=${JSON.stringify(this.legumbressss )}`).then( resp=>resp.json() ).then(resp=>{ 
			this.legumbressss=resp;		
			});	
		},


		/**
		 * Busca los productos en base a lo ingresado en el input
		 * @access public
		 * @function buscarL
		 */
		buscarL:function () {
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=buscarproductosL&miproducto=${this.valor}`).then(resp=>resp.json()).then(resp=>{
			this.legumbressss=resp;	
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
		addlistaL:function(producto){
			if(this.ItSession!=0){
				
				idproducto=producto.miproducto;
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
		},	

		/**
		 * Es cuando el input esta vacion ejecuta denuevo la funcion de traer los productos
		 * @access public
		 * @function autobusquda
		 */
		autobusquda:function(){
			if(this.valor==''){
				this.traerlegumbres();
			}
		},

		/**
		 * Guarda los datos de un item en localStorage para su posterior uso
		 * @access public
		 * @function verProd
		 * @param {object} info - Representa los datos de un item 
		 */
		verProd(info){
			var data={
				info
			}
			sessionStorage.setItem("data",JSON.stringify(data));
			location.href="productos.html"
		},


		/**
		 * Ordena los items de forma descendente en base al precio
		 * @access public
		 * @function descL
		 */
		descL:function () { 
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirbusquedatipoDESCL&miproducto=${JSON.stringify(this.legumbressss)}`).then(resp=>resp.json()).then(resp=>{		
				this.legumbressss=resp;			
			});
		},


		/**
		 * Ordena los items de forma ascendente en base al precio
		 * @access public
		 * @function ascL
		 */
		ascL:function () { 
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirbusquedatipoASCL&miproducto=${JSON.stringify(this.legumbressss)}`).then(resp=>resp.json()).then(resp=>{		
				this.legumbressss=resp;			
			});
		}
	},

	created:function(){
		this.traerlegumbres();
		this.variablesession();
	
	}



})