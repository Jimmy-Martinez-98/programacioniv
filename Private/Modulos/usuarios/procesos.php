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
 * Incluye implementacion de la configuracion de conexion a la Base de Datos
 */
include('../../Config/Config.php');
$login = new login($Conexion);


$proceso = '';


if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
/** @global $login Se le asigna los datos  */
$login->$proceso( $_GET['login'] );
/** Se codifican los datos en formato json */
print_r(json_encode($login->respuesta));


/**
 * @class login
 */
class login{
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
     * @function recibirUsuario recibe los datos del usuario desde el formulario de LOGIN
     * @param object  $login representa los datos en si
     */
    public function recibirUsuario($login)
    {
        $this->datos = json_decode($login, true);
        $this->validarUsuario();
    }




    /**
     * valida los datos enviados desde el formulario de login para evaluar el inicio de sesion
     * @access private
     * @function validarUsuario 
     */
    private function validarUsuario()
    {
        if (empty($this->datos['correo']) || empty($this->datos['pass'])) {
            $this->respuesta['msg'] = 'Correo o contraseña invalido';
        } else {
            $correo = $this->datos['correo'];
            $contraseña = $this->datos['pass'];
            $consulta='select * from usuario where correo="' . $correo . '" and passwords="' . $contraseña . '" and usuario.activo=1 limit 1';

            $this->db->consultas($consulta);
            $this->respuesta['msg'] = $this->db->obtener_datos();
            $usuario = $this->respuesta['msg'];
            
            
            if (empty($this->respuesta['msg'])) {
                $this->respuesta['msg'] = 'Su Cuenta no a sido verificada o Credenciales incorrectas';
            } else {     
                $this->respuesta['msg'] = 'Bienvenido'; 
                foreach ($usuario as $user) {
                    $fila=$user;
                }  
                $_SESSION['usuario'] =$fila['idusuario'];
            }    
        }
    }



    /**
     * @function recibirregistro recibe los datos del formulario de registro vendedor
     * @access public
     * @param object $login representa los datos en si
     */
    public function recibirregistro($login)
    {
        $this->datos = json_decode($login, true);
        $this->validarRegistro();
    }
    



    /**
     *  Valida los datos enviados desde el formulario de registro vendedor
     * Cada dato que se envio desde el formulario se evalua para saber si esta vacio o no
     * @access private
     * @function validarRegistro
     */
    private function validarRegistro()
    {
        if($this->respuesta['msg']==='correcto'){
            $this->db->consultas('select * from usuario where correo="' . $this->datos['correo'] . '" limit 1');
            $this->respuesta = $this->db->obtener_datos();
            $valcorreo=$this->respuesta;
        if (empty(trim($this->datos['correo']))||empty(trim($this->datos['selected']))  || empty(trim($this->datos['pass']))||empty(trim($this->datos['nombreu']))||empty(trim($this->datos['telefono']))||empty(trim($this->datos['fecha']))) {
            $this->respuesta['msg'] = 'complete los campos vacios';
            }else if($this->datos['selected']!='Cooperativa'){
            $this->datos['nombrecooperativa']=='';
            }else if($valcorreo!=null){
                $this->respuesta['msg']='Este Correo ya Existe';
            }
            else{
            $this->almacenar_registro();
            }
        
        }
        
    }



