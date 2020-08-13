<?php
/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file procesos.php-> Sirve para realizar los procesos en peticion desde JavaScript
 * @license MIT Libre disttribucion
 */

/** @uses PHPMailer */
use PHPMailer\PHPMailer\Exception;
/**  @uses Exception */
use PHPMailer\PHPMailer\PHPMailer;

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
include '../../config/config.php';

$producto = new producto_nuevo($Conexion);

$proceso = '';

if (isset($_GET['proceso']) && strlen($_GET['proceso']) > 0) {
    $proceso = $_GET['proceso'];
}
/** @global $producto Se le asigna los datos  */
$producto->$proceso($_GET['nuevoP']);
/** Se codifican los datos en formato json */
print_r(json_encode($producto->respuesta));

/**
 * @class producto_nuevo
 */
class producto_nuevo
{
    private $datos = array(), $db;
    public $respuesta = ['msg' => "correcto"];

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
     * @access public
     * @function recibirCorreo recibe los datos del producto para su modificacion
     * @param object  $producto representa los datos en si
     */
    public function recibirCorreo($producto)
    {
        $this->datos = json_decode($producto, true);
        $this->validarcorreo();
    }

    /**
     * Valida si los datos enviados desde el formulario no esten vacios
     * @access private
     * @function validarcorreo
     */
    private function validarcorreo()
    {

        if (empty($this->datos['nombre']) || empty($this->datos['email'])) {
            $this->respuesta['msg'] = 'Complete los Campos';
        } else if (strpos(trim($this->datos['email']), '@') === false || strpos(trim($this->datos['email']), '.') === false) {
            $this->respuesta['msg'] = 'Correo no Valido';
        }
        $this->enviaremail($this->datos['nombre'], $this->datos['email']);
    }

    /**
     * envia un mensaje al correo y nombre que se envio desde el formulario
     * @access private
     * @function eviaremail
     */
    private function enviaremail($namedestino, $correo)
    {
        $destino = $correo;
        $nombre = $namedestino;
        $facturacode = rand();

        $mail = new PHPMailer(true);

        try {
            //Server settings
            $mail->SMTPDebug = 0; // Enable verbose debug output
            $mail->isSMTP(); // Send using SMTP
            $mail->Host = 'smtp.gmail.com'; // Set the SMTP server to send through
            $mail->SMTPAuth = true; // Enable SMTP authentication
            $mail->Username = 'agroproducers2020@gmail.com'; // SMTP username
            $mail->Password = 'Slayer.2020'; // SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
            $mail->Port = 587; // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

            //Recipients
            $mail->setFrom('agroproducers2020@gmail.com');
            $mail->addAddress($destino); // Add a recipient

            // Content
            $mail->isHTML(true); // Set email format to HTML
            $mail->Subject = 'Factura';
            $mail->Body = '
                <h3>******************</h3><br>
                <h1> Hola ' . $nombre . '</h1><br>
                <h3>*******************</h3><br>

				<h2> Gracias por comprar en Agro Producers!</h2>
				<br>
					<h3>ID FACTURA: "' . $facturacode . '"</h3>
					<br>
					<span>(Guarda una copia de este recibo como referencia)</span>
				<br>
                <h3>Para realizar tu pago del producto solicitado favor depositarlo en una de nuestras cuentas bancarias</h3>
				<p>"' . rand() . '"</p> <br>
				<p>"' . rand() . '"</p> <br>
				<p>"' . rand() . '"</p>
            ';

            $mail->send();
            $this->respuesta['msg'] = 'Mensaje Enviado';
        } catch (Exception $e) {
            $this->respuesta['msg'] = "    error: {$mail->ErrorInfo} ";
        }
    }

}
