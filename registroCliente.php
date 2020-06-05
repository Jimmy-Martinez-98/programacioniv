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
	<link rel="stylesheet" href="public/vistas/usuario/stilos.css">
	<title>Login</title>
</head>
<body>
	
	<div class="container">
		<form   v-on:submit.prevent="guardarusuario" class="needs-validation" id="frm-cliente" novalidate>
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="validationCustom01">Nombre</label>
      <input type="text" class="form-control" id="validationCustom01" v-model="usuario.nombrec" required>
      <div class="invalid-feedback bg-light">
        Por favor rellena el campo!
</div>
    </div>
    <div class="col-md-3 mb-3">
      <label for="validationCustom02">Teleofono</label>
      <input type="tel" class="form-control" placeholder="72727272" v-model="usuario.telefono" id="validationCustom02" pattern="[0-9]{8}" maxlength="8" minlength="8" v-model="usuario.telefono" required>
	  <div class="invalid-feedback bg-light">
        Por favor rellena el campo con formato correcto!
		</div>
	</div>
	<div class="col-md-3 mb-3">
      <label for="validationCustom05">Fecha Registro</label>
      <input type="date" class="form-control"  v-model="usuario.fecha" id="validationCustom05" required>
	  <div class="invalid-feedback bg-light">
        Por favor rellena el campo!
		</div>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="validationCustom03">Correo</label>
      <input type="text" class="form-control" id="validationCustom03" v-model="usuario.correo" required>
      <div class="invalid-feedback bg-light">
        Por favor rellena el campo con formato correcto!
		</div>
    </div>
    <div class="col-md-6 mb-3">
      <label for="validationCustom04">Contraseña</label>
      <input @keyup="alerta" type="password" class="form-control" minlength="8" maxlength="32" id="contra" v-model="usuario.pass" required>
      <div class="invalid-feedback bg-light"   >
        Por favor rellena el campo!
		</div>
		<div id="msgs" class="bg-light"></div>
    </div>
    
  </div>

  <button class="btn btn-primary btn-block" type="submit">Registrarme</button>
  <div class="row mt-3">
			  <div class="col ">
			<a class="text float-left " v-on:click="IniciarSesion" href="#">Iniciar Sesión</a>	
			  </div>	
			  <div class="col">
			  <a class="text float-right " v-on:click="registro" href="#">Registrarse Como Vendedor</a>	</div>
		

</div>
</form>
	</div>




	<script src="public/js/jquery-3.5.js"></script>
	<script src="bootstrap-4.4.1-dist/js/bootstrap.js"></script>
	<script src="public/js/jquery-ui.js"></script>
	<script src="public/js/vue.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
	 <script src="public/vistas/usuario/registrocliente.js"></script>
	
</body>
</html>