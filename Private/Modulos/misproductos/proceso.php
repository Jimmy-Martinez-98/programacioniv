<?php
/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file procesos.php-> Sirve para realizar los procesos en peticion desde JavaScript
 * @license MIT Libre disttribucion
 */

/** Iniciar una nueva sesión o reanudar la existente */
session_start();
/**
 *  Incluye implementacion de la configuracion de conexion a la Base de Datos
 */
include '../../Config/Config.php';
$miproducto = new miproducto($Conexion);

$proceso = '';
if (isset($_GET['proceso']) && strlen($_GET['proceso']) > 0) {
    $proceso = $_GET['proceso'];
}

/** @global $miproducto Se le asigna los datos  */
$miproducto->$proceso($_GET['miproducto']);
/** Se codifican los datos en formato json */
print_r(json_encode($miproducto->respuesta));

/**
 * @class miproducto
 */
class miproducto
{
    private $datos = array(), $db;
    public $respuesta = ['msg' => 'correcto'];

    /**
     * constructor
     * @access public
     * @function __construct
     * @param String $db contiene el nombre de la base de datos
     */
    public function __construct($db)
    {
        $this->db = $db;
    }

    /**
     * @access public
     * @function recibirDatos recibe los datos  desde el formulario
     * @param object  $miproducto representa los datos en si
     */
    public function recibirDatos($miproducto)
    {
        $this->datos = json_decode($miproducto, true);
        $this->misprod();
    }

    /**
     * Trae todos los productos que son del usuario que este logueado
     * @access private
     * @function misprod
     * @return respuesta
     */
    private function misprod()
    {
        $this->db->consultas('
            SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.* from usuario JOIN misproducto where usuario.idusuario= misproducto.fk_idusuario and usuario.idusuario="' . $_SESSION['usuario'] . '"
        ');
        return $this->respuesta = $this->db->obtener_datos();
    }

    /**
     * Trae todos los productos que el usuario que este logueado tiene en su lista de deseos
     * @access public
     * @function lista_deseos
     * @return respuesta
     */
    public function lista_deseos()
    {
        $this->db->consultas('
        SELECT lista_deseos.id_desos,misproducto.*,usuario.nombreu,usuario.nombrecooperativa from lista_deseos JOIN misproducto JOIN usuario WHERE lista_deseos.id_miproducto=misproducto.miproducto and usuario.idusuario=misproducto.fk_idusuario and lista_deseos.id_usuario="' . $_SESSION['usuario'] . '"
        ');
        return $this->respuesta = $this->db->obtener_datos();

    }

    /**
     * Elimina un item de la lista
     * @access public
     * @function DelItemList
     * @param Int $idproducto Representa el identificador del producto
     */
    public function DelItemList($idProducto)
    {
        $this->db->consultas('
            DELETE lista_deseos
            FROM   lista_deseos
            WHERE lista_deseos.id_desos="' . $idProducto . '"

        ');
        $this->respuesta['msg'] = 'Eliminado de la Lista';
    }

    /**
     * Trae las compras del usuario logueado
     * @access public
     * @function Mis_Compras
     * @return respuesta - Representa el resultado de la consulta
     */
    public function Mis_Compras()
    {
        $this->db->consultas('
            SELECT misproducto.imagen,misproducto.nombre_producto,misproducto.descprod,misproducto.precio_venta,usuario.nombreu,usuario.nombrecooperativa,mis_compras.*
            from misproducto JOIN mis_compras JOIN usuario
            where usuario.idusuario= misproducto.fk_idusuario and mis_compras.fk_miproducto=misproducto.miproducto
            and mis_compras.usuario="' . $_SESSION['usuario'] . '"
        ');
        return $this->respuesta = $this->db->obtener_datos();
    }
}
