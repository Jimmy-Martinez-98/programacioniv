/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file productosadd.js-> Sirve para publicar productos
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var publicarp = new Vue({
	el: '#frm-productoN',
	data: {

		publicP: {
			miproducto: 0,
			idusuario: 0,
			nombre_producto: '',
			descprod: '',
			codigo_producto: '',
			categoria: '',
			libra: '',
			quintal: '',
			arroba: '',
			caja: '',
			imagen: '',
			existencias: '',
			precio: '',
			precio_venta: '',
			fecha_subida: '',
			accion: 'nuevo',
			msg: ''
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
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=traerid&nuevoP=""`).then(resp => resp.json()).then(resp => {
				this.publicP.idusuario = resp[0].idusuario;
			})
		},

		/**
		 * Es cuando le da clic en publicar producto 
		 * @access public
		 * @function guardar
		 */
		guardar: function () {
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=recibirDatos&nuevoP=${JSON.stringify(this.publicP)}`).then(resp => resp.json()).then(resp => {
				if (resp.msg == "Su Producto Fue Publicado Exitosamente") {
					alertify.success(resp.msg);

					this.publicP = '';
				} else {
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: resp.msg,
						showConfirmButton: false,
						timer: 1500
					})
				}
			});
		},


		/**
		 * Obtiene la imagen que esta en el tag img, lo almacena en una carpeta y
		 *  la direccion la asigna a publicP.imagen 
		 * @access public
		 * @function obtenerimagen
		 * @param {object} e - Representa el cambio que sucede en el tag img 
		 */
		obtenerimagen(e) {
			var respuesta = null;
			let file = e.target.files[0];
			var formdata = new FormData($('#frm-productoN')[0]);
			var ruta = 'Private/Modulos/guardarruta.php';

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
 * Asigna la mascar de dinero a los inputs
 */
$(function () {
	$('.money').mask('000.00');
})