/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file login.js-> Sirve para loguear al usuario a la webapp
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var DB= firebase.database();
var applogin = new Vue({
	el: '#frm-login',
	data: {
		name: {

			correo: '',
			pass: '',
			msg: ''
		},

	},
	methods: {
		/**
		 * Verifica las credenciales del usuario y si conisiden con las de la Base de Datos inisia sessión
		 * @access public
		 * @function inicioSesion
		 */
		inicioSesion: function () {
			
		},


		/**
		 * Redirige al usuario al formulario de registro
		 * @access public 
		 * @function Registrate
		 */
		Registrate: function () {
			location.href = "Registro.php";
		},
		/**
		 * Redirige al usuario al formulario de recuperacion de contraseña
		 * 
		 */
		Recuperar: function () {
			location.href = "password.html";
		}
	}


})
