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
    private function validar(){
        if(empty(trim($this->datos['Direccion']))){
            $this->respuesta['msg']='por favor ingrese la Dirección';      
        }else if (empty($this->datos['fkUsuario'])) {
            $this->respuesta['msg'] = 'Identificador Faltante';
        }
        $this->almacenar_direccion();
    }
   
    private function almacenar_direccion(){
        if( $this->respuesta['msg']==='correcto' ){
            if( $this->datos['accion']==='nuevo' ){
                $this->db->consultas('
                    INSERT INTO direcciones (idDireccion,fkUsuario,Direccion) VALUES(
                        "'. $this->datos['idDireccion'].'",
                        "'. $this->datos['fkUsuario'].'",
                        "'. $this->datos['Direccion'] .'") 
                    ');
                $this->respuesta['msg'] = 'Dirección Guardada Correctamente';
			}else  if($this->datos['accion']==='modificar'){
                $this->db->consultas('
                    UPDATE direcciones SET
                        Direccion     = "'. $this->datos['Direccion'] .'"
                    WHERE idDireccion = "'. $this->datos['idDireccion'] .'"
                ');
                return  $this->respuesta['msg'] = 'Dirección actualizada exitosamente';
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
    


    public function	recibirdireccionView($direccion){
        $this->datos = json_decode($direccion, true);
        $this->mostrardirecciones();
    }
    private function mostrardirecciones(){
        $this->db->consultas('SELECT direcciones.* from direcciones JOIN usuario where usuario.idusuario=direcciones.fkUsuario and usuario.idusuario="'.$_SESSION['usuario'].'" ');
        return  $this->respuesta = $this->db->obtener_datos();
   
    }
    
		
		
}


?>