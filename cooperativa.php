<?php
  session_start();

  $varsesion= $_SESSION['usuario'];

error_reporting(0);
  if(!isset($varsesion)){
   echo 'usted no tiene acceso';
   header("Location:login.php");
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

  

  <nav id="navbarrr" class="navbar navbar-expand-lg navbars">
    <a class="navbar-brand"i  style="color: black;" href="index.html " > <img width="150px" height="60px" class="image" src="public/img/agroproducers.png" alt=""></a>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
    <li class="nav-item dropdown"> 
    <div class="dropdown ml-auto ">
     <a class="btn btn-lg  dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" data-hover="dropdown" aria-haspopup="true" aria-expanded="false">
    <img v-bind:src="perfil[0].imagen" class=" rounded-circle" width="30px" height="30px"> 
     {{perfil[0].nombreu}}
    </a>
   <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">  
   
            <a class="dropdown-item " href="public/vistas/bandeja/bandeja.html">Inbox <i class="fas fa-inbox"></i></a> 
           <a class="dropdown-item " href="cerrarsesion.php">Cerrar Sesión <i class="fas fa-sign-in-alt"></i></a>   
   </div>
    </div>
    </li>
    </ul>
  </nav>
<nav class="navbar navbar-expand-lg navbars  ui-btn-active  ui-state-persist" >
  
    <div  id="navbarNavAltMarkup ">
        <ul class="navbar-nav mr-auto uls " id="nav">
          <li class=" lis activa">
        <a class=" nav-link  " id="info" href="#" ><h5>Informacion de Perfil</h5> <span class="sr-only"></span></a>
      </li>
      <li class=" lis activa">
        <a class="nav-link  " id="addProductos" href="#"><h5> Añadir producto en venta </h5></a>
      </li>
      <li class=" lis activa">
        <a class="nav-link " id="listdeseos"  href="#"><h5> Lista de deseos </h5></a>
      </li>
      <li class="divicio  lis activa">
        <a class="nav-link  " id="POferta" href="#"><h5> Producto en oferta </h5></a>
      </li>
      <li class="divicio  lis activa">
        <a class="nav-link  " id="Configc" href="#"><h5>Configuración de Cuenta </h5></a>
      </li>
  
    </ul>
  
     
    </div>
  
  </div>  
  </nav>

  <section class="mt-1" id="contenedorP">

    </section>

    <script src="public/js/jquery-3.5.js"></script>
  <script src="public/js/jquery-ui.js"></script>
  <script src="bootstrap-4.4.1-dist/js/bootstrap.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
 <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
  <script src="public/vistas/perfiles/cooperativa.js"></script>


</body>
</html>