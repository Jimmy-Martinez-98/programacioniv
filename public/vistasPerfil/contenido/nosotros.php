<?php
	session_start();

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="bootstrap-4.4.1-dist/css/bootstrap.css">
	<link rel="stylesheet" href="public/vistasPerfil/contenido/nosotros.css">
</head>
<body>
	<div class="container bg">
	<form action="#" method="post" id="frm-nosotros" >
	
			<div class="col-12 d-flex justify-content-center ">		
			<img src="public/img/imgpeque.jpg" class="img-fluid max-width mt-2" alt="Responsive image">
			</div>
			<div class="col-12 d-flex justify-content-center mt-2">
				<h1><?php echo $_SESSION['usuario']?> </h1>
			</div>
			
				<div class="col-12 text-white  mt-2">
					<div class= "form-group">
						<h5 for="misionh5">Mision</h5>
						<p v-for='aserca in about' >{{aserca.Mision}}  </p>
						
				</div>
			</div>
			<div class="col-12 text-white">
				<div class="form-group">
				<h5 for="visionh5" >Vision</h5>
				<p v-for="aserca in about"  >{{aserca.Vision}}</p>
			</div>
			</div>
			<div class="col-12 text-white">
				<div class="form-group">
					<h5 for="valoresh5">Valores</h5>
					<p v-for='aserca in about' >{{aserca.Valores}} </p>
			</div>
			</div>
			<div class="col-12  text-white">
			  <div class="form-group">
				<h5 for="principiosh5">Principios</h5>
				<p v-for='aserca in about' >{{aserca.Principios}} </p>
			  </div>
		</div>
		<div class="card-foote-fluid pb-2">
			<div class="container ">
				<div class="row">
				  
				  <div class="col-12">
					<button type="button" v-on:submit.prevent="actualizar(infoUsuario)" class="btn btn-primary btn-lg btn-block"   data-toggle="modal" data-target="#modalEdit" >
						Modificar Sobre Nosotros
					  </button>
				  </div>
				</div>			
		  </div>	
		</div>
	</form>
</div>
<script src="bootstrap-4.4.1-dist/js/bootstrap.js"></script>
<script src="public/js/jquery-3.5.js"></script>

<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="public/vistasPerfil/contenido/nosotros.js"></script>
<script src="public/vistasPerfil/contenido/nosotrosmodal.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
</body>
</html>
<!-- modalguardar -->
<div class="modal fade"  id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="modalinformacionTitle" aria-hidden="true">
	<link rel="stylesheet" href="public/vistasPerfil/contenido/nosotros.css">
	<div class="modal-dialog modal-dialog-scrollable" role="document">
	  <div class="modal-content">
		<div class="modal-header">
		  <h5 class="modal-title" id="modalinformacionTitle">Sobre Nosotros </h5>
		  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		  </button>
		</div>
		<div class="modal-body">	
				<div class="col-12 d-flex justify-content-center ">
					
				<img src="public/img/imgpeque.jpg" class="img-fluid max-width mt-2" alt="Responsive image">
					
				</div>
				
			<div class="col-12 text-dark mt-1">
			<div class= "form-group">
			<label for="misionlabel">Mision</label>
			<input type="text" class="form-control" v-model="about.Mision" id="mision" aria-describedby="emailHelp" placeholder="Ingrese Mision">
			</div>
			</div>
			<div class="col-12 text-dark">
			<div class="form-group">
			<label for="visionlabel">Vision</label>
			<input type="text" class="form-control" v-model="about.Vision" id="vision" placeholder="Ingrese Vision">
			</div>
			</div>
			<div class="col-12 text-dark">
			<div class="form-group">
				<label for="valoreslabel">Valores</label>
				<input type="text" class="form-control"  v-model="about.valores" id="valores" placeholder="Ingrese Valores">
			</div>
			</div>
			<div class="col-12  text-dark">
			<div class="form-group">
				<label for="principioslabel">Principios</label>
				<input type="text" class="form-control" v-model="about.Principios" id="principios" placeholder="Ingrese Principios">
			</div>
			</div>
			
			
			
			  
		</div>
		<div class="modal-footer">
		  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		  <button type="button" class="btn btn-primary " v-on:clck="guardar">Guardar Cambios</button>
		</div>
	  </div>
	</div>

  </div>