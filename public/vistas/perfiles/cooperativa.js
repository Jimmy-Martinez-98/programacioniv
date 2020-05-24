var datosCuenta =new Vue({
	el:'#navbarrr',
	data:{
		perfil:[]
	},methods:{
		traerdatosusuario:function(){  
			
			fetch(`Private/Modulos/usuarios/procesos.php?proceso=traercuenta&login=${JSON.stringify(this.perfil )}`).then( resp=>resp.json() ).then(resp=>{ 
				this.perfil = resp;	
			
				
					   
			});	   	     
		 }

	},
	created:function () {
		this.traerdatosusuario();
	  }
})
$(document).ready(function () {
	toggle();

	$('#info').click(()=>{
		$("#contenedorP").load("public/vistasPerfil/infoperfil.html",function(data){
		  $(this).html(data);
	   });
	
	});

	$('#addProductos').click(()=>{
		
		
		$("#contenedorP").load("public/vistasPerfil/addproducto/addproducto.html",function(data){
		  $(this).html(data);
	   });
	
	});
	$('#listdeseos').click(()=>{
	
		
		$("#contenedorP").load("public/vistasPerfil/listadeseos/listadeseos.html",function(data){
		  $(this).html(data);
	   });
	
	});
	$('#POferta').click(()=>{
	
		
		$("#contenedorP").load("public/vistasPerfil/productosOferta/addoferta.html",function(data){
		  $(this).html(data);
	   });
	
	});
	$('#Configc').click(()=>{
	
		
		$("#contenedorP").load("public/vistasPerfil/configCuenta/configcuenta.html",function(data){
		  $(this).html(data);
	   });
	
	});

	cambiar_clase();


});




function cambiar_clase() {
	$('.activa .activa .activa:first').addClass('active');
	$('.activa .activa .activa').click(function (e) {
		$('.activa .activa .activa').removeClass('active');
		$(this).addClass('active');
	});
}

function toggle(){
	$("#togglesss").click(function(){
		
		
        $(".collapse").animate({
			height: 'toggle'
		  });
	  });
}



