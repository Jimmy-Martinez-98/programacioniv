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
	<link rel="stylesheet" href="alertifyjs/css/alertify.css">
	<link rel="stylesheet" href="public/vistas/login/login.css">

	<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
	
	<title>Login</title>
</head>
<body>




		<form class="needs-validation"   v-on:submit.prevent="guardarusuario"  id="frm-usuarios" novalidate>
		<div class="form-header border-bottom mb-4">
			<h1 class="form-title">REGISTRO</h1>
			
		</div>

		<div class="form-row">
			<div class="col-md-6 mb-3">
			<label for="validationCustom01">Nombre</label>
			<input type="text" class="form-control" id="validationCustom01"  v-model="usuario.nombreu"   required>
			<div class="invalid-feedback bg-light  rounded  text-break text-center">
			Rellena este campo
			</div>
			<div class="valid-feedback bg-light  rounded  text-break text-center">
			ok!
			</div>
			</div>
	
				  <div class="col-md-6 mb-3">
						<label for="validationCustom04">Quien eres?</label>
						<select class="custom-select" v-model="usuario.selected" id="validationCustom04" required>
							<option selected disabled value="">Elige</option>		
							<option value="Cooperativa">Cooperativa</option>
							<option value="Productor Pequeño">Productor Pequeño</option>  
						</select>
						<div class="invalid-feedback bg-light  rounded  text-break text-center">
						Seleccione un elemento de esta lista
						</div>
						<div class="valid-feedback bg-light  rounded  text-break text-center">
							ok!
							</div>
				</div>
			
			<div class="col-md-6 mb-3" v-if="usuario.selected==='Cooperativa'">
			<label for="validationCustom01">Nombre Cooperativa</label>
			<input type="text" class="form-control" id="validationCustom01" v-model="usuario.nombrecooperativa" required>

			<div class="invalid-feedback bg-light  rounded  text-break text-center">
				Rellene este Campo
			</div>
			<div class="valid-feedback bg-light  rounded  text-break text-center">
							ok!
							</div>
			</div>


			<div class="col-md-6 mb-3" v-else >
			<label for="validationCustom01">Nombre Cooperativa</label>
			<input disabled type="text" class="form-control" id="validationCustom01" >
			</div>



			<div class="col-md-3 mb-3">
			<label for="validationCustom01">Telefono</label>
			
			<input type="tel"  pattern="[0-9]{8}" maxlength="8" minlength="8" required class="form-control"  v-model="usuario.telefono" >
			<div class="invalid-feedback bg-light  rounded  text-break text-centert">
			Rellena este campo
			</div>
			<div class="valid-feedback bg-light  rounded  text-break text-center">
							ok!
							</div>
			</div>
			<div class="col-md-3 mb-3">
			<label for="validationCustom01">Fecha Registro</label>
			<input type="date" class="form-control"  v-model="usuario.fecha" id="fecha" required>
			
			<div class="invalid-feedback bg-light  rounded  text-break text-center">
			Seleccione fecha de registro
			</div>
			<div class="valid-feedback bg-light  rounded  text-break text-center">
							ok!
							</div>
			</div>
		
			<div class="col-md-6 mb-3">
			<label for="validationCustom01">Correo Electronico</label>
			<input type="email" required class="form-control"  v-model="usuario.correo">
			
			<div class="invalid-feedback bg-light  rounded  text-break text-center">
			Rellena este campo
			</div>
			<div class="valid-feedback bg-light  rounded  text-break text-center">
							ok!
							</div>
			</div>

			<div class="col-md-6 mb-3">
			<label for="validationCustom01">Contraseña</label>
			<input v-on:keyup="alerta" id="contra" type="password"  minlength="8" required class="form-control"  v-model="usuario.pass" >
			
			<div class="invalid-feedback bg-light  rounded  text-break text-center">
			Rellena este campo
			</div>
			<div class="valid-feedback bg-light  rounded  text-break text-center">
							ok!
							</div>
			<div id="msgs" class="bg-light  rounded-bottom text-break text-center" >

			</div>
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
		
			
			</div>
			
		  </div>
		  <div>
		  <button type="submit" id="iniciarsesions" class="btn btn-primary btn-block">Registrarme</button>
		  
		  <div class="row mt-3">
			  <div class="col ">
			<a class="text float-left " v-on:click="IniciarSesion" href="#">Iniciar Sesión</a>	
			  </div>	
			  <div class="col">
			  <a class="text float-right " v-on:click="Rcliente" href="#">Registrarse Como Cliente</a>	</div>
		  </div>
		 
		</div>
		</form>
	

		  


		






		<script>
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
</script>

	

	<script src="public/js/jquery-3.5.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
	<script src="bootstrap-4.4.1-dist/js/bootstrap.js"></script>
	
	<script src="public/js/jquery-ui.js"></script>
	<script src="public/js/vue.min.js"></script>
	<script src="alertifyjs/alertify.js"></script>
	 <script src="public/vistas/usuario/usuario.js"></script>
	
</body>
</html>