<?php 
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
            $consulta='select * from usuario where correo="' . $correo . '" and passwords="' . $contraseña . '" limit 1';

         $this->db->consultas($consulta);
            $this->respuesta['msg'] = $this->db->obtener_datos();
            $usuario = $this->respuesta['msg'];
               
            
            if (empty($this->respuesta['msg'])) {
                $this->respuesta['msg'] = 'correo o contraseña incorrecto ';
               
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
        if (empty(trim($this->datos['correo'])) || empty(trim($this->datos['pass']))||empty(trim($this->datos['nombreu']))||empty(trim($this->datos['telefono']))||empty(trim($this->datos['fecha']))) {
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
                INSERT INTO usuario (nombreu,nombrecooperativa,telefono,tipoUsuario,correo,passwords,fechaR,activo) VALUES(
                    "'. $this->datos['nombreu'] .'",
                    "'. $this->datos['nombrecooperativa'] .'",
                    "'. $this->datos['telefono'] .'",
                    "'. $this->datos['selected'] .'",
                    "'. $this->datos['correo'] .'",
                    "'. $this->datos['pass'] .'",
                    "'. $this->datos['activo'] .'",
                    "'. $this->datos['fecha'] .'"
                    )
                ');
                        
               
                   
                $this->respuesta['msg']="usuario registrado correctamente" ; 
                    if(!empty($this->datos['nombrecooperativa'])){
                        $this->enviaremail($this->datos['correo'],$this->datos['nombrecooperativa'],$this->datos['activo']);
                    }else{
                        $this->enviaremail($this->datos['correo'],$this->datos['nombreu'],$this->datos['activo']);
                    }
            }
          
        }
        
    }

    private function enviaremail($mail,$namedestino,$veri){
            $destino="scottlovos503@gmail.com";
            $nombre=$namedestino;
            $activo=$veri;
            $hash=md5($activo);
            $header='from: agroproducer2020@gmail.com \r\n';
            $header .='X-Mailer: php/'.phpversion().'\r\n';
            $header .="Mime-version:1.0\r\n";
            $header .="Content-Type: text/plain";
            $mensaje="
                Hola, $nombre
                Haz clic en el enlace de abajo para verificar tu dirección de correo electrónico de Agro Producer. Verificar tu dirección de correo electrónico mejora la seguridad de tu cuenta. 
            
                http://www.agroproducer.com/verify.php?email='.$destino.'&hash='.$hash.'
            ";
           
            if(mail($destino,"hola",$mensaje,$header)){
                $this->respuesta['msg']='Mensaje Enviado';
            }else{
                $this->respuesta['msg']='error';
            }
           
            
    }



    public function recibircliente($login)
    {
        $this->datos = json_decode($login, true);
        $this->validarCliente();
       
    }

    private function validarCliente()
    {
        $this->db->consultas('select * from usuario where correo="' . $this->datos['correo'] . '" limit 1');
        $this->respuesta = $this->db->obtener_datos();
        if (empty(trim($this->datos['correo']))||empty(trim($this->datos['nombrec'])) || empty(trim($this->datos['pass']))||empty(trim($this->datos['telefono']))||empty(trim($this->datos['fecha']))) {
            $this->respuesta['msg'] = 'no se permiten espacios en blanco';
        }else if(!empty($this->respuesta)){
            $this->respuesta['msg']='Este correo ya Existe';
        }
           $this->almacenar_cliente();
        
    }
    private function almacenar_cliente(){
       
            if($this->datos['accion']==='nuevo'){
                $this->db->consultas('
                INSERT INTO usuario (nombreu,nombrecooperativa,telefono,tipoUsuario,correo,passwords,fechaR) VALUES(
                    "'. $this->datos['nombrec'] .'",
                             "",
                    "'. $this->datos['telefono'] .'",
                            "Cliente",
                    "'. $this->datos['correo'] .'",
                    "'. $this->datos['pass'] .'",
                    "'. $this->datos['fecha'] .'"
                    )
                ');
                $this->respuesta['msg']="usuario registrado correctamente"; 
               
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