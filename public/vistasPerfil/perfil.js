$(document).ready(function () {
	$('#nosotros').click(()=>{
		$('.contenidoP').load("public/vistasPerfil/contenido/nosotros.php", function (data) {
		$(this).html(data);;
			
		});
	});
	$('#direccion').click(()=>{
		$('.contenidoP').load("public/vistasPerfil/direccion/direccion.html", function (data) {
		$(this).html(data);
			
		});
	});

	$('#historial').click(()=>{
		$('.contenidoP').load("public/vistasPerfil/historialCompras/historialCompras.html", function (data) {
		$(this).html(data);
			
		});
	});
	$('#productos').click(()=>{
		$('.contenidoP').load("public/vistasPerfil/misproductos/mproductos.html", function (data) {
		$(this).html(data);
			
		});
	});
	
});