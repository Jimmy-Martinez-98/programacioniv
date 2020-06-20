<?php
/**
  * @author Michael Rodriguez <scottlovos503@gmail.com>
 */

/** @uses PHPMailer */
use PHPMailer\PHPMailer\PHPMailer;
/**  @uses Exception */
use PHPMailer\PHPMailer\Exception;
/**  @uses Exception.php */
require '../../phpMailer/Exception.php';
/** @uses PHPMailer.php */
require '../../phpMailer/PHPMailer.php';
/** @uses SMTP.php  */
require '../../phpMailer/SMTP.php';

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
     * @param object  $producto representa los datos en si
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

	/**
	  * @access public
     * @function recibirCompras recibe los datos del producto para su modificacion
     * @param object  $producto representa los datos en si
     */
	public function recibirCompras($producto){
		$this->datos = json_decode($producto, true);
        $this->validarCompra();
	}


	/**
	 * Valida si el dato enviado desde el formulario no esta vacio
	 * @access private
	 * @function validarCompra
	 */
	private function validarCompra(){
		if(empty($this->datos['select_Cantidad'])){
			$this->respuesta['msg']='Debe Seleccionar un Tipo de Cantidad!';
		
		}else{
			$this->guardarCompra();
		}
	}
	
	
	

	/**
	 * Inserta los datos en la Base de Datos
	 * @access private
	 * @function guardarCompra
	 */
	private function guardarCompra(){
		if($this->respuesta['msg']==='correcto'){
			$this->db->consultas('
				INSERT INTO mis_compras (id_compras,usuario,fk_miproducto,cantidad_compra,forma_compra) 
				Values(
					"'.$this->datos['idcompras'].'",
					"'.$this->datos['usuario'].'",
					"'.$this->datos['miproductofk'].'",
					"'.$this->datos['cantidad'].'",
					"'.$this->datos['select_Cantidad'].'"
					)
			
			');
			$this->respuesta['msg']='Compra Realizada!';
		}
	}

		/**
	  * @access public
     * @function recibirCorreo recibe los datos del producto para su modificacion
     * @param object  $producto representa los datos en si
     */
	public function recibirCorreo($producto){
		$this->datos = json_decode($producto, true);
        $this->validarcorreo();
	}


		/**
		 * Valida si los datos enviados desde el formulario no esten vacios
		 * @access private
		 * @function validarcorreo
		 */
	private function validarcorreo(){
		
		if(empty($this->datos['nombre'])||empty($this->datos['email'])){
			$this->respuesta['msg']='Complete los Campos';
		}else if(strpos(trim($this->datos['email']), '@') === false || strpos(trim($this->datos['email']), '.') === false){
			$this->respuesta['msg']='Correo no Valido';
		}
		$this->enviaremail($this->datos['nombre'],$this->datos['email']);
	}


		/**
		 * envia un mensaje al correo y nombre que se envio desde el formulario
		 * @access private
		 * @function eviaremail
		 */
	private function enviaremail($namedestino,$correo){
        $destino=$correo;
        $nombre=$namedestino;
		$facturacode= rand();
		
        $mail = new PHPMailer(true);

        try {
            //Server settings
            $mail->SMTPDebug = 0;                      // Enable verbose debug output
            $mail->isSMTP();                                            // Send using SMTP
            $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
            $mail->Username   = 'agroproducers2020@gmail.com';                     // SMTP username
            $mail->Password   = 'Slayer.2020';                               // SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
            $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
        
            //Recipients
            $mail->setFrom('agroproducers2020@gmail.com');
            $mail->addAddress($destino);     // Add a recipient

            // Content
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'Factura';
            $mail->Body    = '
                <h3>******************</h3><br>
                <h1> Hola '.$nombre.'</h1><br>
                <h3>*******************</h3><br>
        
				<h2> Gracias por comprar en Agro Producers!</h2> 
				<br>
					<h3>ID FACTURA: "'.$facturacode.'"</h3>
					<br>
					<span>(Guarda una copia de este recibo como referencia)</span>
				<br>
                <h3>Para realizar tu pago del producto solicitado favor depositarlo en una de nuestras cuentas bancarias</h3> 
				<p>"'.rand().'"</p> <br>
				<p>"'.rand().'"</p> <br>
				<p>"'.rand().'"</p>
            ';
        
            $mail->send();
            $this->respuesta['msg']= 'Mensaje Enviado';  
        } catch (Exception $e) {
            $this->respuesta['msg']= "    error: {$mail->ErrorInfo} ";
        } 
    }



}

?>