<?php 
/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file procesos.php-> Sirve para realizar los procesos en peticion desde JavaScript
 * @license MIT Libre disttribucion
 */
/**
 * Incluye implementacion de la configuracion de conexion a la Base de Datos
*/
include('../../Config/Config.php');
$miproducto = new miproducto($Conexion);

$proceso = '';
if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
/** @global $miproducto Se le asigna los datos  */
$miproducto->$proceso( $_GET['miproducto'] );
/** Se codifican los datos en formato json */
print_r(json_encode($miproducto->respuesta));


/**
 * @class miproducto
 */
class miproducto{
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
     * @function recibirDatos recibe los datos del producto desde el formulario
     * @param object  $miproducto representa los datos en si
     */
    public function recibirDatos($miproducto){
        $this->datos = json_decode($miproducto, true);
        $this->misprod();
    }



    /**
     * Trae todos los productos para mostrarlos en el carousel
     * @access private
     * @function misprod
     * @return respuesta
     */
    private function misprod(){
	    $this->db->consultas('
        SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta,misproducto.Libra,misproducto.Arroba,misproducto.Quintal,misproducto.Caja  from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario
		');
		return $this->respuesta = $this->db->obtener_datos();
    }



    /**
     *  recibe los datos del producto desde el formulario
     * @access public
     * @function recibirall
     * @param object $miproducto - Representa los datos en si
     */
    public function recibirall($miproducto){
        $this->datos = json_decode($miproducto, true);
        $this->allp();
        
    }

    /**
     * Trae todos los productos
     * @access private
     * @function allp
     * @return respuesta
     */
    private function allp(){
        $this->db->consultas('
            SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.miproducto,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta,misproducto.Libra,misproducto.Arroba,misproducto.Quintal,misproducto.Caja,misproducto.isagotado  from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario
        ');
		return $this->respuesta = $this->db->obtener_datos();
    }


    /**
     *  recibe los datos del producto desde el formulario
     * @access public
     * @function recibirverduras
     * @param object $miproducto - Representa los datos en si
    */
    public function recibirverduras($miproducto){
        $this->datos = json_decode($miproducto, true);
        $this->verduras();
    }

    /**
     * Trae los productos de categoria Verdura
     * @access private
     * @function verduras
     * @return respuesta
     */
    private function verduras(){
        $this->db->consultas('
        SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.miproducto,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta,misproducto.Libra,misproducto.Arroba,misproducto.Quintal,misproducto.Caja from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario AND misproducto.categoria like"Verduras"
        ');
        return $this->respuesta = $this->db->obtener_datos();
    }


        /**
         *  recibe los datos del producto desde el formulario
         * @access public
         * @function recibirfrutos
         * @param object $miproducto Representa los datos en si
        */
        public function recibirfrutos($miproducto){
            $this->datos = json_decode($miproducto, true);
            $this->frutos();
        }

        /**
         * Trae los productos de categoria frutos
         * @access private
         * @function frutos
         * @return respuesta
        */
        private function frutos(){
            $this->db->consultas('
                SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.miproducto,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario AND misproducto.categoria like"Frutos" 
            ');
            return $this->respuesta = $this->db->obtener_datos();
        }


        /**
         *  recibe los datos del producto desde el formulario
         * @access public
         * @function recibirlegumbres
         * @param object $miproducto -  Representa los datos en si
        */
        public function recibirlegumbres($miproducto){
                $this->datos = json_decode($miproducto, true);
                $this->legumbre();
        }


        /**
         * Trae los productos de categoria legumbres
         * @access private
         * @function frutos
         * @return respuesta
        */
        private function legumbre(){
            $this->db->consultas('
                SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.miproducto,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario AND misproducto.categoria like"Legumbres"
            ');
            return $this->respuesta = $this->db->obtener_datos();
        }



        /**
         * Busca los productos en la base de datos con el filtro que se envia desde el formulario
         * @access public
         * @function buscarproductoss
         * @param String valor Representa los datos enviados desde el formulario
         * @return respuesta
         */
        public function buscarproductoss($valor=''){
            $this->db->consultas("
                SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario AND (misproducto.categoria like 'Frutos' and misproducto.nombre_producto like '%$valor%')
            ");
            return $this->respuesta=$this->db->obtener_datos();
        }
        

        /**
         * Busca los productos en la base de datos con el filtro que se envia desde el formulario
         * @access public 
         * @function buscarproductosL
         * @param String valor Representa los datos enviados desde el formulario
         * @return respuesta
         */
        public function buscarproductosL($valor=''){
            $this->db->consultas("
                SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario AND (misproducto.categoria like 'Legumbres' and misproducto.nombre_producto like '%$valor%')
            ");
            return $this->respuesta=$this->db->obtener_datos();
        }


        /**
         * Busca los productos en la base de datos con el filtro que se envia desde el formulario
         * @access public 
         * @function buscarproductosV
         * @param String valor Representa los datos enviados desde el formulario
         * @return respuesta
         */
        public function buscarproductosV($valor=''){
            $this->db->consultas("
                SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.miproducto,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario AND (misproducto.categoria like 'Verduras' and misproducto.nombre_producto like '%$valor%')
            ");
            return $this->respuesta=$this->db->obtener_datos();
        }



        /**
         *  recibe los datos del producto desde el formulario
         * @access public
         * @function recibirbusquedatipo
         * @param object $miproducto Representa los datos en si
        */
        public function recibirbusquedatipo($miproducto){
                    $this->datos = json_decode($miproducto, true);
                    $this->buscarpreciodescV();
        }


        /**
         * Trae los productos de categoria verduras enlistados de forma descendente
         * @access private
         * @function buscarpreciodescV
         * @return respuesta
         */
        private function buscarpreciodescV(){
            if($this->respuesta['msg']==='correcto'){
                $this->db->consultas("SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario AND misproducto.categoria like 'Verduras' ORDER BY misproducto.precio_venta DESC");
                return $this->respuesta = $this->db->obtener_datos();
            }
        }

        /**
         *  Recibe los datos del producto desde el formulario
         * @access public
         * @function recibirbusquedatipovasc
         * @param object $miproducto Representa los datos en si
         */
        public function recibirbusquedatipovasc($miproducto){
            $this->datos = json_decode($miproducto, true);
                $this->buscarprecioascV();
        }


        /**
         * Trae los productos de categoria verduras enlistados de forma ascendente
         * @access private
         * @function buscarprecioascV
         * @return respuesta
         */
        private function buscarprecioascV(){
            if($this->respuesta['msg']==='correcto'){
                $this->db->consultas("SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario AND misproducto.categoria like 'Verduras' ORDER BY misproducto.precio_venta ASC");
                return $this->respuesta = $this->db->obtener_datos();
            }
        }


        /**
         *  Recibe los datos del producto desde el formulario
         * @access public
         * @function recibirbusquedatipovFdesc
         * @param object $miproducto Representa los datos en si
         */
        public function recibirbusquedatipovFdesc($miproducto){
            $this->datos = json_decode($miproducto, true);       
            $this->buscarpreciodescF();
        }



        /**
         * Trae productos de categoria Frutos y los enlista de forma descendente
         * @access private
         * @function buscarpreciodescF
         * @return respuesta
         */
        private function buscarpreciodescF(){
            $this->db->consultas("SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario AND misproducto.categoria like 'Frutos' ORDER BY misproducto.precio_venta DESC");
            return $this->respuesta = $this->db->obtener_datos();
        }


        
        /**
         *  Recibe los datos del producto desde el formulario
         * @access public
         * @function recibirbusquedatipovFdesc
         * @param object $miproducto Representa los datos en si
         */
        public function recibirbusquedatipovFasc($miproducto){
            $this->datos = json_decode($miproducto, true);
            $this->buscarprecioascF();
        }


        /**
         * Trae los productos de categoria Frutos y los enlista en formato ascendente
         * @access private
         * @function buscarpreciosascF
         * @return respuesta
         */
        private function buscarprecioascF(){
            $this->db->consultas("SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario AND misproducto.categoria like 'Frutos' ORDER BY misproducto.precio_venta ASC");
            return $this->respuesta = $this->db->obtener_datos();
        }



        /**
         *  Recibe los datos del producto desde el formulario
         * @access public
         * @function recibirbusquedatipoDESCL
         * @param object $miproducto Representa los datos en si
         */
        public function recibirbusquedatipoDESCL($miproducto){
            $this->datos = json_decode($miproducto, true);               
                $this->buscarpreciodescL();        
        }


        /**
         * Trae los productos de categoria Legumbres y los enlista en formato descendente
         * @access private
         * @function buscarpreciodescL
         * @return respuesta
         */   
        private function buscarpreciodescL(){
            $this->db->consultas("SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario AND misproducto.categoria like 'Legumbres' ORDER BY misproducto.precio_venta DESC");
            return $this->respuesta = $this->db->obtener_datos();
        }


        /**
         *  Recibe los datos del producto desde el formulario
         * @access public
         * @function recibirbusquedatipoASCL
         * @param object $miproducto Representa los datos en si
         */
        public function recibirbusquedatipoASCL($miproducto){
            $this->datos = json_decode($miproducto, true); 
            $this->buscarprecioascL();         
        }

        
        /**
         * Trae los productos de categoria Legumbres y los enlista en formato ascendente
         * @access private
         * @function buscarprecioascL
         * @return respuesta
         */ 
        private function buscarprecioascL(){
            $this->db->consultas("SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario AND misproducto.categoria like 'Legumbres' ORDER BY misproducto.precio_venta ASC");
            return $this->respuesta = $this->db->obtener_datos();
        }


        /**
         *  Recibe los datos del producto desde el formulario
         * @access public
         * @function guardarlista
         * @param object $miproducto Representa los datos en si
         */
        public function guardarlista($miproducto) {
            $this->datos = json_decode($miproducto, true);
            $this->validarlista();
        }


        /**
         * Valida si los datos enviados del formulario estan vacios
         * @access private
         * @function validarlista
         */
        private function validarlista(){
            if($this->datos['id_miproducto']===null||$this->datos['id_usuario']===null){
                $this->respuesta['msg']='Ha Ocurrido un Error Inesperado!';
            }
                $this->insertarlista();
        }


        /**
         * Guarda los datos en la Base de Datos
         * @access private
         * @function insertarlista
         */
        private function insertarlista(){
            if($this->respuesta['msg']==='correcto'){
                if($this->datos['accion']==='nuevo'){
                    $this->db->consultas('
                        INSERT INTO lista_deseos(id_miproducto,id_usuario) VALUES(
                                "'. $this->datos['id_miproducto'].'",
                                "'. $this->datos['id_usuario'].'"
                        )
                    ');
                    $this->respuesta['msg']='Producto Añadido a Lista de Deseos';
                }
            }
        }
}
?>


