<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../phpMailer/Exception.php';
require '../../phpMailer/PHPMailer.php';
require '../../phpMailer/SMTP.php';

session_start();
include('../../Config/Config.php');
$login = new login($Conexion);

$proceso = '';
if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
$login->$proceso( $_GET['login'] );
print_r(json_encode($login->respuesta));




class login{
    private $datos = array(), $db;
    public $respuesta = ['msg'=>"correcto"];
  
    
    public function __construct($db)
    {
        $this->db = $db;
    }

    public function recibirUsuario($login)
    {
        $this->datos = json_decode($login, true);
        $this->validarUsuario();
       
    }
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

    public function recibirregistro($login)
    {
        $this->datos = json_decode($login, true);
        $this->validarRegistro();
       
    }

    private function validarRegistro()
    {
        if (empty(trim($this->datos['correo']))  || empty(trim($this->datos['pass']))||empty(trim($this->datos['nombreu']))||empty(trim($this->datos['telefono']))||empty(trim($this->datos['fecha']))) {
            $this->respuesta['msg'] = 'complete los campos vacios';
        }

        if($this->datos['selected']!='Cooperativa'){
            $this->datos['nombrecooperativa']=='';
        }
           $this->almacenar_registro();
        
    }
    private function almacenar_registro(){

      
        if($this->respuesta['msg']==='correcto'){
    
            if($this->datos['accion']==='nuevo'){
                $this->db->consultas('
                INSERT INTO usuario (nombreu,nombrecooperativa,telefono,tipoUsuario,correo,passwords,activo,fechaR) VALUES(
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
            $this->enviaremail($this->datos['nombrecooperativa'],$this->datos['correo'],$this->datos['nombreu']);
            }
          
        }
        
    }

    private function enviaremail($namedestino,$correo,$altername){
            $destino=$correo;
            $nombre=$namedestino;
            $altername=$altername;
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
                $mail->Body    = 'Hola '.$nombre.' , esta es una prueva de verificacion :)';
               
            
                $mail->send();
                $this->respuesta['msg']= 'mensaje enviado';  
                  
                 }
                 else{
                    $mail->isHTML(true);                                  // Set email format to HTML
                $mail->Subject = 'Verificacion de cuenta';
                $mail->Body    = 'Hola '.$altername.' , esta es una prueba de verificacion :)';
               
            
                $mail->send();
                $this->respuesta['msg']= 'mensaje enviado';  
                   
            
                 }
            } catch (Exception $e) {
                $this->respuesta['msg']= "error: {$mail->ErrorInfo}";
            }
           


    }



    public function recibircliente($login)
    {
        $this->datos = json_decode($login, true);
        $this->validarCliente();
       
    }

    private function validarCliente()
    {
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
    private function almacenar_cliente(){
         $hash=mt_rand(1234,2465);
       
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

    private function enviaremailcliente($namedestino,$correo,$hash){
        $rutaverificacion='http://localhost/programacioniv/verify.html';
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
  
    public function recibircode($login)
    {
        $this->datos = json_decode($login, true);
        $this->validatec();
    
    }
    private function validatec(){
        if(empty($this->datos['codigo'])){
           $this->respuesta['msg']='complete el campo';
          }else{
           $this->actualizar();
            
          }
    }
    private function actualizar()
    {
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
    


    public function recibirFoto($login)
    {
        $this->datos = json_decode($login, true);
        $this->validarfoto();
       
    }
   
   
         private function validarfoto()
        {
           if(empty($this->datos['imagen'])||empty($this->datos['idusuario'])){
               $this->respuesta['msg']='Falta Imagen de Perfil';
           }
            $this->updatefoto();
        }

        private function updatefoto()
        {
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

        public function recibirpass($login)
        {
            $this->datos = json_decode($login, true);
            $this->validarpass();    
        }
      
            private function validarpass()
            {
               if(empty($this->datos['contranueva'])||empty($this->datos['confirmarcontra'])||empty($this->datos['idusuario'])){
                $this->respuesta['msg']='Favor Complete los Campós';
               } else if($this->datos['contranueva']===$this->datos['confirmarcontra']){
                $this->guardarpass();
               }else{
                $this->respuesta['msg']='Las Contraseñas Deben Coinsidir';
               }
               
            }    
        private function guardarpass()
        {
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
        public function recibirRecuperacion($login)
        {
            $this->datos = json_decode($login, true);
            $this->validardatosc();    
        }

        private function validardatosc(){
            if(empty(trim($this->datos['correo']))||empty(trim($this->datos['pass']))||empty(trim($this->datos['confir']))){
                $this->respuesta['msg']="Rellene todos los campos";
              }
             
              $this->traercorreo();
             
       
        }
        
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



        public function restablecer()
        {
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


        public function traerusuarios(){
            $this->db->consultas('SELECT usuario.* from usuario');
        $this->respuesta=$this->db->obtener_datos();
        }
     public function traercuenta()
    {
        $this->db->consultas('SELECT usuario.* from usuario where usuario.idusuario="'.$_SESSION['usuario'].'"');
        $this->respuesta=$this->db->obtener_datos();
    }

    
    public function verVariable($valor = '')
    {
        if (empty($_SESSION['usuario'])) {
           
            $this->respuesta['msg'] = 'regrese';
          
        } else {
            $this->respuesta['msg'] = 'Bienvenido';
        }
    }
   

   
    
}
?>