<?php
	session_start();
?>
<form action="#" method="post" id="productoss">
	<link rel="stylesheet" href="public/vistasPerfil/historialCompras/historial.css">
	<div class="bg-white">

		
		<ul class="list-group" v-for="miproducto in productos":key="miproducto.idproducto">
			<li class="list-group-item"><div class="row">
				<div class="col-4" >
					<div class="container">
					<img src="https://s1.eestatic.com/2019/09/26/como/Salud-Tomate-Verduras-Frutas-Supermercados-Como_hacer_432216867_134517478_1024x576.jpg" style="height:15rem ;" class="img-fluid mt-2 mb-2" alt="Responsive image">
				</div>
				</div>
				
				<div class="col-8 mt-3">
					<h4 >{{miproducto.nombreproducto}} </h4>
					 <input type="botton" class="btn bnt-danger float-right"  value="eliminar de la lista">
					<div class="col-8">
					<P class="text-justify" >{{miproducto.descripcion}}	</P>
					</div>
					<div class="card-footer">
					<div class="row">
						<div class="col-6">
							<label class="float-left" for="#" >{{miproducto.precio}}</label>
						</div>
						<div class="col-3">
							<label class="float-right" for="#" >{{miproducto.nombreu}} </label>
						</div>
					</div>
					</div>
					
				</div>
			
			</div>
		</li>
	</div>
<script src="public/vistasPerfil/historialCompras/hcompras.js"></script>

</form>