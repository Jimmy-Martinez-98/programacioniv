<?php
session_start();
?>
<form action="#" method="post" id="misprod">
<link rel="stylesheet" href="public/vistas/blog/css/libs/animate.css">
	<link rel="stylesheet" href="public/vistasPerfil/misproductos/misproduc.css">
	
		<ul class="list-group wow fadeIn" v-for="mercancia in myproductos":key="mercancia.miproducto">
			<li class="list-group-item bg-white">
			<div class="badge badge-danger text-wrap position-absolute wow fadeIn" v-if="mercancia.isagotado==='SI'" style="width: 3.5rem; height:6rem">
						<img class="terni mt-2" src="public/img/x-circle.svg" width=30px heigth="30px">
					
						<br>
						<br>
						<br>
						<span class="text-white mt-5">Agotado</span>
					</div>
				<div class="form-row">
			
					<div class="col-md-4 m-auto">
						<img :src="mercancia.imagen" class="rounded" width="100%">
					</div>
					<div class="col-md-6 mt-2">
					
						<h2 class="mb-3 font-weight-bold "> {{mercancia.nombre_producto}}</h2>
						<p class="text-justify text-black-50 mb-3" >{{mercancia.descprod}}</p>

						<div class="mt-5">
						<span class="text-black-50 " >${{mercancia.precio_venta}}</span>
						<span class="text-black-50 ml-5" v-if="mercancia.nombrecooperativa!=''" >{{mercancia.nombrecooperativa}}</span>
						<span class="text-black-50 mr-auto" v-else >{{mercancia.nombreu}}</span>
						</div>
						
					</div>

					<div class="col-md-2  mb-2 mt-3">
						<button class="btn btn-outline-danger mb-5 mr-auto " @click.prevent="deleteproducto(mercancia.miproducto)"  >Eliminar</button>
						<button class="btn btn-outline-secondary mb-5   mr-auto"@click.prevent="agotado(mercancia.miproducto)" v-if="mercancia.isagotado==='NO'||mercancia.isagotado===''" >Agotado</button>
						<button class="btn btn-outline-primary mb-5  mr-auto"@click.prevent="habilitar(mercancia.miproducto)" v-else >Habilitar</button>
					</div>
					
				</div>
			</li>
		</ul>




<script src="public/vistasPerfil/misproductos/misproductos.js"></script>
<script src="public/vistas/blog/dist/wow.js"></script>
<script>
  var wow = new WOW(
    {
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       0,          // distance to the element when triggering the animation (default is 0)
    }
  );
  wow.init();
</script>
</form>