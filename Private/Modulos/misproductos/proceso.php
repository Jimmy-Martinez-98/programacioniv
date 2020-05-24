<?php 
session_start();
include('../../Config/Config.php');
$miproducto = new miproducto($Conexion);

$proceso = '';
if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
$miproducto->$proceso( $_GET['miproducto'] );
print_r(json_encode($miproducto->respuesta));

class miproducto{
    private $datos = array(), $db;
    public $respuesta = ['msg'=>'correcto'];
    
    public function __construct($db){
        $this->db=$db;
    }
    public function recibirDatos($miproducto){
        $this->datos = json_decode($miproducto, true);
       
        $this->misprod();
    }
  
    private function misprod(){
	  $this->db->consultas('
        SELECT usuario.idusuario,usuario.nombreu,misproducto.* from usuario JOIN misproducto where usuario.idusuario= misproducto.fk_idusuario and usuario.idusuario="'.$_SESSION['usuario'].'"
		   ');
		   return $this->respuesta = $this->db->obtener_datos();
      }
      


  
}
?>