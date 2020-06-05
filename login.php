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
	<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
	<title>Login</title>
</head>
<body>
	<div class="container">
		<form action=""  v-on:submit.prevent="inicioSesion"  id="frm-login" method="post">
		<div class="form-header">
			<h1 class="form-title">LOGIN</h1>
			<hr>
		</div>
		<div class="input-group mb-3">
			<div class="input-group-prepend">
			  <span class="input-group-text" id="basic-addon1">@</span>
			</div>
			<input type="email" class="form-control" required  v-model="name.correo" placeholder="Correo Electronico" aria-label="Correoelectronico" aria-describedby="basic-addon1">
		  </div>
		  <div class="input-group mb-3">
			<div class="input-group-prepend">
			  <span class="input-group-text" id="basic-addon1"><i class="fas fa-lock"></i></span>
			</div>
			<input type="password" class="form-control" required v-model="name.pass" placeholder="Contraseña" aria-label="Contraseña" aria-describedby="basic-addon1">
		  </div>
		  <button type="submit" id="iniciarsesions" class="btn btn-primary btn-block">Iniciar Sesión</button>
		  <div class="row mt-3">
			  <div class="col-4 ">
				 <a class="text" v-on:click="Recuperar" href="#">Olvido Contraseña?</a>
			  </div>
			  <div class="col-8 ">
				<p class="float-roght">Aun no tienes una cuenta? <a class="text" v-on:click="Registrate" href="#">Registrate Aquí</a></p>	
			  </div>	
		  </div>
		 
		</div>
	
		</form>
		
	</div>

	

	<script src="public/js/jquery-3.5.js"></script>
	<script src="bootstrap-4.4.1-dist/js/bootstrap.js"></script>
	<script src="public/js/jquery-ui.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
	<script src="public/js/vue.min.js"></script>
	 <script src="public/vistas/login/login.js"></script>
	
</body>
</html>