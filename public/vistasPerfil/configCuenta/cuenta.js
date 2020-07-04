/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file cuenta.js-> Sirve para la configuracion de la cuenta
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var datosCuenta = new Vue({
	el: '#cuenta',
	data: {
		datoscuenta: []
	},
	methods: {

		/**
		 * Trae el identificador del usuario logueado
		 * @access public
		 * @function traerdatosusuario
		 */
		traerdatosusuario: function () {
			fetch(`Private/Modulos/usuarios/procesos.php?proceso=traercuenta&login=${JSON.stringify(this.datoscuenta)}`).then(resp => resp.json()).then(resp => {
				this.datoscuenta = resp;
			});
		},

		/**
		  * Pasa los datos del item seleccionado  a otra variable para su edicion
		  * @access public 
		  * @function modfoto
		  * @param {object} update - Representa los datos a modificar
		  */
		modfoto: function (update) {
			editfoto.updatefoto = update;
			editfoto.updatefoto.accion = "modificar";
		},

		/**
		 * pasa los datos de lo seleccionado a otra variable para su modificacion
		 * @param {object} passs - Representa los datos a modificacion 
		 */
		modificacionpass: function (passs) {
			editpass.cambiopass = passs;
		},
	},
	created: function () {
		this.traerdatosusuario();
	}
});



/**
 * @instance objeto de instancia de Vue.js
 */
var editfoto = new Vue({
	el: '#fotoperfiledit',
	data: {
		updatefoto: {
			idusuario: 0,
			imagen: ''
		},
		imagenvista: ''
	},
	created: function () {
		this.traerid()
	},
	methods: {

		/**
		 * Trae el identificador del usuario logueado
		 * @access public 
		 * @function traerid
		 */
		traerid: function () {
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=traerid&nuevoP=""`).then(resp => resp.json()).then(resp => {
				this.updatefoto.idusuario = resp[0].idusuario;

			})
		},


		/**
		 * Es cuando le da cargar foto, guarda los datos
		 * @access public
		 * @function Guardarimg 
		 */
		Guardarimg: function () {
			fetch(`Private/Modulos/usuarios/procesos.php?proceso=recibirFoto&login=${JSON.stringify(this.updatefoto)}`).then(resp => resp.json()).then(resp => {
				if (resp.msg != "Foto de Perfil Actualizada") {
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: resp.msg,
						showConfirmButton: false,
						timer: 1500
					})
					alertify.warning(resp.msg);
				} else {

					alertify.success(resp.msg);
					datosCuenta.traerdatosusuario();
					appcooperativa.traerdatosusuario();
				}
			})
		},


		/**
		  * Obtiene la imagen que esta en el tag img para guardarlo en carpeta y
		  *  asignarlo a updatefoto.imagen su direccion
		  * @access public
		  * @function obtenerimagen
		  * @param {objec} e - Representa el cambio en el tag img 
		  */
		obtenerimagen(e) {
			let file = e.target.files[0];

			var respuesta = null
			var formdata = new FormData($('#editfotoo')[0]);
			var ruta = 'Private/Modulos/usuarios/imgperfil.php';

			$.ajax({
				type: "POST",
				url: ruta,
				data: formdata,
				contentType: false,
				processData: false,
				async: false,
				success: function (response) {
					respuesta = response;
				}

			});

			this.updatefoto.imagen = "Private/Modulos/usuarios/" + respuesta;

			this.cargarimagen(file);
			this.datosCuenta();

		},

		/**
		 * Carga la imagen en el tag img
		 * @access public
		 * @function cargarimagen
		 * @param {object} file -Reprecenta el archivo de imagen 
		 */
		cargarimagen(file) {
			let reader = new FileReader();
			reader.onload = (e) => {
				this.imagenvista = e.target.result
			}
			reader.readAsDataURL(file)
		}
	},
	computed: {

		/**
		 * Retorna la imagen en el tag img
		 * @access public
		 * @function imagenes	
		 * @returns imagenvista - Representa la imagen en si
		 */
		imagenes() {
			return this.imagenvista;
		}
	}
});



/**
 * @instance objeto de instancia de Vue.js
 */
var editpass = new Vue({
	el: '#edicontra',
	data: {
		actualizarcontra: {
			idusuario: 0,
			contranueva: '',
			confirmarcontra: '',
			accion: 'modificar'
		},
		cambiopass: {
			contra: ''
		}
	},
	created: function () {
		this.traeridusuario();

	},
	methods: {
		/**
		 * Verifica la que la contraseña cumpla los requisitos
		 * @access public
		 * @function alerta
		 */
		alerta: function () {
			var mayus = new RegExp("^(?=.*[A-Z])");
			var especial = new RegExp("^(?=.*[*_.-])");
			var numeros = new RegExp("^(?=.*[0-9])");
			var lower = new RegExp("^(?=.*[a-z])");
			var len = new RegExp("^(?=.{8,})");
			var regexp = [mayus, especial, numeros, lower, len];
			var checkval = 0;

			var wordpass = $('#nuevap').val();
			for (var i = 0; i < 5; i++) {
				if (regexp[i].test(wordpass)) {
					checkval++;
				}
			}
			if (checkval === 0) {
				$('#msgs').hide();
			} else if (checkval >= 0 && checkval <= 2) {
				$('#msgs').show();
				$('#msgs').text("Muy Insegura!").css("color", "red");
			} else if (checkval >= 3 && checkval <= 4) {
				$('#msgs').text("Poco Segura!").css("color", "orange");
			} else if (checkval === 5) {
				$('#msgs').text("Segura!").css("color", "green");
			}
		},



		/**
		 * Trael el id del usuario logueado
		 * @access public
		 * @function traeridusuario
		 */
		traeridusuario: function () {
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=traerid&nuevoP=""`).then(resp => resp.json()).then(resp => {
				this.actualizarcontra.idusuario = resp[0].idusuario;
			})
		},


		/**
		 * Manda los datos al archivo.php para su procesamiento 
		 * y si es exitoso el cambio muestra una alerta
		 * @access public
		 * @function updatepass
		 */
		updatepass: function () {
			fetch(`Private/Modulos/usuarios/procesos.php?proceso=recibirpass&login=${JSON.stringify(this.actualizarcontra)}`).then(resp => resp.json()).then(resp => {
				if (resp.msg == "Favor Complete los Campós") {
					alertify.error(resp.msg);
				} else if (resp.msg == "Las Contraseñas Deben Coinsidir") {
					alertify.error(resp.msg);
				} else {
					alertify.success(resp.msg);
				}
			});
		}
	}
});