    /**
     * Hace insercion a la Base de Datos
     * @access private
     * @function almacenar_registro
     */
    private function almacenar_registro(){
        $hash=mt_rand(1000,9999);

        if($this->respuesta['msg']==='correcto'){
    
            if($this->datos['accion']==='nuevo'){
                $this->db->consultas('
                INSERT INTO usuario (nombreu,nombrecooperativa,telefono,tipoUsuario,correo,passwords,activo,fechaR,hash) VALUES(
                    "'. $this->datos['nombreu'] .'",
                    "'. $this->datos['nombrecooperativa'] .'",
                    "'. $this->datos['telefono'] .'",
                    "'. $this->datos['selected'] .'",
                    "'. $this->datos['correo'] .'",
                    "'. $this->datos['pass'] .'",
                                "ceroo",
                    "'. $this->datos['fecha'] .'"
                    )
                '); 
                $this->respuesta['msg']="usuario registrado correctamente" ; 
            $this->enviaremailVendedor($this->datos['nombreu'],$this->datos['nombrecooperativa'],$this->datos['correo'],$hash);
            }
        }
        
    }





    /**
     * Envia un correo electronico 
     * Envia un correo a la direccion proporcionada por el usuario desde el formulario de registro vendedor
     * @access private
     * @function enviaremailVendedor
     * @param String $namedestino Representa el nombre del usuario al que se le enviara el mensaje
     * @param String $nombrecooperativa Representa el nombre de la cooperativa del usuario al que se le enviara.
     * @param String $correo Reprecenta la direccion a la que se le enviara el mensaje
     * @param int    $hash Representa el codigo que se le enviara en el mensaje para que verifique la cuenta
     */
    private function enviaremailVendedor($namedestino,$nombrecooperativa,$correo,$hash){
            $destino=$correo;
            $nombre=$namedestino;
            $altername=$nombrecooperativa;
            $code=$hash;
            $ruta="http://192.168.1.10/programacioniv/verify.html";

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
                if(!empty(trim($nombre))){
                    $mail->isHTML(true);                                  // Set email format to HTML
                    $mail->Subject = 'Verificacion de cuenta';
                    $mail->Body    = '<h3>-------------------</h3><br>
                        <h1> Hola '.$nombre.'</h1><br>
                        <h3>-------------------</h3><br>
                        <h3> Este es tu codigo para verificar tu cuenta   <br> <h1>'.$code.'.</h1></h3> <br>
                        <h3>Verificar tu dirección de correo electrónico mejora la seguridad de tu cuenta.</h3> 
                        <p>click aqui para verificar codigo</p>
                        <h4>'.$ruta.'</h4>    
                    ';
                
                    $mail->send();
                    $this->respuesta['msg']= 'mensaje enviado';  
                    
                    }
                    else{
                        $mail->isHTML(true);                                  // Set email format to HTML
                    $mail->Subject = 'Verificacion de cuenta';
                    $mail->Body    = '
                        <h3>-------------------</h3><br>
                        <h1> Hola '.$altername.'</h1><br>
                        <h3>-------------------</h3><br>

                        <h3> Este es tu codigo para verificar tu cuenta   <br> <h1>'.$code.'.</h1></h3> <br>
                        <h3>Verificar tu dirección de correo electrónico mejora la seguridad de tu cuenta.</h3> 
                        <p>click aqui para verificar codigo</p>
                        <h4>'.$ruta.'</h4>    
                    ';
                
                
                    $mail->send();
                    $this->respuesta['msg']= 'mensaje enviado';  
                }
            } catch (Exception $e) {
                $this->respuesta['msg']= "error: {$mail->ErrorInfo}";
              
            }
    }




    /**
     * Recibe los datos
     * Recibe los datos enviados desde formulario 
     * @access public
     * @param object $login Reprecenta los datos en si
     * 
     */
    public function recibircliente($login)
    {
        $this->datos = json_decode($login, true);
        $this->validarCliente();
    }


    /**
     * Valida los datos del cliente enviados desde el formulario registro cliente
     * @access private
     * @function validarCliente
     */
    private function validarCliente(){
        if($this->respuesta['msg']==='correcto'){
            $this->db->consultas('select * from usuario where correo="' . $this->datos['correo'] . '" limit 1');
            $this->respuesta = $this->db->obtener_datos();
        if (empty(trim($this->datos['correo']))||empty(trim($this->datos['nombrec'])) || empty(trim($this->datos['pass']))||empty(trim($this->datos['telefono']))||empty(trim($this->datos['fecha']))) {
            $this->respuesta['msg'] = 'no se permiten espacios en blanco';
        }else if(!empty($this->respuesta)){
            $this->respuesta['msg']='Este correo ya Existe';
        }else{
            $this->almacenar_cliente();
        }
    }

}


