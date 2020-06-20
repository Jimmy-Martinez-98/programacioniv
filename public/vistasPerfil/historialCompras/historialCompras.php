<?php
	session_start();
?>
<form action="#" method="post" id="productoss">
	<link rel="stylesheet" href="public/vistasPerfil/historialCompras/historial.css">
	<ul class="list-group wow fadeIn" v-for="Mcompra in compras_M":key="Mcompra.id_compras">
			<li class="list-group-item bg-white"  >
				<div class="form-row">
					<div class="col-md-3 m-auto">
						<img :src="Mcompra.imagen" class="rounded" width="100%" height="50%"> 
					</div>
					<div class="col-md-8 mt-2">
					
						<h2 class="mb-3 font-weight-bold ml-3"> {{Mcompra.nombre_producto}}</h2>
						<p class="text-justify ml-3">{{Mcompra.descprod}}</p>

						<div class="mt-5">
						<span class="text-black-50 ml-3" >${{Mcompra.precio_venta}}</span>
						<span class="text-black-50 ml-5" v-if="Mcompra.nombrecooperativa!=''" >{{Mcompra.nombrecooperativa}}</span>
						<span class="text-black-50 mr-auto" v-else >{{Mcompra.nombreu}}</span> 
						<span class="ml-2 text-black-50">Compro:</span>
						<span class="badge badge-primary ml-1">{{Mcompra.forma_compra}}</span>
						</div>
						
					</div>

					<div class="col-md-1  mb-2 mt-3 ">
						<span>Cantidad:</span>
						<input type="text" class="form-control mb-3" disabled v-model="Mcompra.cantidad_compra" style="width:70px">
					</div>
				</div>
					
				</div>
			</li>
		</ul>


</form>
<script src="public/vistasPerfil/historialCompras/hcompras.js"></script>