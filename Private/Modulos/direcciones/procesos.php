<?php 

session_start();
include('../../Config/Config.php');
$direccion = new direccion($Conexion);

$proceso = '';
if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
$direccion->$proceso( $_GET['direction'] );
print_r(json_encode($direccion->respuesta));

class direccion{
    private $datos = array(), $db;
    public $respuesta = ['msg'=>'correcto'];
    
    public function __construct($db){
        $this->db=$db;
    }
    public function recibirDatos($direccion){
        $this->datos = json_decode($direccion, true);
        $this->almacenar_direccion();
    }
    private function almacenar_direccion(){
        if( $this->respuesta['msg']==='correcto' ){
            if( $this->datos['accion']==='nuevo' ){
                $this->db->consultas('
                    INSERT INTO direcciones (fkUsuario,Direccion) VALUES(
                        "'. $this->datos['usuario']['id'] .'",
                        "'. $this->datos['direccion'] .'"
                    )
                ');
				$this->respuesta['msg'] = 'Registro insertado correctamente';
			}
		}
    }
    
    public function traerusuario(){
        $this->db->consultas('
            SELECT usuario.id AS id
        ');
        $usuario = $this->db->obtener_datos();
        return $this->respuesta = ['usuario'=>$usuario ];//array de php en v7+
    }




	public function recibirdireccion($direccion){
        $this->datos = json_decode($direccion, true);
        $this->mostrarinfo();
    }
    private function mostrarinfo(){
      $sql=  $this->db->consultas('
      SELECT usuario.idusuario,usuario.nombreu,direcciones.* from usuario JOIN direcciones where usuario.idusuario=direcciones.fkUsuario and usuario.nombreu="'.$_SESSION['usuario'].'"
         ');
         return $this->respuesta = $this->db->obtener_datos();
    }
		
		
}
			

?>