<?php
/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
*/

/** Iniciar una nueva sesión o reanudar la existente */
session_start();
/**
 * Incluye implementacion de la configuracion de conexion a la Base de Datos
*/
include("../../Config/Config.php");
$nosotros = new nosotros($Conexion);

$proceso = '';
if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
/** @global $nosotros Se le asigna los datos */
$nosotros->$proceso( $_GET['nosotros'] );
print_r(json_encode($nosotros->respuesta));


/**
 * @class nosotros
*/
class nosotros{
    private $datos = array(), $db;
    public $respuesta = ['msg'=>'correcto'];


    /**
     * constructor 
     * @access public
     * @function __construct
     * @param String $db contiene el nombre de la base de datos
    */
    public function __construct($db){
        $this->db=$db;
    }


    /**
	 * @access public
     * @function recibirDatos Recibe los datos sobre el usuario desde el formulario
     * @param object  $nosotros representa los datos en si
    */
    public function recibirDatos($nosotros){
        $this->datos = json_decode($nosotros, true);
        $this->validar();
    }


    /**
	 * Valida si los datos enviados desde el formulario no esten vacios
	 * @access private
	 * @function validar
	 * @return respuesta Representa el resultado de la validacion
	*/
    private function validar(){
        if(empty(trim($this->datos['descripcion']))||empty(trim($this->datos['imagen']))){
            $this->respuesta['msg']='Por Favor Rellene los Campos';
        }else if(empty(trim($this->datos['fk_idusuario']))){
            $this->respuesta['msg']='Ha Ocurrido un Error Inesperado';
        }
        return   $this->actualizar(); 
    }


