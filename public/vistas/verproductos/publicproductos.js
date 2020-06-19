/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file publicproductos.js-> Sirve para ver detalladamente el producto
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var mostrardetalle = new Vue({
	el:"#productovista",
	data:{
		detallesprod:[],
		productosrelacionados:[],
		contador:1,
		lista_deseo:{
			id_miproducto:'',
			id_usuario:'',
			accion:'nuevo'
		},
		session:'',
		valor:'',
		cuentalogueada:[]
		
	},
	created:function(){
		this.todo();
		this.traerproductos();
		this.traersession();
		this.traeridlogue();
		
	},
	methods:{
	

		/**
		 * Obtiene la informacion del item seleccinado en localStorage para mostrarlo 
		 * @access public 
		 * @function todo
		 * 
		 */
		todo:function(){
			var datafromstorage=JSON.parse(sessionStorage.getItem("data"));
			this.detallesprod=datafromstorage;	

			
		},
		

		/**
		 * Es cuando se le da clic al boton agregar a deseos.
		 * @access public
		 * @function addlista
		 * @param {object} producto - Reprecenta la informacion del item seleccionado
		 */
		addlista:function(producto){
			if(this.session==1){
				this.lista_deseo.id_miproducto=producto.info.miproducto;
				fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=guardarlista&miproducto=${JSON.stringify(this.lista_deseo) }`).then(resp=>resp.json()).then(resp=>{
					alertify.success(resp.msg);	
				});	
			}
			else{
				Swal.fire(
					'Ups...',
					'Debes Iniciar Sesión Para Usar Esta Opción',
					'warning'
				)
			}
		},


		/**
		 * Muestra productos Relacionados 
		 * @access public
		 * @function traerproductos
		 */
		traerproductos:function(){
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirDatos&miproducto=${JSON.stringify(this.productosrelacionados)}`).then(resp=>resp.json()).then(resp=>{
				this.productosrelacionados=resp;
			
			})
		},

		/**
		 * Es cuando le da click a  boton +
		 * @access public
		 * @function suma
		 */
		suma:function(){
			this.contador++
		},

		/**
		 * Es cuando le da click a boton -
		 * @access public
		 * @function resta
		 */
		resta:function(){
			if(this.contador===1){
				this.contador=1
			}else if(this.contador<=0){
				this.contador=1;
			}else{
				this.contador--
			}
		},

		/**
		 * Redirige al usuario a la pantalla de chat con usuario dueño de producto
		 * @access public
		 * @function contactar
		 */
		contactar:function(){
			location.href="public/vistas/chat/chat.html"
		},

		/**
		 * Verifica si hay variable session activa
		 * @access public
		 * @function traersession
		 */
		traersession:function(){
			fetch(`Private/Modulos/usuarios/procesos.php?proceso=verVariable&login=${this.valor}`).then(resp=>resp.json()).then(resp=>{
				if(resp.msg=="regrese"){
					this.session=0;
				}else{
					this.session=1;
				}
			})
		},


		/**
		 * Trae el identificador del usuario logueado
		 * @access public
		 * @function traeridlogue
		 */
		traeridlogue:function(){
			fetch(`Private/Modulos/usuarios/procesos.php?proceso=traercuenta&login=${this.cuentalogueada}`).then(resp=>resp.json()).then(resp=>{	
				this.lista_deseo.id_usuario=resp[0].idusuario;

			})
		}
	
	}
});

