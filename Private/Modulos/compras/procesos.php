<?php
/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 */


/** Iniciar una nueva sesión o reanudar la existente */
session_start();
/**
 * Incluye implementacion de la configuracion de conexion a la Base de Datos
*/
include('../../Config/Config.php');
$mostrar = new mostrar($Conexion);

$proceso = '';

if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
/** @global $mostrar Se le asigna los datos */
$mostrar->$proceso( $_GET['mostrar'] );
print_r(json_encode($mostrar->respuesta));


/**
 * @class mostrar
 */
class mostrar{
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
     * @function recibirDatos Recibe los datos de las compras desde el formulario
     * @param object  $mostrar representa los datos en si
     */
    public function recibirDatos($mostrar){
		$this->datos = json_decode($mostrar, true);
		$this->mostrarprod();
	}

	/**
	 * Trae dichos datos desde la Base de Datos
	 * @access private
	 * @function mostrarprod
	 * @return respuesta Representa el resultado de la consulta
	 */
	private function mostrarprod(){
		$this->db->consultas('
			SELECT usuario.nombreu,productos.nombreproducto,productos.imagen,productos.descripcion,productos.precio,productos.tipoHortaliza FROM usuario JOIN productos WHERE usuario.idusuario= productos.usuariofk and usuario.idusuario="'. $_SESSION['usuario'].'"
		');
		return $this->respuesta = $this->db->obtener_datos();
	}
}
	
?>