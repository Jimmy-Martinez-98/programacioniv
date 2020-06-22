<?php 

/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file procesos.php-> Sirve para realizar los procesos en peticion desde JavaScript
 * @license MIT Libre disttribucion
 */

/** Iniciar una nueva sesión o reanudar la existente */
session_start();

/**
 * Incluye implementacion de la configuracion de conexion a la Base de Datos
*/
include("../../Config/Config.php");
$direccion = new direccion($Conexion);

$proceso = '';
if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
/** @global $direccion Se le asigna los datos  */
$direccion->$proceso( $_GET['direction'] );
print_r(json_encode($direccion->respuesta));


/**
 * @class direccion
 */
class direccion{
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
     * @function recibirDatos recibe los datos de la direccion desde el formulario
     * @param object  $direccion representa los datos en si
     */
    public function recibirDatos($direccion){
        $this->datos = json_decode($direccion, true);
        $this->validar();
    }



    /**
     * Evalua si los datos recibidos desde el formulario no esten vacios
     * @access private
     * @function validar
     */
    private function validar(){
        if(empty(trim($this->datos['Direccion']))){
            $this->respuesta['msg']='por favor ingrese la Dirección';      
        }else if (empty($this->datos['fkUsuario'])) {
            $this->respuesta['msg'] = 'Identificador Faltante';
        }
        $this->almacenar_direccion();
    }


    /**
     * Inserta datos en la Base de datos
     * @access private
     * @function almacenar_direccion
     * @return respuesta
     */
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



    /**
     * Trae el identificador segun el del usuario logueado
     * @access public
     * @function idlogueo
     * @return respuesta retorna un menaje de exito
     */
    public function idlogueo($valor='')   {
        $this->db->consultas('SELECT usuario.idusuario from usuario where idusuario="'.$_SESSION['usuario'].'"');
        return  $this->respuesta = $this->db->obtener_datos();
    }



    /**
     * Elimina un registro e la Base de datos 
     * @access public
     * @function deleteDireccion
     * @return respuesta retorna un mensaje de exito
     */
    public function deleteDireccion($idDireccion=0){
        $this->db->consultas('
        DELETE FROM direcciones WHERE direcciones.idDireccion ="'.$idDireccion.'" 
        ');
        return $this->respuesta['msg']='La dirección a sido eliminada';
    }
    

    /**
	  * @access public
     * @function recibirDatos recibe los datos de la direccion desde el formulario
     * @param object  $direccion representa los datos en si
    */
    public function	recibirdireccionView($direccion){
        $this->datos = json_decode($direccion, true);
        $this->mostrardirecciones();
    }


    /**
     * Ejecuta una consulta para traer las direcciones que esten en base al dato que esta en la variable session
     * @access private
     * @function mostrardirecciones
     * @return respuesta retorna las direcciones
     */
    private function mostrardirecciones(){
        $this->db->consultas('SELECT direcciones.* from direcciones JOIN usuario where usuario.idusuario=direcciones.fkUsuario and usuario.idusuario="'.$_SESSION['usuario'].'" ');
        return  $this->respuesta = $this->db->obtener_datos();
    }
    
}


?>