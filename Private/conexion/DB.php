<?php
/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 */

/**
 * @class conexion
 */
class Conexion{
    private $Conexion='', $result='';

    /**
     * realiza la conexion hacia la Base de Datos
     * @access public 
     * @function Conexion
     * @param String $server Representa el nombre del servidor
     * @param String $user Representa el usuario del servidor
     * @param String $pass Representa la contraseña del usuario
     * @param String $db Representa el nombre de la Base de Datos a la cual realizara conexion
     */
    public function Conexion($server, $user, $pass, $db="comercializacion"){
        $this->conexion = mysqli_connect($server,$user,$pass,$db) or die('NO pude conectarme al servidor de BD');
    }

    /**
     * Se encarga de realizar las consultas a la Base de Datos
     * @access public
     * @function consultas
     * @param String $sql Representa la consulta en si
     */
    public function consultas($sql=''){
        $this->result = mysqli_query($this->conexion,$sql) or die(mysqli_error($this->conexion));
    }

    /**
     * Obtiene los datos de las consultas en la Base de Datos
     * @access public 
     * @function obtener_datos
     */
    public function obtener_datos(){
        return $this->result->fetch_all(MYSQLI_ASSOC);
    }

    /**
     * contiene el resultado de la consulta
     * @access public
     * @function respuesta
     * @return result
     */
    public function respuesta(){
        return $this->result;
    }
}
?>