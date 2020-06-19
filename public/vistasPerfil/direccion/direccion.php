<?php
	session_start();

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="bootstrap-4.4.1-dist/css/bootstrap.css">
	<link rel="stylesheet" href="public/vistas/blog/css/libs/animate.css">
	<link rel="stylesheet" href="public/vistasPerfil/direccion/direcc.css">
</head>
<body>
	
<div class="container bg wow fadeIn">
	<form   id="frm-direcciones">
		<head> <h3 class="d-flex justify-content-center">Dirección</h3><hr></head>
		<div class="form-row d-flex justify-content-center mb-3  bg-light rounded">
			<div class="container d-flex justify-content-center  mt-3">
				<p class="text-justify"v-if="direction!=''">
					{{direction[0].Direccion}}
				</p>
				<p class="text-justify" v-else>
					Nada Por Aquí
				</p>
			</div>
		</div>

		<div class="container mb-3 py-3">
			<button type="button" v-if="direction==''"
			class="btn btn-primary btn-lg btn-block"  
			data-toggle="modal" data-target="#nuevaD1"
			>
				Nueva Dirección
			</button>
			<input type="button" v-else
				class="btn btn-secondary btn-lg btn-block"
				data-toggle='modal'
				data-target="#modalmodificar" 
				value="Modificar Drección"
				@click="editardire(direction)">
		</div>
		
		
	</form>
</div>
<script src="public/js/jquery-3.5.js"></script>
<script src="bootstrap-4.4.1-dist/js/bootstrap.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>

<script src="public/vistasPerfil/direccion/guardar.js"></script>
<script src="public/vistas/blog/dist/wow.js"></script>
<script>
  var wow = new WOW(
    {
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       0,          // distance to the element when triggering the animation (default is 0)
    }
  );
  wow.init();
</script>

</body>
</html>



<!-- Modal -->
<div class="modal fade"  id="nuevaD1" tabindex="-1" role="dialog" aria-labelledby="moddirec" aria-hidden="true">
	<div class="modal-dialog" role="document">
	  <div class="modal-content">
		<div class="modal-header">
		  <h5 class="modal-title" id="moddirec">Modificacion Dirección</h5>
		  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		  </button>
		</div>
		<div class="modal-body">
		<div class="form-group">
				<label for="exampleFormControlTextarea1">Nueva Dirección</label>
				<textarea class="form-control" v-model="Ndireccion.Direccion"  id="ndireccion" rows="3"></textarea>
			</div>

		</div>
		<div class="modal-footer">
		  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
		  <input type="submit"class="btn btn-primary" @click="almacenar"  value="Guardar ">
		</div>
	  </div>
	</div>
</div>







<!-- Modal -->
<div class="modal fade" id="modalmodificar" tabindex="-1" role="dialog" aria-labelledby="modalmodificarLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
		<div class="modal-header">
			<h5 class="modal-title" id="modalmodificarLabel">Modal title</h5>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true">&times;</span>
			</button>
		</div>
		<div class="modal-body">
			<div class="form-group"  >
				<label for="exampleFormControlTextarea1">Modificar Dirección</label>
				<textarea class="form-control" v-model.trim="modDirec.Direccion" id="ndireccion" rows="3"></textarea>
			</div>
			
		</div>
		<div class="modal-footer ">
			<button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cerrar</button>
			<button type="button" class="btn btn-primary" @click="actualizar" >Guardar Cambios</button>
		</div>
		</div>
	</div>
</div>