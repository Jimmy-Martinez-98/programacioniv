<?php
include('../../config/config.php');
$producto = new producto($Conexion);

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
		}else if(empty(trim($this->datos['nombre']))||empty(trim($this->datos['imagen'])) ||empty(trim($this->datos['precio'])) ||empty(trim($this->datos['precioventa'])) ||empty(trim($this->datos['descprod'])) ||empty(trim($this->datos['imagen']))||empty(trim($this->datos['categoria']))||empty(trim($this->datos['fecha'])) ){
			$this->respuesta['msg']='Por Favor Complete Los Campos :)';
		}
		$this->guardar();
	}

	private function guardar(){
		if($this->respuesta['msg']==='correcto'){
            if($this->datos['accion']==='nuevo'){
                $this->db->consultas('
                INSERT INTO producto (idproducto,fk_idusuario,nombreprod,precio,precio_venta,descprod,imagen,categoria,fecha_subida) VALUES(
                    "'. $this->datos['idproductoo'] .'",
                    "'. $this->datos['idusuario'] .'",
                    "'. $this->datos['nombre'] .'",
                    "'. $this->datos['precio'] .'",
					"'. $this->datos['precioventa'] .'",
					"'. $this->datos['descprod'] .'",
					"'. $this->datos['imagen'] .'",
					"'. $this->datos['categoria'] .'",
                    "'. $this->datos['fecha'] .'"
                    )
                ');
                $this->respuesta['msg']="Su Producto Fue Publicado Exitosamente";
               
			}
		}
	}



}

?>