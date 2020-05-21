<?php
session_start();
include('../../Config/Config.php');
$mostrar = new mostrar($Conexion);

$proceso = '';
if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
$mostrar->$proceso( $_GET['mostrar'] );
print_r(json_encode($mostrar->respuesta));
 
class mostrar{
    private $datos = array(), $db;
    public $respuesta = ['msg'=>'correcto'];
    
    public function __construct($db){
        $this->db=$db;
    }
    public function recibirDatos($mostrar){
		$this->datos = json_decode($mostrar, true);
		$this->mostrarprod();
	}

	private function mostrarprod(){
		$sql=  $this->db->consultas('
		SELECT usuario.nombreu,productos.nombreproducto,productos.imagen,productos.descripcion,productos.precio,productos.tipoHortaliza FROM usuario JOIN productos WHERE usuario.idusuario= productos.usuariofk and usuario.nombreu="'. $_SESSION['usuario'].'"
		   ');
		   return $this->respuesta = $this->db->obtener_datos();
	  }
}
	
?>