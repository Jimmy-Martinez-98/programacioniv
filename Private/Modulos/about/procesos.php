<?php
session_start();
include('../../Config/Config.php');
$about = new about($Conexion);

$proceso = '';
if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
$about->$proceso( $_GET['about'] );
print_r(json_encode($about->respuesta));
 
class about{
    private $datos = array(), $db;
    public $respuesta = ['msg'=>'correcto'];
    
    public function __construct($db){
        $this->db=$db;
    }
    public function recibirDatos($about){
        $this->datos = json_decode($about, true);
        $this->validar_datos();
    }
    private function validar_datos(){
       
        if( empty($this->datos['imagen']) ){
            
            $this->respuesta['msg'] = 'error al cargar archivo';
        }
        $this->almacenar_about();

       
      
    }
    private function almacenar_about(){
        if( $this->respuesta['msg']==='correcto' ){
            if( $this->datos['accion']==='nuevo' ){
                $this->db->consultas('
                    INSERT INTO about (fk_usuario,imagenabout,) VALUES(
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
    
    public function recibirinfo($about){
        $this->datos = json_decode($about, true);
        $this->mostrarinfo();
    }
    private function mostrarinfo(){
      $sql=  $this->db->consultas('
      SELECT informacionnosotros.infoUsuario,informacionnosotros.fk_idusuario,usuario.nombreu,informacionnosotros.Mision,informacionnosotros.Vision,informacionnosotros.Valores,informacionnosotros.Principios from informacionnosotros JOIN usuario WHERE informacionnosotros.fk_idusuario=usuario.idusuario AND usuario.nombreu="'.$_SESSION['usuario'].'"
         ');
         return $this->respuesta = $this->db->obtener_datos();
    }
}
?>