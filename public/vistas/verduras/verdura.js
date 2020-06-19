/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file verdura.js-> Sirve para el registro de usuario tipo vendedor
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var seccionverduras =new Vue({
	el:'#vegetales',
	data:{
		verdes:[],
		
		valor:''
	},
		created:function(){
			this.traer();
		},
	methods:{
		
		/**
		 * Trae los productos de categoria verduras
		 * @access public
		 * @function traer
		 */
			traer(){
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirverduras&miproducto=${JSON.stringify(this.verdes)}`).then(resp=>resp.json()).then(resp=>{
				this.verdes=resp;	
			
						
			});
		},


		/**
		 * es cuando el input de busqueda esta vacio llama la funcion que trae los productos
		 * @access public
		 * @function autobusquda
		 */
		autobusquda:function(){
			if(this.valor==''){
				this.traer();
			}
		},


		/**
		 * Es cuando el usuario busca un producto 
		 * @access public
		 * @function buscarV
		 */
		buscarV:function () {
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=buscarproductosV&miproducto=${this.valor}`).then(resp=>resp.json()).then(resp=>{	
				this.verdes=resp;	
            });
		},


		/**
		 * Guarda el item en localStorage temporalmente para su uso posterior
		 * @access public
		 * @function verProd
		 * @param {object} info - Representa la informacion del item seleccionado 
		 */
		verProd(info){
			var data={
				info
			}
			
			sessionStorage.setItem("data",JSON.stringify(data));
			location.href="productos.html"
		},


		/**
		 * Es cuando el usuario selecciona mostrar productos en forma descendente en base a precio
		 * @access public	
		 * @function descP
		 */
		descP:function () { 
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirbusquedatipo&miproducto=${JSON.stringify(this.verdes)}`).then(resp=>resp.json()).then(resp=>{		
				this.verdes=resp;	
			});
		},


		/**
		 * Es cuando el usuario selecciona mostrar productos en forma ascendente en base a precio
		 * @access public	
		 * @function ascP
		 */
		ascP:function () { 
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirbusquedatipovasc&miproducto=${JSON.stringify(this.verdes)}`).then(resp=>resp.json()).then(resp=>{		
				this.verdes=resp;	
			});
		}
	}
})