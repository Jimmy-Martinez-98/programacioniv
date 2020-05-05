<?php 
include('../../Config/Config.php');
$fotoP = new fotoP($Conexion);

$proceso = '';
if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
$fotoP->$proceso( $_GET['perfil'] );
print_r(json_encode($fotoP->respuesta));
 
class fotoP{
    private $datos = array(), $db;
    public $respuesta = ['msg'=>'correcto'];
    
    public function __construct($db){
        $this->db=$db;
    }
    public function recibirDatos($fotoP){
        $this->datos = json_decode($fotoP, true);
        $this->validar_datos();
    }
    private function validar_datos(){
       
        if( empty($this->datos['imagen']) ){
            
            $this->respuesta['msg'] = 'error al cargar archivo';
        }
        $this->almacenar_fotoP();

       
      
    }
    private function almacenar_fotoP(){
        if( $this->respuesta['msg']==='correcto' ){
            if( $this->datos['accion']==='nuevo' ){
                $this->db->consultas('
                    INSERT INTO fotoP (fk_usuario,imagenperfil,) VALUES(
                        "'. $this->datos['fk_idusuario']['id'] .'",
                        "'. $this->datos['nombreprod'] .'",
                        "'. $this->datos['precio'] .'",
                        "'. $this->datos[''] .'"
                    )
                ');
                $this->respuesta['msg'] = 'Registro insertado correctamente';
             } 
        }
    }
    validar

 
 
}
?>