    /**
     * Almacena el registro de cliente en la Base de Datos
     * @access private
     * @function almacenar_cliente
     */
    private function almacenar_cliente(){
        $hash=mt_rand(1000,9999);
            if($this->datos['accion']==='nuevo'){
                $this->db->consultas('
                INSERT INTO usuario (nombreu,nombrecooperativa,telefono,tipoUsuario,correo,passwords,activo,fechaR,hash) VALUES(
                    "'. $this->datos['nombrec'] .'",
                             "",
                    "'. $this->datos['telefono'] .'",
                            "Cliente",
                    "'. $this->datos['correo'] .'",
                    "'. $this->datos['pass'] .'",
                                "cero",
                    "'. $this->datos['fecha'] .'",
                            "'.$hash.'"
                    )
                ');
                $this->respuesta['msg']="usuario registrado correctamente"; 
                    $this->enviaremailcliente($this->datos['nombrec'],$this->datos['correo'],$hash);
            }
    }


   
    /**
     * Envia un correo electronico 
     * Envia un correo a la direccion proporcionada por el usuario desde el formulario de registro cliente
     * @access private
     * @function enviaremailVendedor
     * @param String $namedestino Representa el nombre del usuario al que se le enviara el mensaje
     * @param String $correo Reprecenta la direccion a la que se le enviara el mensaje
     * @param int    $hash Representa el codigo que se le enviara en el mensaje para que verifique la cuenta
     */
    private function enviaremailcliente($namedestino,$correo,$hash){
        $rutaverificacion='http://192.168.1.10/programacioniv/verify.html';
        $destino=$correo;
        $nombre=$namedestino;
        $code=$hash;

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
            $mail->Subject = 'Verificacion de cuenta';
            $mail->Body    = '
                <h3>-------------------</h3><br>
                <h1> Hola '.$nombre.'</h1><br>
                <h3>-------------------</h3><br>
        
                <h3> Este es tu codigo para verificar tu cuenta   <br> <h1>'.$code.'.</h1></h3> <br>
                <h3>Verificar tu dirección de correo electrónico mejora la seguridad de tu cuenta.</h3> 
                <p>click aqui para verificar codigo</p>
                <h4>'.$rutaverificacion.'</h4>    
            ';
        
            $mail->send();
            $this->respuesta['msg']= 'mensaje enviado';  
        } catch (Exception $e) {
            $this->respuesta['msg']= "error: {$mail->ErrorInfo}";
        } 
}


    /**
     * Recibe los datos enviados desde formulario de verificacion
     * @access public
     * @function recibircode
     * @param $login Representa los datos en si
     */
    public function recibircode($login)
    {
        $this->datos = json_decode($login, true);
        $this->validatec();
    
    }


    /**
     * Valida el codigo ingresado por el usuario desde el formulario de veridicacion.
     * @access private
     * @function validatec
     */
    private function validatec(){
        if(empty($this->datos['codigo'])){
            $this->respuesta['msg']='complete el campo';
        }else{
            $this->actualizar(); 
        }
    }


