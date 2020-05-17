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
               $_SESSION['usuario'] =$fila['nombreu'];
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
        }elseif (empty($this->datos['direccion'])) {
            $this->respuesta['msg']='el campo direccion esta vacio';
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
           if(empty(trim($this->datos['passwords']))){
               $this->respuesta['msg']='Favor Complete los Campós';
           }else if(empty($this->datos['idusuario'])){
            $this->respuesta['msg']='falta id';
           }
           $this->guardarpass();
        }
        private function guardarpass()
        {
            if($this->respuesta['msg']==='correcto'){
                if($this->datos['accion']==='modificar'){
                
                   $this->db->consultas('
                    UPDATE  usuario SET 
                    passwords			= "'. $this->datos['passwords'] .'"
                     WHERE idusuario	= "'. $this->datos['idusuario'] .'"
                  ');                  
                    return $this->respuesta['msg']="Contraseña Actualizada"; 
                }
            }
        }




     public function traercuenta()
    {
        $this->db->consultas('SELECT usuario.* from usuario where usuario.nombreu="'.$_SESSION['usuario'].'"');
       return $this->respuesta=$this->db->obtener_datos();
    }

    

   
    
}
?>