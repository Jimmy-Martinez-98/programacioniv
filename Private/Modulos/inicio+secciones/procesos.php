<?php 

include('../../Config/Config.php');
$miproducto = new miproducto($Conexion);

$proceso = '';
if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
$miproducto->$proceso( $_GET['miproducto'] );
print_r(json_encode($miproducto->respuesta));

class miproducto{
    private $datos = array(), $db;
    public $respuesta = ['msg'=>'correcto'];
    
    public function __construct($db){
        $this->db=$db;
    }
    public function recibirDatos($miproducto){
        $this->datos = json_decode($miproducto, true);
       
        $this->misprod();
        
    }
  
    private function misprod(){
	  $this->db->consultas('
      SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta,misproducto.Libra,misproducto.Arroba,misproducto.Quintal,misproducto.Caja  from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario
		   ');
		   return $this->respuesta = $this->db->obtener_datos();
      }

      public function recibirall($miproducto){
        $this->datos = json_decode($miproducto, true);
        $this->allp();
        
    }
  
    private function allp(){
	  $this->db->consultas('
      SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta,misproducto.Libra,misproducto.Arroba,misproducto.Quintal,misproducto.Caja,misproducto.isagotado  from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario
		   ');
		   return $this->respuesta = $this->db->obtener_datos();
      }
      public function recibirverduras($miproducto){
        $this->datos = json_decode($miproducto, true);
       
        $this->verduras();
        
    }
       private function verduras(){
         $this->db->consultas('
        SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta,misproducto.Libra,misproducto.Arroba,misproducto.Quintal,misproducto.Caja from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario AND misproducto.categoria like"Verduras"
             ');
         return $this->respuesta = $this->db->obtener_datos();
         }
      
      
         public function recibirfrutos($miproducto){
            $this->datos = json_decode($miproducto, true);
           
            $this->frutos();
            
        }
           private function frutos(){
             $this->db->consultas('
             SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario AND misproducto.categoria like"Frutos" 
                 ');
             return $this->respuesta = $this->db->obtener_datos();
             }
          
             public function recibirlegumbres($miproducto){
                $this->datos = json_decode($miproducto, true);
               
                $this->legumbre();
                
            }
               private function legumbre(){
                 $this->db->consultas('
                 SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario AND misproducto.categoria like"Legumbres"
                     ');
                 return $this->respuesta = $this->db->obtener_datos();
                 }
            
             

                 public function buscarproductoss($valor='')
                 {
                    $this->db->consultas("
                    SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario AND (misproducto.categoria like 'Frutos' and misproducto.nombre_producto like '%$valor%')
                        ");
                        return $this->respuesta=$this->db->obtener_datos();
                      
                 }
                 
                 public function buscarproductosL($valor='')
                 {
                    $this->db->consultas("
                    SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario AND (misproducto.categoria like 'Legumbres' and misproducto.nombre_producto like '%$valor%')
                        ");
                        return $this->respuesta=$this->db->obtener_datos();
                      
                 }
                 public function buscarproductosV($valor='')
                 {
                    $this->db->consultas("
                    SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario AND (misproducto.categoria like 'Verduras' and misproducto.nombre_producto like '%$valor%')
                        ");
                        return $this->respuesta=$this->db->obtener_datos();
                      
                 }
                 public function recibirbusquedatipo($miproducto){
                    $this->datos = json_decode($miproducto, true);
                   
                    $this->buscarpreciodescV();
                    
                }
                 private function buscarpreciodescV(){
                    if($this->respuesta['msg']==='correcto'){
                        $this->db->consultas("SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario AND misproducto.categoria like 'Verduras' ORDER BY misproducto.precio_venta DESC");
                        return $this->respuesta = $this->db->obtener_datos();
                    }
                 }

                 public function recibirbusquedatipovasc($miproducto){
                    $this->datos = json_decode($miproducto, true);
                   
                    $this->buscarprecioascV();
                    
                }
                private function buscarprecioascV(){
                    if($this->respuesta['msg']==='correcto'){
                        $this->db->consultas("SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario AND misproducto.categoria like 'Verduras' ORDER BY misproducto.precio_venta ASC");
                        return $this->respuesta = $this->db->obtener_datos();
                    }
                 }
                 public function recibirbusquedatipovFdesc($miproducto){
                    $this->datos = json_decode($miproducto, true);
                   
                    $this->buscarpreciodescF();
                    
                }
                 private function buscarpreciodescF(){
                    $this->db->consultas("SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario AND misproducto.categoria like 'Frutos' ORDER BY misproducto.precio_venta DESC");
                    return $this->respuesta = $this->db->obtener_datos();
                }

                public function recibirbusquedatipovFasc($miproducto){
                    $this->datos = json_decode($miproducto, true);
                   
                    $this->buscarprecioascF();
                    
                }

                private function buscarprecioascF(){
                    $this->db->consultas("SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario AND misproducto.categoria like 'Frutos' ORDER BY misproducto.precio_venta ASC");
                    return $this->respuesta = $this->db->obtener_datos();
                }

                
                
                
                
                public function recibirbusquedatipoDESCL($miproducto){
                    $this->datos = json_decode($miproducto, true);
                   
                    $this->buscarpreciodescL();
                    
                }
                
                private function buscarpreciodescL(){
                    $this->db->consultas("SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario AND misproducto.categoria like 'Legumbres' ORDER BY misproducto.precio_venta DESC");
                    return $this->respuesta = $this->db->obtener_datos();
                }

                public function recibirbusquedatipoASCL($miproducto){
                    $this->datos = json_decode($miproducto, true);
                   
                    $this->buscarprecioascL();
                    
                }
                
                private function buscarprecioascL(){
                    $this->db->consultas("SELECT usuario.idusuario,usuario.nombreu,usuario.nombrecooperativa,misproducto.nombre_producto,misproducto.imagen,misproducto.descprod,misproducto.precio_venta from usuario JOIN misproducto where usuario.idusuario=misproducto.fk_idusuario AND misproducto.categoria like 'Legumbres' ORDER BY misproducto.precio_venta ASC");
                    return $this->respuesta = $this->db->obtener_datos();
                }
}
?>


