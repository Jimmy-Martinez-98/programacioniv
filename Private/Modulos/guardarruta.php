<?php

if(isset($_FILES["archivo"])){
	$file=$_FILES["archivo"];
	$nombre=$file["name"];
	$tipo=$file["type"];

	$carpeta="../../imagenes/";

	
		$src=$carpeta.$nombre;
		$foto=$carpeta.basename($src);
	
	if(!move_uploaded_file( $_FILES['archivo']['tmp_name'],$foto)){
		echo "error";
	}
	else{
		echo "ok '$foto'";
	}
	
	
}


?>