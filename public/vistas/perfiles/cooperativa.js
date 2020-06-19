
/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file cooperativa.js-> Sirve para la navegacion en el perfil
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var appcooperativa =new Vue({
	el:'#navbarrr',
	data:{
		perfil:[]
	},
	methods:{

		/**
		 * Trae la cuenta del usuario logueado
		 * @access public 
		 * @function traerdatosusuario
		 */
		traerdatosusuario:function(){  
			fetch(`Private/Modulos/usuarios/procesos.php?proceso=traercuenta&login=${JSON.stringify(this.perfil )}`).then( resp=>resp.json() ).then(resp=>{ 
				this.perfil = resp;	
			});	   	     
		}
	},
	created:function () {
		this.traerdatosusuario();
	}
});


/**
 * cuando la pagina este lista los eventos podran ser ejecutados
 */
$(document).ready(function () {
	/**
	 * ejecuta funcion de animacion
	 */
	toggle();

	/**
	 * carga formulario en el contenedor
	 * @event #info
	 * 
	 */
	$('#info').click(()=>{
		$("#contenedorP").load("public/vistasPerfil/infoperfil.html",function(data){
			$(this).html(data);
		});
	});


	/**
	 * carga formulario en el contenedor
	 * @event #info
	 * 
	 */
	$('#addProductos').click(()=>{
		$("#contenedorP").load("public/vistasPerfil/addproducto/addproducto.html",function(data){
			$(this).html(data);
		});
	});


	/**
	 * carga formulario en el contenedor
	 * @event #info
	 * 
	 */
	$('#listdeseos').click(()=>{	
		$("#contenedorP").load("public/vistasPerfil/listadeseos/listadeseos.html",function(data){
			$(this).html(data);
		});
	});


	/**
	 * carga formulario en el contenedor
	 * @event #info
	 * 
	 */
	$('#POferta').click(()=>{
		$("#contenedorP").load("public/vistasPerfil/productosOferta/addoferta.html",function(data){
			$(this).html(data);
		});
	});


	/**
	 * carga formulario en el contenedor
	 * @event #info
	 * 
	 */
	$('#Configc').click(()=>{
		$("#contenedorP").load("public/vistasPerfil/configCuenta/configcuenta.html",function(data){
			$(this).html(data);
		});
	
	});

	/**
	 * carga formulario en el contenedor
	 * @event #info
	 * 
	 */
	$('#modP').click(()=>{
		$("#contenedorP").load("public/vistasPerfil/editarpublicacion/editar.html",function(data){
			$(this).html(data);
		});
	
	});
});

/**
 * Animacion en la barra de navegacion responsive
 * @access public
 * @function toggle
 */
function toggle(){
	$("#colapsar").click(function(){
        $(".collapse").animate({
			height: 'toggle'
		});
	});
}



