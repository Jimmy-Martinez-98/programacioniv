<?php 

session_start();
include("../../Config/Config.php");
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
       $this->validar();
    }
    public function validar(){
        if(empty(trim($this->datos['Direccion']))){
            $this->respuesta['msg']='por favor ingrese la Dirección';      
        }else if (empty($this->datos['idusuario'])) {
            $this->respuesta['msg'] = 'Identificador Faltante';
        }
        $this->almacenar_direccion();
    }
    private function almacenar_direccion(){
        if( $this->respuesta['msg']==='correcto' ){
            if( $this->datos['accion']==='nuevo' ){
                $this->db->consultas('
                    INSERT INTO direcciones (idDireccion,fkUsuario,Direccion) VALUES(
                         "'. $this->datos['iddireccion'].'",
                        "'. $this->datos['idusuario'].'",
                        "'. $this->datos['Direccion'] .'") ');
				$this->respuesta['msg'] = 'Registro insertado correctamente';
			}else if($this->datos['accion']==='modificar'){
                $this->db->consultas('
                    UPDATE direcciones SET
                 fkUsuario     = "'. $this->datos['idusuario'] .'",
                 Direccion     = "'. $this->datos['Direccion'] .'"
                  WHERE idDireccion = "'. $this->datos['idDireccion'] .'"
                ');
                $this->respuesta['msg'] = 'Dirección actualizada exitosamente';
            }
         }
    }
    

 
    public function idlogueo($valor='')   {
        $this->db->consultas('SELECT usuario.idusuario from usuario where idusuario="'.$_SESSION['usuario'].'"');
      return  $this->respuesta = $this->db->obtener_datos();
    }

    public function deleteDireccion($idDireccion=0){
        $this->db->consultas('
        DELETE FROM direcciones WHERE direcciones.idDireccion ="'.$idDireccion.'" 
        ');
        return $this->respuesta['msg']='La dirección a sido eliminada';
    }
    


	public function recibirdireccion($direccion){
        $this->datos = json_decode($direccion, true);
        $this->mostrarinfo();
    }
    private function mostrarinfo(){
       $this->db->consultas('SELECT usuario.idusuario,direcciones.idDireccion,direcciones.fkUsuario,direcciones.Direccion from usuario JOIN direcciones where usuario.idusuario=direcciones.fkUsuario and usuario.idusuario="'.$_SESSION['usuario'].'" ');
         return $this->respuesta = $this->db->obtener_datos();
    }
		
		
}
			

?>