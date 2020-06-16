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
            SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.* from usuario JOIN misproducto where usuario.idusuario= misproducto.fk_idusuario and usuario.idusuario="'.$_SESSION['usuario'].'"
            ');
            return $this->respuesta = $this->db->obtener_datos();
    }

    public function lista_deseos(){
        $this->db->consultas('
        SELECT lista_deseos.id_miproducto,misproducto.*,usuario.nombreu,usuario.nombrecooperativa from lista_deseos JOIN misproducto JOIN usuario WHERE lista_deseos.id_miproducto=misproducto.miproducto and usuario.idusuario=misproducto.fk_idusuario and lista_deseos.id_usuario="'.$_SESSION['usuario'].'"
        ');
        return $this->respuesta=$this->db->obtener_datos();
    }

    public function DelItemList($idProducto){
        $this->db->consultas('
            DELETE lista_deseos 
            FROM   lista_deseos
            WHERE lista_deseos.id_miproducto="'.$idProducto.'"

        ');
        $this->respuesta['msg']='Eliminado de la Lista';
    }
}
?>