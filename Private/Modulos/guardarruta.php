<?php
/**
 * Verifica si la variable esta definida
 */
if(isset($_FILES["archivo"])){
	$file=$_FILES["archivo"];
	$nombre=$file["name"];
	

	/** contiene la ruta donde se almacenara la imagen */
	$carpeta="misproductos/imagenes/";

		/** le asignara numeros ramdon al nombre para evitar coincidencias */
		$src=$carpeta.rand().$nombre;
		/** Devuelve el último componente de nombre de una ruta */
		$foto=$carpeta.basename($src);
	
	if(!move_uploaded_file( $_FILES['archivo']['tmp_name'],$foto)){
		echo "error";
	}
	else{
		echo $foto ;
	}
	
	
}


?>