<?php
  session_start();
  error_reporting(0);
  $varsesion=$_SESSION['usuario'];
  if(empty($varsesion)|| $varsesion==null){
   echo 'usted no tiene acceso';
   die();
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
  <link rel="stylesheet" href="bootstrap-4.4.1-dist/css/bootstrap.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
	<link rel="stylesheet" href="public/vistas/perfiles/cooperativa.css">
    <title>AgroMark</title>
</head>
<body  >

  

  <nav class="navbar navbar-expand-lg navbars">
    <a class="navbar-brand"i style="color: black;" href="index.html " > <img class="image" src="public/img/agromark.png" alt=""></a>
    <ul class="navbar-nav ml-auto uls">
      <li class=" lis">
        <a class="nav-link  text" id="perfil"  href="#">  <h6><?php echo   $_SESSION['usuario']; ?></h6></a>
      </li>
      <li class=" lis">
        <a class="nav-link  text" id="perfil"  href="cerrarsesion.php">  <h6>Cerrar Sesión</h6></a>
      </li>
    </ul>
 
  </nav>
<nav class="navbar navbar-expand-lg navbars  ui-btn-active  ui-state-persist" >
  <div class="container-fluid">
    <button class="navbar-toggler "id="togglesss" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="true" aria-label="Toggle navigation">
      <i class="fas fa-bars"></i>
    </button>
    <div class="collapse navbar-collapse " id="navbarNavAltMarkup ">
        <ul class="navbar-nav mr-auto uls activa" id="nav">
          <li class="nav-item lis activa">
        <a class="nav-item nav-link  text  activa" id="info" href="#" ><h6>Informacion de Perfil</h6> <span class="sr-only"></span></a>
      </li>
      <li class="nav-item lis activa">
        <a class="nav-link  text activa" id="addProductos" href="#"><h6> Añadir producto en venta </h6></a>
      </li>
      <li class="nav-item lis activa">
        <a class="nav-link text activa" id="listdeseos"  href="#"><h6> Lista de deseos </h6></a>
      </li>
      <li class="divicio  lis activa">
        <a class="nav-link text activa " id="POferta" href="#"><h6> Producto en oferta </h6></a>
      </li>
      <li class="divicio  lis activa">
        <a class="nav-link  text activa" id="Configc" href="#"><h6>Configuración de Cuenta </h6></a>
      </li>
    </ul>
  
     
    </div>
  </div>
  </nav>

  <section class="mt-1" id="contenedorP">

    </section>

    <script src="public/js/jquery-3.5.js"></script>
  <script src="public/js/jquery-ui.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
 
  <script src="public/vistas/perfiles/cooperativa.js"></script>
   <script src="https://unpkg.com/vue-select@3.0.0"></script> 

</body>
</html>