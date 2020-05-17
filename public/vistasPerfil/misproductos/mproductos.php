<?php
session_start();
?>
<form action="#" method="post" id="misprod">
	<link rel="stylesheet" href="public/vistasPerfil/historialCompras/historial.css">
	<div class="bg-white">
		<ul class="list-group" v-for="miprodc in myproductos":key="miprodc.misproductos">
			<li class="list-group-item"><div class="row">
				<div class="col-3">
					<div class="container">
					<img width="200" height="200" id="img-preview" v-bind:src="miprodc.imagen"  alt="Responsive image">
				</div>
				</div>
				
				<div class="col-8 mt-3">
					<h4>{{miprodc.nombre_producto}}</h4>
					 <input type="botton" v-on:click="deleteproducto(miprodc.miproducto)" class="btn btn-danger float-right"  value="eliminar Producto">
				<div class="col-8 mr-5">
				<P class="text-justify">{{miprodc.descprod}}	</P>
				</div>
				<div class="row mt-3">
						<div class="col-6  mt-5">
						<label class="float-left" for="#">Precio: ${{miprodc.precio_venta}}</label>
						</div>
						<div class="col-6 mt-5">
						<label class="float-right" for="#">Vendedor: {{miprodc.nombreu}}</label>
						</div>
					</div>
					
					
				</div>
			
			</div>
		</li>	
			
		  </ul>

	</div>
<script src="public/vistasPerfil/misproductos/misproductos.js"></script>
</form>