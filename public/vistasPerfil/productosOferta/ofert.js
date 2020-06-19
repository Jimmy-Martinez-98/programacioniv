/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file ofert.js-> Sirve para poner un producto en oferta
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var appofertas = new Vue({
el:"#frm-ofertas",
data:{
	productos:[]
},

created:function(){
	this.traerProductos();
},
methods:{
	/**
	 * Trae los productos del usuario
	 * @access public
	 * @function traerProductos
	 */
	traerProductos:function(){
		fetch(`Private/Modulos/misproductos/proceso.php?proceso=recibirDatos&miproducto=${JSON.stringify(this.productos)}`).then( resp=>resp.json() ).then(resp=>{ 
			this.productos = resp;	
		});
	},

	/**
	 * Obtiene la informacion del producto
	 * y la asigna a modaloferta.datosprod
	 * @access public
	 * @function modaloferta
	 * @param {object} id - Representa los datos en si 
	 */
	modoferta:function(id){
		modaloferta.datosprod=id;	
		
	}
}

})

/**
 *  @instance objeto de instancia de Vue.js
*/
var modaloferta=new Vue({
el:"#frmoferta",
data:{
	oferta:{
		idproducto:0,
		poferta:''
	},
	datosprod:{
		
	}
},methods:{
	guardaroferta:function(){
		fetch(`/Private/Modulos/publicarproducto/procesos.php`)
	}
}


})