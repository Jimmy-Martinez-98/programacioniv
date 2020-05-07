$(document).ready(function () {
	$('#nosotros').click(()=>{
		$('.contenidoP').load("public/vistasPerfil/contenido/nosotros.php", function (data) {
		$(this).html(data);;
			
		});
	});
	$('#direccion').click(()=>{
		$('.contenidoP').load("public/vistasPerfil/direccion/direccion.php", function (data) {
		$(this).html(data);
			
		});
	});

	$('#historial').click(()=>{
		$('.contenidoP').load("public/vistasPerfil/historialCompras/historialCompras.php", function (data) {
		$(this).html(data);
			
		});
	});
	$('#productos').click(()=>{
		$('.contenidoP').load("public/vistasPerfil/misproductos/mproductos.php", function (data) {
		$(this).html(data);
			
		});
	});
	
});