    /**
     * Actualiza el estado de la cuenta
     * Verifica si el codigo que e usuario mande desde el formulario de verificacion es valido
     * cambia el estado de cuenta de inactivo a activo
     * @access private
     * @function actualizar
     */
    private function actualizar(){
        $consultacode='select * from usuario where usuario.hash="'.$this->datos['codigo'].'"';

        $this->db->consultas($consultacode);

        $this->respuesta['msg'] = $this->db->obtener_datos();

        $codigoresult = $this->respuesta['msg'];
        if($codigoresult!=null){
            foreach ($codigoresult as $key) {
                $fila=$key;
                
            if($fila['hash']===$this->datos['codigo']){
                $this->db->consultas('
                    update usuario set activo=1 where usuario.hash="'.$this->datos['codigo'].'"
                ');
                $this->respuesta['msg']='Usuario Verificado'; 
            } 
            } 
        }else{
            $this->respuesta['msg']='Error! Código Invalido';
        }
    }
    

    /**
     * Recibe los datos enviados desde el formulario de perfil
     * @access public 
     * @function recibirFoto
     * @param object $login Representa los datos en si
     */
    public function recibirFoto($login)
    {
        $this->datos = json_decode($login, true);
        $this->validarfoto();
    }


    /**
     * Valida si los datos enviados no esten vacios
     * @access private 
     * @function validarfoto
     */
    private function validarfoto()
        {
            if(empty($this->datos['imagen'])||empty($this->datos['idusuario'])){
                $this->respuesta['msg']='Falta Imagen de Perfil';
            }
            $this->updatefoto();
        }



        /**
         * Actualiza el dato en la Base de Datos
         * @access private
         * @function updatefoto
         * @return $this->respuesta['msg'] retorna un mensaje de que los cambios fueron exitosos
         */
    private function updatefoto(){
        if($this->respuesta['msg']==='correcto'){
            if($this->datos['accion']==='modificar'){
                $this->db->consultas('
                    UPDATE  usuario SET 
                        imagen			= "'. $this->datos['imagen'] .'"
                    WHERE idusuario	= "'. $this->datos['idusuario'] .'"
                ');                  
                return $this->respuesta['msg']="Foto de Perfil Actualizada"; 
            }
        }
    }



    /**
     * Rebice los datos enviados desde el formulario
     * @access public 
     * @function recibirpass
     * @param object $login Representa los datos en si
     */
    public function recibirpass($login){
        $this->datos = json_decode($login, true);
        $this->validarpass();    
    }


    /**
     * Valida los datos enviados desde el formulario si estan vacios
     * @access private
     * @function validarpass
     */
    private function validarpass(){
        if(empty($this->datos['contranueva'])||empty($this->datos['confirmarcontra'])||empty($this->datos['idusuario'])){
            $this->respuesta['msg']='Favor Complete los Campós';
        } else if($this->datos['contranueva']===$this->datos['confirmarcontra']){
            $this->guardarpass();
        }else{
            $this->respuesta['msg']='Las Contraseñas Deben Coinsidir';
        }
    }
    

        /**
         * Actualiza la contraseña del usuario en la Base de Datos y retorna un mensaje de que fue exitoso
         * @access private 
         * @function guardarpass
         * @return $this->respuesta['msg']
         */
    private function guardarpass(){
        if($this->respuesta['msg']==='correcto'){
            if($this->datos['accion']==='modificar'){
                $this->db->consultas('
                    UPDATE  usuario SET 
                    passwords			= "'. $this->datos['confirmarcontra'] .'"
                    WHERE idusuario	= "'. $this->datos['idusuario'] .'"
                ');                  
                return $this->respuesta['msg']="Contraseña Actualizada"; 
            }
        }
    }



    /**
     * Rebice los datos enviados desde el formulario
     * @access public 
     * @function recibirRecuperacion
     * @param object $login Representa los datos en si
     */
    public function recibirRecuperacion($login){
        $this->datos = json_decode($login, true);
            $this->validardatosc();    
    }



    /**
     * Valida los datos enviados desde el formulario si estan vacios
     * @access private
     * @function validardatosc
     */
    private function validardatosc(){
        if(empty(trim($this->datos['correo']))||empty(trim($this->datos['pass']))||empty(trim($this->datos['confir']))){
            $this->respuesta['msg']="Rellene todos los campos";
        }
        $this->traercorreo(); 
        }
        



        /**
         * Valida datos enviados desde formulario de recuperacion de cuenta
         * @access public
         * @function traercorreo
         */
    public function traercorreo(){
        $this->db->consultas('select usuario.correo from usuario where correo="' . $this->datos['correo']    .  '" limit 1');
        $this->respuesta = $this->db->obtener_datos();
        if (empty(trim($this->datos['correo']))) {
            $this->respuesta['msg'] = 'por favor ingrese el correo';
        } else if (strpos(trim($this->datos['correo']), '@') === false || strpos(trim($this->datos['correo']), '.') === false) {
            $this->respuesta['msg'] = 'Correo no Valido';
        } else if (empty($this->respuesta)) {
            $this->respuesta['msg'] = 'Este Correo no existe';
        } else if (empty(trim($this->datos['confir']))||empty(trim($this->datos['pass']))) {
            $this->respuesta['msg'] = 'Rellene los campos';
        }else if($this->datos['pass']===$this->datos['confir']){
            $this->restablecer();
        }
        else {
            $this->respuesta['msg']='las contraseñas no coinciden';
        }
    }



    /**
     * actualiza la contraseña en la Base de Datos
     * @access public 
     * @function restablecer
     */
    public function restablecer(){
            if($this->datos['pass']=== $this->datos['confir']){
                $this->db->consultas('
                    UPDATE  usuario SET 
                        passwords			= "'. $this->datos['confir'] .'"
                    WHERE correo	= "'. $this->datos['correo'] .'"
                ');                  
                $this->respuesta['msg']="contraseña actualizada"; 
            }else{
                $this->respuesta['msg']="las contraseñas no coinciden";
            }
        }



        /**
         * Trae los datos del usuario segun el identificador de la variable de session 'usuario'
         * @access public
         * @function traercuenta
         */
    public function traercuenta(){
        $this->db->consultas('SELECT usuario.* from usuario where usuario.idusuario="'.$_SESSION['usuario'].'"');
        $this->respuesta=$this->db->obtener_datos();
    }


        /**
         * Verifica si hay una variable session iniciada 
         * @access public 
         * @function verVariable
         * @param String valor obtiene datos de la variable de session
         * @global $_SESSION['usuario] Referencia el identificador del usuario logueado
         * 
         */
    public function verVariable($valor = ''){
        if (empty($_SESSION['usuario'])) {
            $this->respuesta['msg'] = 'regrese';
        } else {
            $this->respuesta['msg'] = 'Bienvenido';
        }
    }



    public function traerusuarios(){
        $this->db->consultas('SELECT usuario.* from usuario');
        $this->respuesta=$this->db->obtener_datos();
    }




}
?>