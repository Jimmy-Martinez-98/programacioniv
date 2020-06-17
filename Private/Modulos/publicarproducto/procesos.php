<?php
/**
  * @author Michael Rodriguez <scottlovos503@gmail.com>
 */
/** Iniciar una nueva sesión o reanudar la existente */
session_start();

/**
 *  Incluye implementacion de la configuracion de conexion a la Base de Datos
 */
include('../../config/config.php');

$producto = new producto_nuevo($Conexion);

$proceso = '';

if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
/** @global $producto Se le asigna los datos  */
$producto->$proceso( $_GET['nuevoP'] );
/** Se codifican los datos en formato json */
print_r(json_encode($producto->respuesta));


/**
 * @class producto_nuevo
 */
class producto_nuevo {
	private $datos = array(), $db;
    public $respuesta = ['msg'=>"correcto"];
	
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
     * @function recibirDatos recibe los datos del producto desde el formulario
     * @param object  $login representa los datos en si
     */
    public function recibirDatos($producto)
    {
        $this->datos = json_decode($producto, true);
        $this->validardatos();
	}



	/**
     * valida los datos enviados desde el formulario  para evaluar si estan vacios
     * @access private
     * @function validardatos 
    */
	private function validardatos(){
		
		if(  empty(trim($this->datos['idusuario']))||empty($this->datos['libra']) && empty($this->datos['arroba']) && empty($this->datos['quintal']) &&  empty($this->datos['caja'])||empty(trim($this->datos['nombre_producto'])) ||empty(trim($this->datos['precio'])) ||empty(trim($this->datos['precio_venta'])) ||empty(trim($this->datos['descprod'])) ||empty(trim($this->datos['existencias']))|| empty($this->datos['imagen']) ||empty(trim($this->datos['categoria']))||empty(trim($this->datos['fecha_subida']))||empty(trim($this->datos['precio_venta']))||empty(trim($this->datos['codigo_producto'])) ){
			$this->respuesta['msg']='Por Favor Complete Los Campos :)';
		}else if(!is_numeric($this->datos['codigo_producto'])||!is_numeric($this->datos['precio'])||!is_numeric($this->datos['existencias'])||!is_numeric($this->datos['precio_venta'])){
			$this->respuesta['msg']='algunos campos solo admiten caracteres numericos o con punto decimal :)';
		}
		$this->guardar();
	}



