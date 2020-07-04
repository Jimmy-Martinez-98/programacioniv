/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file editar.js-> Sirve para la edicion de productos
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var appeditP = new Vue({
	el: '#frm-edit',
	data: {
		mod: {
			miproducto: 0,
			fk_idusuario: 0,
			nombre_producto: '',
			descprod: '',
			codigo_producto: '',
			categoria: '',
			imagen: '',
			Libra: '',
			Arroba: '',
			Quintal: '',
			existencias: '',
			precio: '',
			precio_venta: '',
			fecha_subida: '',
			msg: ''
		},
		imagenlittle: ''
	},

	methods: {
		/**
		 * Actualiza los datos de producto seleccionado
		 * @access public
		 * @function editar
		 */
		editar: function () {
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=recibirDatosmod&nuevoP=${JSON.stringify(this.mod)}`).then(resp => resp.json()).then(resp => {
				if (resp.msg == "Su Producto Ha Sido Actualizado") {
					alertify.success(resp.msg);

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
		 * Limpia los inputs del formulario
		 * @access public
		 * @function limpiar
		 */
		limpiar: function () {
			this.mod.miproduct = 0,
				this.mod.fk_idusuari = 0,
				this.mod.nombre_producto = '',
				this.mod.descprod = '',
				this.mod.codigo_producto = '',
				this.mod.categoria = '',
				this.mod.imagen = 'public/img/ico.png',
				this.mod.Libra = '',
				this.mod.Arroba = '',
				this.mod.Quintal = '',
				this.mod.Caja = '',
				this.mod.existencias = '',
				this.mod.precio = '',
				this.mod.precio_venta = '',
				this.mod.fecha_subida = '';
			apptodoP.buscar();

		}
		,

		/**
		  * Obtiene la imagen que esta en el tag img para guardarlo en carpeta y
		  *  asignarlo a updatefoto.imagen su direccion
		  * @access public
		  * @function obtenerimagen
		  * @param {objec} e - Representa el cambio en el tag img 
		  */
		obtenerimagen: function (e) {
			var respuesta = null;
			let file = e.target.files[0];
			var formdata = new FormData($('#frm-edit')[0]);
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
			this.mod.imagen = 'Private/Modulos/' + respuesta
			this.cargar(file);

		},

		/**
		 * Carga la imagen en el tag img
		 * @access public
		 * @function cargarimagen
		 * @param {object} file -Reprecenta el archivo de imagen 
		 */
		cargar(file) {
			let reader = new FileReader();
			reader.onload = (e) => {
				this.imagenlittle = e.target.result;
			}
			reader.readAsDataURL(file);
		}



	}, computed: {

		/**
		 * Retorna la imagen en el tag img
		 * @access public
		 * @function imagenes	
		 * @returns imagenlittle - Representa la imagen en si
		 */
		imagen() {
			return this.imagenlittle;
		}
	}


});

/** 
 * @instance objeto de instancia de Vue.js
*/
var apptodoP = new Vue({
	el: '#frmMis',
	data: {
		valor: '',
		todo_prod: []
	},
	methods: {

		/**
		 * Busca los productos y si el input se digita algo lo busca en base a eso
		 * @access public
		 * @function busca
		 */
		buscar: function () {
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=traerproductos&nuevoP=${this.valor}`).then(resp => resp.json()).then(resp => {
				this.todo_prod = resp;
			});

		},

		/**
		 * Asigna los datos del item seleccionado para su modificacion
		 *@access public
		 *@function modi
		 * @param {object} id - Representa los datos del item seleciconado 
		*/
		modi: function (id) {
			appeditP.mod = id;
		}

	},
	created: function () {
		this.buscar();
	}

})