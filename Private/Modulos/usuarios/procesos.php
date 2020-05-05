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
            $_SESSION['usuario']=$correo;

           $this->db->consultas('select usuario.correo, usuario.passwords from usuario where correo="' . $correo . '" and passwords="' . $contraseña . '" limit 1');
            $this->respuesta['msg'] = $this->db->obtener_datos();
            $usuario = $this->respuesta['msg'];
            
            if (empty($this->respuesta['msg'])) {
                $this->respuesta['msg'] = 'correo o contraseña incorrecto ';
            } else {
                
                return $this->respuesta['msg'] = 'Bienvenido';
                
                
               
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
                INSERT INTO usuario (nombreu,nombrecooperativa,direccion,telefono,tipoUsuario,correo,passwords,fechaR) VALUES(
                    "'. $this->datos['nombreu'] .'",
                    "'. $this->datos['nombrecooperativa'] .'",
                    "'. $this->datos['direccion'] .'",
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
    
}
?>