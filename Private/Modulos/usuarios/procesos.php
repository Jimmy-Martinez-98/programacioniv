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
        if (empty($this->datos['correo']) || empty($this->datos['pass'])) {
            $this->respuesta['msg'] = 'Correo o contraseña estan vacios';
        } elseif(empty($this->datos['nombreu'])){
            $this->respuesta['msg']='el campo nombre esta vacio ';
        }elseif(empty($this->datos['telefono'])){
            $this->respuesta['msg']='el campo telefono esta vacio';
        }
           $this->almacenar_registro();
    }
    private function almacenar_registro(){
        if($this->respuesta['msg']==='correcto'){
            if($this->datos['accion']==='nuevo'){
                $this->db->consultas('
                INSERT INTO usuario (nombreu,nombrecooperativa,telefono,tipoUsuario,correo,passwords,fechaR) VALUES(
                    "'. $this->datos['nombreu'] .'",
                    "'. $this->datos['nombrecooperativa'] .'",
                    "'. $this->datos['telefono'] .'",
                    "'. $this->datos['selected'] .'",
                    "'. $this->datos['correo'] .'",
                    "'. $this->datos['pass'] .'",
                    "'. $this->datos['fecha'] .'"
                    )
                ');
                $this->respuesta['msg']="usuario registrado correctamente"; 
               
            }
          
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