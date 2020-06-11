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
   <link rel="stylesheet" href="alertifyjs/css/alertify.css">
   <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
    <title>Perfil</title>
</head>
<body  >

  

  <nav id="navbarrr" class="navbar navbar-expand-lg navbars">
  <a href="index.html" class="navbar navbar-brand">
     <img height="50" src="public/img/logo2,0.png" alt="">
    </a>
   
    <ul class="navbar-nav ml-auto">
    <li class="nav-item dropdown"> 
    <div class="dropdown ml-auto ">
     <a class="btn btn-lg  dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" data-hover="dropdown" aria-haspopup="true" aria-expanded="false">
    <img v-if="perfil[0].imagen!=''" v-bind:src="perfil[0].imagen" class=" rounded-circle" width="30px" height="30px"> 
    <img v-else src="public/img/avatars.gif" class=" rounded-circle" width="30px" height="30px"> 
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
  <nav class="navbar navbar-expand-lg navbar-light navbars">
 
  <button class="navbar-toggler mb-2" id="colapsar" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
  
  <ul class="navbar-nav mr-auto uls " id="nav">
          <li class=" lis activa">
        <a class=" nav-link  " id="info" href="#" > <h6>Informacion de Perfil</h6>  <span class="sr-only"></span></a>
      </li>
      <li class=" lis activa">
        <a class="nav-link  " id="addProductos" href="#">  <h6>Añadir producto en venta</h6>  </a>
      </li>
      <li class=" lis activa">
        <a class="nav-link " id="modP"  href="#"> <h6>Editar Publicaciones</h6>  </a>
      </li>
      <li class=" lis activa">
        <a class="nav-link " id="listdeseos"  href="#">  <h6>Lista de deseos</h6> </a>
      </li>
      <li class="divicio  lis activa">
        <a class="nav-link  " id="POferta" href="#"> <h6>Producto en oferta</h6>  </a>
      </li>
      <li class="divicio  lis activa">
        <a class="nav-link  " id="Configc" href="#"> <h6>Configuración de Cuenta</h6>  </a>
      </li>
  
    </ul>
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
 <script src="alertifyjs/alertify.js"></script>
  <script src="public/vistas/perfiles/cooperativa.js"></script>


</body>
</html>