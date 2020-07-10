<?php
session_start();

if (isset($_SESSION['usuario'])) {
    header("Location: index.html");
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="bootstrap-4.4.1-dist/css/bootstrap.css">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
	<link rel="stylesheet" href="public/vistas/login/login.css">
	<link href="https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap" rel="stylesheet">
	<title>Login</title>
</head>
<body>
	<div class="container">
		<form action=""  v-on:submit.prevent="inicioSesion"  id="frm-login" method="post">
		<div class="form-header border-bottom mb-5">
			<h1 class="form-title">LOGIN</h1>

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
				<a class="text enlace1" v-on:click="Recuperar" href="#">Olvido Contraseña?</a>
			</div>
			<div class="col-8 d-flex justify-content-end ">
				<p class="float-roght enlace2">Aun no tienes una cuenta? <a class="text" v-on:click="Registrate" href="#">Registrate Aquí</a></p>
			</div>
		</div>

		</div>

		</form>

	</div>


	<!-- Firebase -->
    <!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-database.js"></script>
<script src="public/js/configFirebase.js"></script>

<!-- jQuery -->
<script src="public/js/jquery-3.5.js"></script>

<!--  Boostrap -->
<script src="bootstrap-4.4.1-dist/js/bootstrap.js"></script>
<!-- JQueryUi -->
<script src="public/js/jquery-ui.js"></script>
<!-- Sweetalert2 -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
<!-- Vuejs -->
<script src="public/js/vue.min.js"></script>
<!-- mis scrips -->
<script src="public/vistas/login/login.js"></script>

</body>
</html>
