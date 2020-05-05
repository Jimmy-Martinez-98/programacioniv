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
		console.log('sdf');
		
		$("#contenedorP").load("public/vistasPerfil/listadeseos/listadeseos.html",function(data){
		  $(this).html(data);
	   });
	
	});
	$('#POferta').click(()=>{
		console.log('sdf');
		
		$("#contenedorP").load("public/vistasPerfil/productosOferta/addoferta.html",function(data){
		  $(this).html(data);
	   });
	
	});
	$('#Configc').click(()=>{
		console.log('sdf');
		
		$("#contenedorP").load("public/vistasPerfil/configCuenta/configcuenta.html",function(data){
		  $(this).html(data);
	   });
	
	});


	cambiar_clase();
});




function cambiar_clase() {
	$('ul.activa li.activa a.activa:first').addClass('active');
	$('ul.activa li.activa a.activa').click(function (e) {
		$('ul.activa li.activa a.activa').removeClass('active');
		$(this).addClass('active');
	});
}

function toggle(){
	$("#togglesss").click(function(){
		console.log("click");
		
        $(".collapse").animate({
			height: 'toggle'
		  });
	  });
}