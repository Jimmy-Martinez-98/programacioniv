/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file productosadd.js-> Sirve para publicar productos
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var DB = firebaseDB;
var publicarp = new Vue({
	el: '#frm-productoN',
	data: {

		publicP: {
			idUsuario: '',
			nombreProducto: '',
			descProducto: '',
			codeProducto: '',
			categoria: '',
			libra: '',
			quintal: '',
			arroba: '',
			caja: '',
			unidad: '',
			imagen: '',
			existencias: '',
			precio: '',
			precioVenta: '',
			fechaSubida: ''
		},





		imagenlittle: ''

	},
	created: function () {
		this.traerid();
	},
	methods: {

		/**
		 * Trae el identificador del usuario logueado
		 * @access public 
		 * @function traerid
		 */
		traerid: function () {
			firebase.auth().onAuthStateChanged(function (user) {
				if (user) {
					var dbchild = DB.ref('users/');
					dbchild.on('value', snap => {
						snap.forEach(element => {
							if (user.uid === element.key) {
								publicarp.publicP.idUsuario = element.val().uId;

							} else {
								console.log('no coincide');
							}
						});
					});
				} else {
					console.log('error');

				}
			});
		},

		/**
		 * Publica el producto del usuario en la base de datos 
		 * @access public
		 * @function guardar
		 */
		guardar: function () {
			//Crea nueva key para el json del producto
			var newKey = DB.ref().child('Productos/').push().key;

			var arrayData = this.JsonParse(
				newKey, this.publicP.idUsuario,
				this.publicP.nombreProducto, this.publicP.descProducto,
				this.publicP.codeProducto, this.publicP.categoria,
				this.publicP.libra, this.publicP.arroba,
				this.publicP.quintal, this.publicP.unidad,
				this.publicP.caja, this.publicP.imagen,
				this.publicP.existencias, this.publicP.precio,
				this.publicP.precioVenta, this.publicP.fechaSubida
			);

				//insercion
			DB.ref('Productos/' + newKey).set(arrayData, (error) => {
				if (error) {
					swal.fire({
						title: 'Error ',
						text: error,
						icon: 'error'
					})
				} else {
					Swal.fire({
						icon: 'success',
						title: 'Tu Producto Se Publico',
					})
					this.publicP.idUsuario = '';
					this.publicP.nombreProducto = '';
					this.publicP.descProducto = '';
					this.publicP.codeProducto;
					this.publicP.categoria = '';
					this.publicP.libra = '';
					this.publicP.arroba = '';
					this.publicP.quintal = '';
					this.publicP.unidad = '';
					this.publicP.caja = '';
					this.publicP.imagen = '';
					this.publicP.existencias = '';
					this.publicP.precio = '';
					this.publicP.precioVenta = '';
					this.publicP.fechaSubida = '';
				}
			});
		},


		JsonParse: function (idP, idU, nombreProducto, descProducto, codeProducto, categoria, libra, arroba, quintal,
			unidad, caja, imagen, existencias, precio, precioVenta, fechaSubida) {

			let Data = {
				'idProducto': idP,
				'idUsuario': idU,
				'nombreProducto': nombreProducto,
				'descProducto': descProducto,
				'codeProducto': codeProducto,
				'categoria': categoria,
				'libra': libra,
				'arroba': arroba,
				'quintal': quintal,
				'unidad': unidad,
				'caja': caja,
				'imagen': imagen,
				'existencias': existencias,
				'precio': precio,
				'precioVenta': precioVenta,
				'fechaSubida': fechaSubida
			}

			return Data;
		},

		/**
		 * Obtiene la imagen que esta en el tag img, lo almacena en una carpeta y
		 *  la direccion la asigna a publicP.imagen 
		 * @access public
		 * @function obtenerimagen
		 * @param {object} e - Representa el cambio que sucede en el tag img 
		 */
		obtenerimagen(e) {
			let respuesta = null;
			let file = e.target.files[0];
			let formdata = new FormData($('#frm-productoN')[0]);
			let ruta = 'Private/Modulos/guardarruta.php';

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
			this.publicP.imagen = 'Private/Modulos/' + respuesta
			this.cargar(file);
		},


		/**
		 * Carga la imagen que se selecciono desde los archivos de la computadora
		 * @access public
		 * @function cargar
		 * @param {object} file - Representa la imagen en si 
		 */
		cargar(file) {
			let reader = new FileReader();
			reader.onload = (e) => {
				this.imagenlittle = e.target.result;
			}
			reader.readAsDataURL(file);
		}



	},
	computed: {
		/**
		 * Retorna la imagen en el tag img
		 * @access public
		 * @function imagen
		 * @returns imagenlittle - Representa la imagen a retornar
		 */
		imagen() {
			return this.imagenlittle;
		}
	}

});

/**
 * Asigna la mascara de dinero a los inputs
 */
$(function () {
	$('.money').mask('000.00');
})