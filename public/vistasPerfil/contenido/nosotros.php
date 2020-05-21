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
	<div class="container bg" id="nosotrosdiv">
		<form action="#" method="post">
			<div v-for='sobre in nosotros' :key="sobre.infoUsuario">
				<div class="col-12 d-flex justify-content-center">
					<img src="public/img/imgpeque.jpg" class="img-fluid max-width mt-2" alt="Responsive image">
				</div>
				<div class="col-12 d-flex justify-content-center mt-2">
					<h1><?php echo $_SESSION['usuario'] ?> </h1>
				</div>

				<div class="col-12 text-white  mt-2 bg-light card mb-2">
					<div class="form-group">
						<h5 for="misionh5" class="d-flex justify-content-center">Mision</h5>
						<p class="text-justify">{{sobre.Mision}} </p>

					</div>
				</div>
				<div class="col-12 text-white bg-light card mb-2">
					<div class="form-group">
						<h5 for="visionh5" class="d-flex justify-content-center">Vision</h5>
						<p class="text-justify">{{sobre.Vision}}</p>
					</div>
				</div>
				<div class="col-12 text-white bg-light card mb-2">
					<div class="form-group">
						<h5 for="valoresh5" class="d-flex justify-content-center">Valores</h5>
						<p class="text-justify">{{sobre.Valores}} </p>
					</div>
				</div>
				<div class="col-12  text-white bg-light  card mb-2">
					<div class="form-group">
						<h5 for="principiosh5" class="d-flex justify-content-center">Principios</h5>

						<p class="text-justify">{{sobre.Principios}} </p>

					</div>
				</div>
				<div class="card-foote-fluid pb-2">
					<div class="container ">
						<div class="row">

							<div class="col-12">
								<input href="#modaleditar" v-on:click="editardatos(sobre)" type="button" id="modala" class="btn btn-primary btn-lg btn-block" data-toggle="modal" value="Modificar">
							</div>
						</div>
					</div>
				</div>
			</div>

		</form>

	</div>

	<script src="https://cdn.jsdelivr.net/npm/vue"></script>
	<script src="public/vistasPerfil/contenido/nosotros.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
</body>

</html>




<!-- Modal -->
<div class="modal fade" id="modaleditar" tabindex="-1" role="dialog" aria-labelledby="modaleditar" aria-hidden="true">
	<div class="modal-dialog modal-dialog-scrollable" role="document">
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
					<div class="form-group">
						<label for="misionlbl">Mision</label>
						<textarea class="form-control" id="mision" rows="3" v-model="sobreNosotros.Mision"></textarea>
					</div>
				</div>
				<div class="col-12 text-dark">
					<div class="form-group">
						<label for="visionlbl">Vision</label>
						<textarea class="form-control" id="vision" rows="3" v-model="sobreNosotros.Vision"></textarea>
					</div>
				</div>
				<div class="col-12 text-dark">
					<div class="form-group">
						<label for="valoreslbl">Valores</label>
						<textarea class="form-control" id="valores" rows="3" v-model="sobreNosotros.Valores"></textarea>
					</div>
				</div>
				<div class="col-12  text-dark">
					<div class="form-group">
						<label for="principioslbl">Principios</label>
						<textarea class="form-control" id="principios" rows="3" v-model="sobreNosotros.Principios"></textarea>
					</div>
				</div>


			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				<button v-on:click="guardar" type="button" class="btn btn-primary">Guardar Cambios</button>
			</div>
		</div>
	</div>
</div>