	/**
	 * guarda datos en la Base de Datos
	 * @access private 
	 * @function guardar
	 */
	private function guardar(){
		if($this->respuesta['msg']==='correcto'){	
			
            if($this->datos['accion']==='nuevo'){	
                $this->db->consultas('
                INSERT INTO misproducto (miproducto,fk_idusuario,nombre_producto,precio,precio_venta,existencias,descprod,codigo_producto,imagen,categoria,Libra,Arroba,Quintal,Caja,fecha_subida,isagotado) VALUES(
					"'. $this->datos['miproducto'] .'",
                    "'. $this->datos['idusuario'] .'",
                    "'. $this->datos['nombre_producto'] .'",
                    "'. $this->datos['precio'] .'",
					"'. $this->datos['precio_venta'] .'",
					"'. $this->datos['existencias'] .'",
					"'. $this->datos['descprod'] .'",
					"'. $this->datos['codigo_producto'] .'",
					"'. $this->datos['imagen'] .'",
					"'. $this->datos['categoria'] .'",
					"'. $this->datos['libra'] .'",
					"'. $this->datos['arroba'] .'",
					"'. $this->datos['quintal'] .'",
					"'. $this->datos['caja'] .'",
					"'. $this->datos['fecha_subida'] .'",
								"NO"
                    )
                ');
                $this->respuesta['msg']="Su Producto Fue Publicado Exitosamente";
			} 
			
		}
		
	}




	/**
	  * @access public
     * @function recibirDatosmod recibe los datos del producto para su modificacion
     * @param object  $login representa los datos en si
     */
	public function recibirDatosmod($producto)
    {
        $this->datos = json_decode($producto, true);
        $this->validarmod();
	}


	/**
     * valida los datos enviados desde el formulario  para evaluar si estan vacios
     * @access private
     * @function validardatos 
     */
	private function validarmod(){
		if( empty(trim($this->datos['fk_idusuario']))||empty($this->datos['libra']) && empty($this->datos['Arroba']) && empty($this->datos['Quintal']) &&  empty($this->datos['Caja']) ||empty(trim($this->datos['nombre_producto'])) ||empty(trim($this->datos['precio'])) ||empty(trim($this->datos['descprod'])) ||empty(trim($this->datos['existencias']))|| empty($this->datos['imagen']) ||empty(trim($this->datos['categoria']))||empty(trim($this->datos['fecha_subida']))||empty(trim($this->datos['precio_venta']))||empty(trim($this->datos['codigo_producto'])) ){
			$this->respuesta['msg']='Por Favor Complete Los Campos :)';
		}else if(!is_numeric($this->datos['codigo_producto'])||!is_numeric($this->datos['precio'])||!is_numeric($this->datos['existencias'])||!is_numeric($this->datos['precio_venta'])){
			$this->respuesta['msg']='algunos campos solo admiten caracteres numericos o con punto decimal :)';
		}
	$this->modificarp();
	}




	/**
	 * guarda datos en la Base de Datos
	 * @access private 
	 * @function guardar
	 */
	private function modificarp(){
		if($this->respuesta['msg']==='correcto'){	
		
			$this->db->consultas('
				UPDATE  misproducto SET
				fk_idusuario     	= "'. $this->datos['fk_idusuario'] .'",
				nombre_producto     =  "'. $this->datos['nombre_producto'] .'",
				precio				= "'. $this->datos['precio'] .'",
				precio_venta		= "'. $this->datos['precio_venta'] .'",
				existencias			= "'. $this->datos['existencias'] .'",
				descprod			= "'. $this->datos['descprod'] .'",
				codigo_producto			= "'. $this->datos['codigo_producto'] .'",
				imagen				= "'. $this->datos['imagen'] .'",
				categoria			= "'. $this->datos['categoria'] .'",
				Libra				= "'. $this->datos['Libra'] .'",
				Arroba				= "'. $this->datos['Arroba'] .'",
				Quintal				= "'. $this->datos['Quintal'] .'",
				Caja				= "'. $this->datos['Caja'] .'",
				fecha_subida		= "'. $this->datos['fecha_subida'] .'"
				WHERE miproducto	= "'. $this->datos['miproducto'] .'"
				
			
			');
			return	$this->respuesta['msg']='Su Producto Ha Sido Actualizado';
		}
	}





	/**
	 * Elimina un registro de la Base de Datos
	 * @access public
	 * @function deleteproducto
	 * @param Int $identificador Representa el identificador del registro
	 */
	public function deleteproducto($identificador=0){
		if($identificador!=0){
			$this->db->consultas('
			DELETE misproducto
			FROM misproducto
			WHERE misproducto.miproducto="'.$identificador.'"
			');
			$this->respuesta['msg']='Su  Producto  Ha Sido Eliminado';
		}
		else{
			$this->respuesta['msg']='Ha Ocurrido Un Error Inesperado!';
		}
	}


	
	/**
	 * Marca un producto como agotado
	 * Actualiza un dato de la Base de datos para mostrar si esta agatado o no
	 * @access public
	 * @function agotado
	 * @param Int $idproducto Representa el identificador del registro
	 */
	public function agotado($idproducto=0){
		if($idproducto!=0){
			$this->db->consultas('
			UPDATE misproducto 
			SET isagotado = "SI"
			WHERE misproducto.miproducto= "'.$idproducto.'"
			');
			
			$this->respuesta['msg']='Producto Marcado En Agotado';
		}
		else{
			$this->respuesta['msg']='Ha Ocurrido Un Error Inesperado!';
		}
	}



	/**
	 * Habilita un producto
	 * Marca el registro en la Base de Datos como habilitado
	 * @access public
	 * @function habilitado
	 * @param Int $idproducto Representa el identificador de registro
	 */
	public function habilitado($idproducto=0){
		if($idproducto!=0){
			$this->db->consultas('
			UPDATE misproducto 
			SET isagotado = "NO"
			WHERE misproducto.miproducto= "'.$idproducto.'"
			');
		$this->respuesta['msg']='Producto  Habilitado';
		}else{
			$this->respuesta['msg']='Ha Ocurrido un Error Inesperado';
		}
	}




	/**
	 * Filtra los registros en base a lo que el usuario necesita
	 * @access public
	 * @function traerproductos
	 * @param String $valor Representa el dato ingresado por el usuario para filtrar los resultados
	 * 
	 */
	public function traerproductos( $valor=''){
		$this->db->consultas("SELECT  misproducto.* FROM misproducto where  misproducto.fk_idusuario=".$_SESSION['usuario']." and (misproducto.codigo_producto like '%$valor%' or misproducto.nombre_producto like '%$valor%' or misproducto.categoria like '%$valor%') "  );
		return $this->respuesta=$this->db->obtener_datos();
	}



	/**
	 * Consulta a la Base de datos por el identificador del usuario logueado
	 * @access public
	 * @function traerid
	 */
	public function traerid(){
		$this->db->consultas('SELECT usuario.idusuario from usuario where usuario.idusuario="'.$_SESSION['usuario'].'"');
		return  $this->respuesta = $this->db->obtener_datos();
	}



}

?>