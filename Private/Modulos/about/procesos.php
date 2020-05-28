<?php
session_start();
include("../../Config/Config.php");
$nosotros = new nosotros($Conexion);

$proceso = '';
if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
$nosotros->$proceso( $_GET['nosotros'] );
print_r(json_encode($nosotros->respuesta));

class nosotros{
    private $datos = array(), $db;
    public $respuesta = ['msg'=>'correcto'];
    
    public function __construct($db){
        $this->db=$db;
    }
    public function recibirDatos($nosotros){
        $this->datos = json_decode($nosotros, true);
        $this->validar();
    }

    private function validar(){
        if(empty(trim($this->datos['usu']))||empty(trim($this->datos['descripcion']))||empty(trim($this->datos['imagenes']))){
            $this->respuesta['msg']='Por Favor Rellene los Campos';
        }
        return   $this->actualizar(); 
    }


    private function actualizar(){
        if( $this->respuesta['msg']==='correcto' ){
            if($this->datos['accion']==='nuevo'){
                $this->db->consultas('
                    INSERT INTO informacionnosotros(fk_idusuario,imagen,descripcion) VALUES(
                        "'. $this->datos['idusuario'].'",
                        "'. $this->datos['imagen'].'",
                        "'. $this->datos['describ'].'"
                    )
                ');
                $this->respuesta['msg'] = 'Tus datos se almacenaron exitosamente';
            } if( $this->datos['accion']==='modificar' ){
                $this->db->consultas('
                UPDATE informacionnosotros SET
                fk_idusuario      = "'. $this->datos['usu'].'",
                 imagen         = "'. $this->datos['imagenes'] .'",
                 descripcion         = "'. $this->datos['descripcion'] .'"
               WHERE infoUsuario  = "'. $this->datos['infousuario'] .'"
                ');
                $this->respuesta['msg'] = 'Datos Actualizados Exitosamente';
             } 
        }
    }

    public function recibirdesc($nosotros){
        $this->datos = json_decode($nosotros, true);
        $this->validar2();
    }

    private function validar2(){
        if(empty(trim($this->datos['idusuario']))||empty(trim($this->datos['describ']))||empty(trim($this->datos['imagen']))){
            $this->respuesta['msg']='Por Favor Rellene los Campos';
        }
        return   $this->guardar(); 
    }
    private function guardar(){
        if( $this->respuesta['msg']==='correcto' ){
            if($this->datos['accion']==='nuevo'){
                $this->db->consultas('
                    INSERT INTO informacionnosotros(fk_idusuario,imagen,descripcion) VALUES(
                        "'. $this->datos['idusuario'].'",
                        "'. $this->datos['imagen'].'",
                        "'. $this->datos['describ'].'"
                    )
                ');
                $this->respuesta['msg'] = 'Tus datos se almacenaron exitosamente';
            }
        }
    }








    public function recibirinfo($nosotros){
        $this->datos = json_decode($nosotros, true);
        $this->mostrarinfo();
    }
    private function mostrarinfo(){
      $this->db->consultas('
      SELECT informacionnosotros.descripcion,informacionnosotros.imagen FROM informacionnosotros where informacionnosotros.fk_idusuario="'.$_SESSION['usuario'].'"
         ');
         return $this->respuesta = $this->db->obtener_datos();
    }

    

    public function traeridinfo(){
        $this->db->consultas('
        select informacionnosotros.infoUsuario from informacionnosotros where informacionnosotros.fk_idusuario="'.$_SESSION['usuario'].'"
        ');
        $this->respuesta=$this->db->obtener_datos();
    }
}
?>