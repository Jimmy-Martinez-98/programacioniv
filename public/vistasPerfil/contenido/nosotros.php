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
	<script src="bootstrap-4.4.1-dist/js/bootstrap.js"></script>
<script src="public/js/jquery-3.5.js"></script>

</head>
<body>
	<div class="container bg">
	<form action="#" method="post" id="frm-nosotros"v-for='sobre in about':key="sobre.idusuario" >
	
			<div class="col-12 d-flex justify-content-center" >		
			<img src="public/img/imgpeque.jpg" class="img-fluid max-width mt-2" alt="Responsive image">
			</div>
			<div class="col-12 d-flex justify-content-center mt-2">
				<h1><?php echo $_SESSION['usuario']?> </h1>
			</div>
			
				<div class="col-12 text-white  mt-2">
					<div class= "form-group">
						<h5 for="misionh5">Mision</h5>
						<p  >{{sobre.Mision}}  </p>
						
				</div>
			</div>
			<div class="col-12 text-white">
				<div class="form-group">
				<h5 for="visionh5" >Vision</h5>
				<p  >{{sobre.Vision}}</p>
			</div>
			</div>
			<div class="col-12 text-white">
				<div class="form-group">
					<h5 for="valoresh5">Valores</h5>
					<p  >{{sobre.Valores}} </p>
			</div>
			</div>
			<div class="col-12  text-white">
			  <div class="form-group">
				<h5 for="principiosh5">Principios</h5>
				<p  >{{sobre.Principios}} </p>
			  </div>
		</div>
		<div class="card-foote-fluid pb-2">
			<div class="container ">
				<div class="row">
				  
				  <div class="col-12">
					<a href="#modaleditar" type="button"v-on:click="editar(about)" id="modala" class="btn btn-primary btn-lg btn-block" data-toggle="modal">
						Modificar Sobre Nosotros
					  </a>
				  </div>
				</div>			
		  </div>	
		</div>
	</form>

</div>

<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="public/vistasPerfil/contenido/nosotrosmodal.js"></script>
<script src="public/vistasPerfil/contenido/nosotros.js"></script>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
</body>
</html>
<!-- Modal -->
<div class="modal fade" id="modaleditar" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
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
			<input type="text" class="form-control" v-model="abouts[0].Mision" id="misions" aria-describedby="emailHelp" placeholder="Ingrese Mision">
		
			</div>
			</div>
			<div class="col-12 text-dark">
			<div class="form-group">
			<label for="visionlabel">Vision</label>
			<input type="text" class="form-control" v-model="abouts[0].Vision" id="visions" placeholder="Ingrese Vision">
			</div>
			</div>
			<div class="col-12 text-dark">
			<div class="form-group">
				<label for="valoreslabel">Valores</label>
				<input type="text" class="form-control"  v-model="abouts[0].Valores" id="valoress" placeholder="Ingrese Valores">
			</div>
			</div>
			<div class="col-12  text-dark">
			<div class="form-group">
				<label for="principioslabel">Principios</label>
				<input type="text" class="form-control" v-model="abouts[0].Principios" id="principios" placeholder="Ingrese Principios">
			</div>
			</div>
			
			
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>