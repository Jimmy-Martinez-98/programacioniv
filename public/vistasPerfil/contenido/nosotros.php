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
						<p v-for='nosotros in about'>{{nosotros.mision}}  </p>
				</div>
			</div>
			<div class="col-12 text-white">
				<div class="form-group">
				<h5 for="visionh5">Vision</h5>
				<p></p>
			</div>
			</div>
			<div class="col-12 text-white">
				<div class="form-group">
					<h5 for="valoresh5">Valores</h5>
					<p v-for='nosotros in about'>{{nosotros.valores}} </p>
			</div>
			</div>
			<div class="col-12  text-white">
			  <div class="form-group">
				<h5 for="principiosh5">Principios</h5>
				<p v-for='nosotros in about'>{{nosotros.principios}} </p>
			  </div>
		</div>
		<div class="card-foote-fluid pb-2">
			<div class="container ">
				<div class="row">
				  
				  <div class="col-12">
					<button type="button" class="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#exampleModalScrollable">
						Modificar Sobre Nosotros
					  </button>
				  </div>
				</div>
				
				
			  </div>
		
		
		</div>
		  
	
	

	</form>
</div>
<script src="public/js/jquery-3.5.js"></script>
<script src="bootstrap-4.4.1-dist/js/bootstrap.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
</body>
</html>

<!-- Modal -->
<div class="modal fade" id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
	<link rel="stylesheet" href="public/vistasPerfil/contenido/nosotros.css">
	<div class="modal-dialog modal-dialog-scrollable" role="document">
	  <div class="modal-content">
		<div class="modal-header">
		  <h5 class="modal-title" id="exampleModalScrollableTitle">Sobre Nosotros </h5>
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
			<input type="text" class="form-control" id="mision" aria-describedby="emailHelp" placeholder="Ingrese Mision">
			</div>
			</div>
			<div class="col-12 text-dark">
			<div class="form-group">
			<label for="visionlabel">Vision</label>
			<input type="text" class="form-control" id="vision" placeholder="Ingrese Vision">
			</div>
			</div>
			<div class="col-12 text-dark">
			<div class="form-group">
				<label for="valoreslabel">Valores</label>
				<input type="text" class="form-control" id="valores" placeholder="Ingrese Valores">
			</div>
			</div>
			<div class="col-12  text-dark">
			<div class="form-group">
				<label for="principioslabel">Principios</label>
				<input type="text" class="form-control" id="principios" placeholder="Ingrese Principios">
			</div>
			</div>
			<div class="card-footer"></div>
			
			
			  
		</div>
		<div class="modal-footer">
		  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		  <button type="button" class="btn btn-primary">Save changes</button>
		</div>
	  </div>
	</div>

  </div>