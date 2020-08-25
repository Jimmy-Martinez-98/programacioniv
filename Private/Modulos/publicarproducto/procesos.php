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

$producto = new producto_nuevo();

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
    private $datos = array();
    public $respuesta = ['msg' => "correcto"];

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
            $mail->Host = 'smtp.gmail.com'; // Set the SMTP server to send through
            $mail->isSMTP(); // Send using SMTP
            $mail->SMTPAuth = true; // Enable SMTP authentication
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMT
            $mail->Port = 587; // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
            $mail->Username = 'agroproducers2020@gmail.com'; // SMTP username
            $mail->Password = 'Slayer.2020'; // SMTP password

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

            if (!$mail->send()) {
                $this->respuesta['msg'] = "No se pudo mandar el correo";
            } else {
                $this->respuesta['msg'] = 'Mensaje Enviado';

            }

        } catch (Exception $e) {
            $this->respuesta['msg'] = "    error: {$mail->ErrorInfo} ";
        }
    }

}
