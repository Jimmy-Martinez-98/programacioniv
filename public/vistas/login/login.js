/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file login.js-> Sirve para loguear al usuario a la webapp
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var DB = firebase.database();
var firebaseAuth = firebase.auth();
var applogin = new Vue({
	el: '#frm-login',
	data: {
		name: {
			correo: '',
			pass: '',
		},

	},
	methods: {
		/**
		 * Verifica las credenciales del usuario y si conisiden con las de la Base de Datos inisia sessión
		 * @access public
		 * @function inicioSesion
		 */
		inicioSesion: function () {
			let email = this.name.correo;
			let password = this.name.pass;
			
			firebaseAuth.signInWithEmailAndPassword(email, password).then(() => {
				let user = firebase.auth().currentUser;
				if (user.emailVerified) {
					location.href="index.html"
				} else if(user.emailVerified && !user) {
					swal.fire({
						title:'Error',
						text:'Correo o Contraseña invalidos',
						icon:'error'
					})
				}else if(!user.emailVerified){
					swal.fire({
						title:'Error',
						text:'Esta cuenta aun no esta verificada',
						icon:'info'
					})
				}
			}).catch(function (error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorCode, '=>', errorMessage);
				swal.fire(errorMessage)
				// ...
			});
		},


		/**
		 * Redirige al usuario al formulario de registro
		 * @access public 
		 * @function Registrate
		 */
		Registrate: function () {
			location.href = "Registro.html";
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
