<?php
	session_start();

	if(isset($_SESSION['usuario'])){
	 header("Location: cooperativa.php");
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="bootstrap-4.4.1-dist/css/bootstrap.css">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
	<link rel="stylesheet" href="public/vistas/login/login.css">
	<title>Login</title>
</head>
<body>
	<div class="container">
		<form action=""  v-on:submit.prevent="guardarusuario"  id="frm-usuarios" method="post">
		<div class="form-header">
		
			<h1 class="form-title">REGISTRO</h1>
			<hr>
		</div>
		<div class="row">
			<div class="col-6">
				<div class="input-group mb-3">
					<div class="input-group-prepend">
					  <span class="input-group-text" id="basic-addon1"><i class="fas fa-user"></i></span>
					</div>
					<input type="text" required class="form-control"  v-model="usuario.nombreu" placeholder="Nombre de Usuario" aria-label="usuario" aria-describedby="basic-addon1">
				  </div>
			</div>
			<div class="col-6">
				<div class="input-group mb-3">
					<div class="input-group-prepend">
						<label class="input-group-text" for="inputGroupSelect01">Opciones</label>
					  </div>
					<select class="custom-select" required v-model="usuario.selected" id="inputGroupSelect01">
					 <option value="" disabled required>Quien eres?</option>
					  <option value="Cooperativa">Cooperativa</option>
					  <option value="Productor Pequeño">Productor Pequeño</option>
					  
					</select>
				  </div>	 
			</div>
			<div class="col-6">
				<div class="input-group mb-3">
					<div class="input-group-prepend">
					  <span class="input-group-text" id="basic-addon1"><i class="fas fa-users"></i></span>
					</div>
					<input type="text"  id="cooperativa" class="form-control" disabled v-model="usuario.nombrecooperativa" placeholder="Nombre de Cooperativa" aria-label="cooperativa" aria-describedby="basic-addon1">
				  </div>
			</div>
			<div class="col-6">
				<div class="input-group mb-3">
					<div class="input-group-prepend">
					  <span class="input-group-text" id="basic-addon1"><i class="fas fa-mobile-alt"></i></span>
					</div>
					<input type="text"pattern="[0-9]{8}" maxlength="8" minlength="8" required class="form-control"  v-model="usuario.telefono" placeholder="Telefono" aria-label="telefono" aria-describedby="basic-addon1">
				  </div>
			</div>
			<div class="col-6">
				<div class="input-group mb-3">
					<div class="input-group-prepend">
					  <span class="input-group-text" id="basic-addon1"><i class="fas fa-address-book"> </i></span>
					</div>
					<input type="text" required class="form-control"  v-model="usuario.direccion" placeholder="Direccion" aria-label="direccion" aria-describedby="basic-addon1">
				  </div>
			</div>
			<div class="col-6">
				<div class="input-group mb-3">
					<div class="input-group-prepend">
					  <span class="input-group-text" id="basic-addon1"><i class="fas fa-at"></i></span>
					</div>
					<input type="email" required class="form-control"  v-model="usuario.correo" placeholder="Correo Electronico" aria-label="Correoelectronico" aria-describedby="basic-addon1">
				  </div>
			</div>
			<div class="col-6">
				<div class="input-group mb-3">
					<div class="input-group-prepend">
					  <span class="input-group-text" id="basic-addon1"><i class="fas fa-lock"></i></span>
					</div>
					<input type="password" minlength="8" required class="form-control"  v-model="usuario.pass" placeholder="Contraseña" aria-label="Correoelectronico" aria-describedby="basic-addon1">
					<label for="ss">caracteres minimos 8 combinacion de letras M,m  y caracteres especiales: ._-</label>
				  </div>
			</div>
			<div class="col-6">
				<input type="date" required v-model="usuario.fecha"  id="fecha">
			</div>
		</div>
		


		  
		  <button type="submit" id="iniciarsesions" class="btn btn-lg btn-block">Iniciar Sesión</button>
		  <div class="row mt-3">
			  <div class="col ">
			<a class="text float-right " v-on:click="IniciarSesion" href="#">Iniciar Sesión</a>	
			  </div>	
		  </div>
		 
		</div>
	
		</form>
		
	</div>

	

	<script src="public/js/jquery-3.5.js"></script>
	<script src="bootstrap-4.4.1-dist/js/bootstrap.js"></script>
	<script src="public/js/jquery-ui.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
   
	 <script src="public/vistas/usuario/usuario.js"></script>
	 <script src="https://unpkg.com/vue-select@3.0.0"></script> 
</body>
</html>