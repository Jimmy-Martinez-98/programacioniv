<?php
session_start();
include('../../config/config.php');
$producto = new producto_nuevo($Conexion);

$proceso = '';
if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
$producto->$proceso( $_GET['nuevoP'] );
print_r(json_encode($producto->respuesta));

class producto_nuevo {
	private $datos = array(), $db;
    public $respuesta = ['msg'=>"correcto"];
    
    public function __construct($db)
    {
        $this->db = $db;
    }

    public function recibirDatos($producto)
    {
        $this->datos = json_decode($producto, true);
        $this->validardatos();
       
	}
	private function validardatos(){
		if(empty(trim($this->datos['idusuario']))){
			$this->respuesta['msg']='Identificador Faltante';
		}else if(empty(trim($this->datos['nombre_producto'])) ||empty(trim($this->datos['precio'])) ||empty(trim($this->datos['precio_venta'])) ||empty(trim($this->datos['descprod'])) ||empty(trim($this->datos['existencias']))|| empty($this->datos['imagen']) ||empty(trim($this->datos['categoria']))||empty(trim($this->datos['fecha_subida']))||empty(trim($this->datos['precio_venta']))){
			$this->respuesta['msg']='Por Favor Complete Los Campos :)';
		}
	$this->guardar();
	}

	private function guardar(){
		if($this->respuesta['msg']==='correcto'){	
            if($this->datos['accion']==='nuevo'){	
                $this->db->consultas('
                INSERT INTO misproducto (miproducto,fk_idusuario,nombre_producto,precio,precio_venta,existencias,descprod,imagen,categoria,fecha_subida) VALUES(
					"'. $this->datos['miproducto'] .'",
                    "'. $this->datos['idusuario'] .'",
                    "'. $this->datos['nombre_producto'] .'",
                    "'. $this->datos['precio'] .'",
					"'. $this->datos['precio_venta'] .'",
					"'. $this->datos['existencias'] .'",
					"'. $this->datos['descprod'] .'",
					"'. $this->datos['imagen'] .'",
					"'. $this->datos['categoria'] .'",
                    "'. $this->datos['fecha_subida'] .'"
                    )
                ');
                $this->respuesta['msg']="Su Producto Fue Publicado Exitosamente";
               
			}else if($this->datos['accion']==='modificar'){
					$this->db->consultas('
						UPDATE  misproducto SET
						fk_idusuario     	= "'. $this->datos['idusuario'] .'",
						nombre_producto     =  "'. $this->datos['nombre_producto'] .'",
						precio				= "'. $this->datos['precio'] .'",
						precio_venta		= "'. $this->datos['precio_venta'] .'",
						existencias			= "'. $this->datos['existencias'] .'",
						descprod			= "'. $this->datos['descprod'] .'",
						imagen				= "'. $this->datos['imagen'] .'",
						categoria			= "'. $this->datos['categoria'] .'",
						fecha_subida		= "'. $this->datos['fecha_subida'] .'"
						 WHERE miproducto	= "'. $this->datos['miproducto'] .'"
						
					
					');
				return	$this->respuesta['msg']='Su Producto Ha Sido Actualizado';
			}
		}
		
	}

		public function deleteproducto($identificador=0){
			$this->db->consultas('
			DELETE misproducto
			FROM misproducto
			WHERE misproducto.miproducto="'.$identificador.'"
		');
		$this->respuesta['msg']='Su  Ha Sido Producto Eliminado';
		
		}


	public function traerproductos( $valor=''){
		$this->db->consultas('SELECT usuario.idusuario, misproducto.* FROM misproducto JOIN usuario on(usuario.idusuario=misproducto.fk_idusuario) where misproducto.categoria like "%'.$valor.'%" or misproducto.nombre_producto like "%'.$valor.'%" or misproducto.fecha_subida like "%'.$valor.'%" and usuario.nombreu="'.$_SESSION['usuario'].'"');
		return $this->respuesta=$this->db->obtener_datos();
	}

	public function traerid(){
		$this->db->consultas('SELECT usuario.idusuario from usuario where nombreu="'.$_SESSION['usuario'].'"');
		return  $this->respuesta = $this->db->obtener_datos();
	}

	private function oferta()
	{
		
	}

}

?>