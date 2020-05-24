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
        if(empty(trim($this->datos['fkusuario']))|| empty(trim($this->datos['mision'])) || empty(trim($this->datos['vision']))||empty(trim($this->datos['valores']))||empty(trim($this->datos['principios']))){
            $this->respuesta['msg']='Por Favor Rellene los Campos';
        }
        return   $this->actualizar(); 
    }


    private function actualizar(){
        if( $this->respuesta['msg']==='correcto' ){
            if( $this->datos['accion']==='modificar' ){
                $this->db->consultas('
                UPDATE informacionnosotros SET
                fk_idusuario      = "'. $this->datos['usuario']['id'] .'",
                Mision         = "'. $this->datos['mision'] .'",
                 Mision         = "'. $this->datos['mision'] .'",
            WHERE infoUsuario = "'. $this->datos['infousuario'] .'"
                ');
                $this->respuesta['msg'] = 'Datos Actualizados Exitosamente';
             } 
        }
    }
    public function traerusuario(){
        $this->db->consultas('
            select usuario.idusuario AS id, usuario.nombre AS label
            from usuario
        ');
        $usuarion = $this->db->obtener_data();
       
       
        return $this->respuesta = ['usuario'=>$usuarion ];//array de php en v7+
    }



    
    public function recibirinfo($nosotros){
        $this->datos = json_decode($nosotros, true);
        $this->mostrarinfo();
    }
    private function mostrarinfo(){
      $this->db->consultas('
      SELECT informacionnosotros.infoUsuario,informacionnosotros.fk_idusuario,usuario.nombreu,informacionnosotros.Mision,informacionnosotros.Vision,informacionnosotros.Valores,informacionnosotros.Principios from informacionnosotros JOIN usuario WHERE informacionnosotros.fk_idusuario=usuario.idusuario AND usuario.idusuario="'.$_SESSION['usuario'].'"
         ');
         return $this->respuesta = $this->db->obtener_datos();
    }
}
?>