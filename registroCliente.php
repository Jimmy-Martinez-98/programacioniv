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
	<link href="https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap" rel="stylesheet">
	<title>Login</title>
</head>
<body>
	
	
		<form   v-on:submit.prevent="guardarusuario" class="needs-validation  mb-3" id="frm-cliente" novalidate>
		
			
 	 <div class="form-row">
		  <div class="col-md-12 border-bottom mb-3">
		  <h1>REGISTRO CLIENTE</h1>
		  </div>
    <div class="col-md-6 mb-3">
      <label for="validationCustom01">Nombre</label>
      <input type="text" class="form-control" id="validationCustom01" v-model="usuario.nombrec" required>
      <div class="invalid-feedback bg-light rounded text-break text-center ">
        Por favor rellena el campo!
		</div>
    </div>
    <div class="col-md-3 mb-3">
      <label for="validationCustom02">Teleofono</label>
      <input type="tel" class="form-control"  v-model="usuario.telefono" id="validationCustom02" pattern="[0-9]{8}" maxlength="8" minlength="8" v-model="usuario.telefono" required>
	  <div class="invalid-feedback bg-light rounded  text-break text-center ">
        Por favor rellena el campo con formato correcto!
		</div>
	</div>
	<div class="col-md-3 mb-3">
      <label for="validationCustom05">Fecha Registro</label>
      <input type="date" class="form-control"  v-model="usuario.fecha" id="validationCustom05" required>
	  <div class="invalid-feedback bg-light rounded  text-break text-center ">
        Por favor rellena el campo!
		</div>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="validationCustom03">Correo</label>
      <input type="email" class="form-control" id="validationCustom03" v-model="usuario.correo" required>
      <div class="invalid-feedback bg-light rounded text-break text-center">
        Por favor rellena el campo con formato correcto!
		</div>
    </div>
    <div class="col-md-6 mb-3">
      <label for="validationCustom04">Contraseña</label>
      <input @keyup="alerta" type="password" class="form-control" minlength="8" maxlength="32" id="contra" v-model="usuario.pass" required>
      <div class="invalid-feedback bg-light rounded text-break text-center"   >
        Por favor rellena el campo!
		</div>
		<div id="msgs" class="bg-light"></div>
    </div>
	<div class="col-md-6">
			<svg  class="bi bi-info-circle mb-2" 
			data-toggle="popover"
			data-placement="top"
			 title="Requizitos para Contraseña"
			  data-content="minimo 8 caracteres, al menos un numero, al menos una minúscula, al menos una mayúscula  y caracteres especiales por ejemplo:  . _ -"
			
			
			width="2em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
			<path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/>
			<circle cx="8" cy="4.5" r="1"/>
			</svg>
		<br>
		<div class="form-check form-check-inline">
		<input class="form-check-input" v-model="valorcheck" type="checkbox" id="inlineCheckbox1" value="option1">
		<label class="form-check-label" for="inlineCheckbox1"> <a id="ter" target="_bank" href="public/vistas/terminos_condiciones/terminos.html">Política de Privacidad</a></label>
		</div>
	</div>			
</div>
  </div>

  <button class="btn btn-primary btn-block" type="submit">Registrarme</button>
  <div class="row mt-3">
			  <div class="col ">
			<a class="text float-left  textoo" v-on:click="IniciarSesion" href="#">Iniciar Sesión</a>	
			  </div>	
			  <div class="col">
			  <a class="text float-right  textoo" v-on:click="registro" href="#">Registrarse Como Vendedor</a>	</div>
		

</div>
</form>
	



	<script src="public/js/jquery-3.5.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
	
	<script src="public/js/jquery-ui.js"></script>
	<script src="bootstrap-4.4.1-dist/js/bootstrap.js"></script>
	<script src="public/js/vue.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
	 <script src="public/vistas/usuario/registrocliente.js"></script>
	
</body>
</html>