    /**
     * Los datos enviados desde el formulario se evalua si es modificacion hace actualizacion en la Base de Datos
     * @access private
     * @function actualizar
     */
    private function actualizar(){
        if( $this->respuesta['msg']==='correcto' ){
            if( $this->datos['accion']==='modificar' ){
                $this->db->consultas('
                    UPDATE informacionnosotros SET
                        fk_idusuario      = "'. $this->datos['fk_idusuario'].'",
                        imagen         = "'. $this->datos['imagen'] .'",
                        descripcion         = "'. $this->datos['descripcion'] .'"
                    WHERE infoUsuario  = "'. $this->datos['infoUsuario'] .'"
                ');
                $this->respuesta['msg'] = 'Datos Actualizados Exitosamente';
            } 
        }
    }


    /**
	 * @access public
     * @function recibirdesc Recibe los datos sobre el usuario desde el formulario
     * @param object  $nosotros representa los datos en si
    */
    public function recibirdesc($nosotros){
        $this->datos = json_decode($nosotros, true);
        $this->validar2();
    }


    /**
	 * Valida si los datos enviados desde el formulario no esten vacios
	 * @access private
	 * @function validar2
	 * @return respuesta Representa el resultado de la validacion
	*/
    private function validar2(){
        if(empty(trim($this->datos['idusuario']))||empty(trim($this->datos['describ']))||empty(trim($this->datos['imagen']))){
            $this->respuesta['msg']='Por Favor Rellene los Campos';
        }
        return   $this->guardar(); 
    }


    /**
     *  Los datos enviados desde el formulario se evalua si es Nuevo hace incercion en la Base de Datos
     * @access private
     * @function guardar
     */
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


    /**
	 * @access public
     * @function recibirinfo Recibe los datos sobre el usuario desde el formulario
     * @param object  $nosotros representa los datos en si
    */
    public function recibirinfo($nosotros){
        $this->datos = json_decode($nosotros, true);
        $this->mostrarinfo();
    }


    /**
      * Hace una consulta en la Base de datos
	 * @access private
     * @function mostrarinfo 
     * @return respuesta Representa el resultado de la consulta
    */
    private function mostrarinfo(){
        $this->db->consultas('
            SELECT informacionnosotros.infoUsuario,informacionnosotros.descripcion,informacionnosotros.imagen FROM informacionnosotros where informacionnosotros.fk_idusuario="'.$_SESSION['usuario'].'"
        ');
        return $this->respuesta = $this->db->obtener_datos();
    }


    /**
     * Hace consulta hacia la Base de Datos en base al usuario logueado
     * @access public
     * @function traeridinfo
     */
    public function traeridinfo(){
        $this->db->consultas('
        select informacionnosotros.infoUsuario from informacionnosotros where informacionnosotros.fk_idusuario="'.$_SESSION['usuario'].'"
        ');
        $this->respuesta=$this->db->obtener_datos();
        if(!empty($this->respuesta)){
            $this->respuesta;
        }else{
            $this->respuesta['msg']='nada encontrado';
        }
    }


    /**
     * Recibe los datos desde el formulario
     * @access public
     * @function recibirhorario
     */
    public function recibirhorario($nosotros){
        $this->datos = json_decode($nosotros, true);
        $this->valiarhorario();
    }


    /**
     *Valida si los datos estan vacios
     *@access private
     *@function validarhorario 
     */
    private function valiarhorario(){
        if(empty(trim($this->datos['Dias']))||empty(trim($this->datos['Horas1']))){
            $this->respuesta['msg']='Debe Completar los campos';
        }
        if(empty(trim($this->datos['DE']))||empty(trim($this->datos['A']))){
            $this->respuesta['msg']='Debe Completar los campos';
        }
        if(empty(trim($this->datos['id_info']))){
            $this->respuesta['msg']='Debe Completar los campos';
        }
        $this->guardarNuevohorario();
    }


    /**
     * Inserta o acualiza datos en la Base de Datos
     * @access private
     * @function guardarNuevohorario
     */
    private function guardarNuevohorario(){
        if($this->respuesta['msg']==='correcto'){
            if($this->datos['accion']==='nuevo'){
                $this->db->consultas('
                INSERT INTO horarios(id_horario,id_info,Dias,Horas1,DE,A,HORA2)
                VALUES(
                    "'. $this->datos['id_horario'].'",
                    "'. $this->datos['id_info'].'",
                    "'. $this->datos['Dias'].'",
                    "'. $this->datos['Horas1'].'",
                    "'. $this->datos['DE'].'",
                    "'. $this->datos['A'].'",
                    "'. $this->datos['HORA2'].'"
                    )
                ');
                $this->respuesta['msg'] = 'Horario Guardado Correctamente';
            }else if($this->datos['accion']==='modificar'){
                $this->db->consultas('
                    UPDATE horarios
                    SET 
                        Dias    =    "'. $this->datos['Dias'].'",
                        Horas1  =   "' .$this->datos['Horas1'].'",
                        DE      =     "'. $this->datos['DE'].'",
                        A       =    "'. $this->datos['A'].'",
                        HORA2   =   "'. $this->datos['HORA2'].'"
                        WHERE id_horario = "'. $this->datos['id_horario'].'"
                    ;
                ');
                $this->respuesta['msg'] = 'Horario Actualizado Correctamente';
            }
        }
    }


    /**
     * Elimina un registro en la Base de Datos
     * @access public
     * @function eliminarhorario
     * @param Int $id_horario Representa el identificador que se necesitara para la eliminacion del registro
     * @return respuesta Representa el mensaje de exito al ejecutar la consulta
     */
    public function eliminarhorario($id_horario = 0){
        $this->db->consultas('
        DELETE horarios
        FROM horarios
        WHERE horarios.id_horario="'.$id_horario.'"
        ');
        return $this->respuesta['msg'] = 'Horario eliminado correctamente';
    }


    /**
     * Hace consulta a la Base de Datos para traer datos respectivos en base al usuario logueado
     * @access public
     * @function leer
     * @return respuesta Representa el resultado de la consulta
     */
    public function leer(){
        $this->db->consultas('
            SELECT horarios.id_horario, horarios.Dias,horarios.Horas1,horarios.DE,horarios.HORA2,horarios.A,horarios.id_info 
            from horarios JOIN informacionnosotros 
            WHERE horarios.id_info=informacionnosotros.infoUsuario 
            and informacionnosotros.fk_idusuario="'. $_SESSION['usuario'].'"
        ');
        return $this->respuesta=$this->db->obtener_datos();
    }
}
?>