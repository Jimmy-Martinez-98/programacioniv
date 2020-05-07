<?php
session_start();
?>
<form action="#" method="post" id="misprod">
	<link rel="stylesheet" href="public/vistasPerfil/historialCompras/historial.css">
	<div class="bg-white">
		<ul class="list-group" v-for="miprodc in myproductos":key="miprodc.misproductos">
			<li class="list-group-item"><div class="row">
				<div class="col-4">
					<div class="container">
					<img src="https://publicdomainpictures.net/pictures/10000/velka/chile-verde-25761282883202B2qs.jpg" class="img-fluid max-width mt-2 mb-2" alt="Responsive image">
				</div>
				</div>
				
				<div class="col-8 mt-3">
					<h4>{{miprodc.nombreproducto}}</h4>
					 <input type="botton" class="btn bnt-danger float-right"  value="eliminar Producto">
				<div class="col-6">
				<P>{{miprodc.descripcion}}	</P>
				</div>
					<div class="row">
						<div class="col-6">
							<label class="float-left" for="#">{{miprodc.precio}}</label>
						</div>
						<div class="col-3">
							<label class="float-right" for="#">{{miprodc.nombreu}}</label>
							
						</div>
					</div>
					
				</div>
			
			</div>
		</li>	
			
		  </ul>

	</div>
<script src="public/vistasPerfil/misproductos/misproductos.js"></script>
</form>