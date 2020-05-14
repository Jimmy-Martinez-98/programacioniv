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
		}else if(empty(trim($this->datos['nombre'])) ||empty(trim($this->datos['Precio'])) ||empty(trim($this->datos['precioventa'])) ||empty(trim($this->datos['descripcion'])) ||empty(trim($this->datos['Existencias']))|| empty($this->datos['imagen']) ||empty(trim($this->datos['Categoria']))||empty(trim($this->datos['fechasubida']))||empty(trim($this->datos['precioventa']))){
			$this->respuesta['msg']='Por Favor Complete Los Campos :)';
		}
	$this->guardar();
	}

	private function guardar(){
		if($this->respuesta['msg']==='correcto'){	
            if($this->datos['accion']==='nuevo'){
				
				
                $this->db->consultas('
                INSERT INTO misproducto (miproducto,fk_idusuario,nombre_producto,precio,precio_venta,existencias,descprod,imagen,categoria,fecha_subida) VALUES(
					"'. $this->datos['idprod'] .'",
                    "'. $this->datos['idusuario'] .'",
                    "'. $this->datos['nombre'] .'",
                    "'. $this->datos['Precio'] .'",
					"'. $this->datos['precioventa'] .'",
					"'. $this->datos['Existencias'] .'",
					"'. $this->datos['descripcion'] .'",
					"'. $this->datos['imagen'] .'",
					"'. $this->datos['Categoria'] .'",
                    "'. $this->datos['fechasubida'] .'"
                    )
                ');
                $this->respuesta['msg']="Su Producto Fue Publicado Exitosamente";
               
			}
		}
		
	}

	public function traerid(){
		$this->db->consultas('SELECT usuario.idusuario from usuario where nombreu="'.$_SESSION['usuario'].'"');
		return  $this->respuesta = $this->db->obtener_datos();
	}



}

?>