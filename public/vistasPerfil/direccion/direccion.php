<?php
	session_start();

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="bootstrap-4.4.1-dist/css/bootstrap.css">
	<link rel="stylesheet" href="public/vistasPerfil/direccion/direcc.css">
</head>
<body>
	
<div class="container bg">

<form action="#" method="post" id="frm-direcciones">
		<div class="d-flex justify-content-center">
			<h1>
			Direcciones de: <?php echo $_SESSION['usuario']?>
			</h1>
		</div>
		<table class="table ">
  <thead class="thead-light">
    <tr>
     
      <th scope="col" class="d-flex justify-content-center"><h3>Direcciones</h3></th>
      <th scope="col"></th>
    
    </tr>
  </thead>
  <tbody>
    <tr v-for='direccion in direction'>
    
      <td>{{direccion.Direccion}}</td> 
	  <td> <input type="button"class='btn btn-danger' value="Eliminar" >   </td>   
    </tr>
  </tbody>
</table>
		
		<div class="row mb-3 mr-3 ml-3 mt-3">
		<div class="col-6 mb-3">
			<input type="button" class="btn btn-secondary btn-lg btn-block"data-toggle="modal"data-target="#nuevaD1"    value="Nueva Direccion" id="newdireccion">
		</div>
		<div class="col-6 mb-3">
			<input type="button" class="btn btn-secondary btn-lg btn-block" value="Modificar Direccion"  v-on:click="editardire(direction)"  data-toggle="modal" data-target="#moddirec" id="modificardireccion">
		</div>
	</div>

</form>

</div>
<script src="public/js/jquery-3.5.js"></script>
 <script src="bootstrap-4.4.1-dist/js/bootstrap.js"></script>
 <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>

<script src="public/vistasPerfil/direccion/guardar.js"></script>
 

</body>
</html>



<!-- Modal -->
<div class="modal fade" id="nuevaD1" tabindex="-1" role="dialog" aria-labelledby="nuevaD1" aria-hidden="true">
	<div class="modal-dialog" role="document">
	  <div class="modal-content">
		<div class="modal-header">
		  <h5 class="modal-title" id="nuevaD">Nueva Dirección</h5>
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
		<input type="submit"class="btn btn-primary" v-on:click="almacenar"  value="Guardar ">
		</div>
	  </div>
	</div>
  </div>








  <!-- Modal 2-->
<div class="modal fade" id="moddirec" tabindex="-1" role="dialog" aria-labelledby="moddirec" aria-hidden="true">
	<div class="modal-dialog" role="document">
	  <div class="modal-content">
		<div class="modal-header">
		  <h5 class="modal-title" id="moddirec">Modificacion Dirección</h5>
		  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		  </button>
		</div>
		<div class="modal-body">
			<div class="form-group" v-for="texto in modificarD" >
				<label for="exampleFormControlTextarea1">Modificar Dirección</label>
				<textarea class="form-control" require v-model="texto.Direccion" id="ndireccion" rows="3"></textarea>
			
			  </div>
		</div>
		<div class="modal-footer">
		  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
		  <button type="button" class="btn btn-primary" @click="actualizar">Guardar Dirección</button>
		</div>
	  </div>
	</div>
  </div>