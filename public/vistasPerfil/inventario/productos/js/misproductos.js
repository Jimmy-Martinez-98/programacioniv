/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file misproductos.js-> Sirve para la configuracion de los productos
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var misproductosapp = new Vue({
	el: "#misprod",
	data() {
		return {
			valor: "",
			page: 1,
			perPage: 5,
			articles: [],
			pages: [],
			agregar: {
				arroba: false,
				caja: false,
				quintal: false,
				unidad: false,
				categoria: false,
				codeProducto: "",
				descProducto: "",
				existencias: "",
				fechaSubida: "",
				idProducto: "",
				idUsuario: "",
				imagen: "",
				libra: false,
				nombreCooperativa: "",
				nombreProducto: "",
				nombreUsuario: "",

				pL: "",
				pA: "",
				pQ: "",
				pC: "",

			},
		}
	},

	created: function () {
		this.productsInTable();
	},

	methods: {
		/**
		 * Mustra los productos del usuario
		 * @access public
		 * @function productosmios
		 */
		productsInTable() {
			let todo = [];
			return firebaseAuth.onAuthStateChanged((user) => {
				firebaseDB.ref("Productos").on("value", (snap) => {
					todo = [];
					snap.forEach((element) => {
						if (user.uid == element.val().idUsuario) {
							todo.push(element.val());
						}
					});
				});
				misproductosapp.articles = todo;
				if (this.valor == null) {
					return misproductosapp.articles = todo;
				}
			})

		},
		/**
		 * Muestra el numero de paginas
		 * @access public
		 * @function setArticles
		 */
		setArticles: function () {

			let numberOfPages = Math.ceil(this.articles.length / this.perPage);
			this.pages = [];
			for (let i = 1; i <= numberOfPages; i++) {
				this.pages.push(i);
			}
		},
		/**
		 * Calcula la el numero de paginas para la tabla
		 * @access public
		 * @function paginate
		 * @param {object} articles -> representa el total de articulos de la db
		 */
		paginate: function (articles) {
			let page = this.page,
				perPage = this.perPage,
				from = page * perPage - perPage,
				to = page * perPage;
			return articles.slice(from, to);
		},

		/**
		 * Es cuando se escribe en el input
		 * @access public
		 * @function busquedaProducto
		 */
		busquedaProducto: function () {
			let user = firebaseAuth.currentUser;
			let allProducts = [];
			firebaseDB
				.ref("Productos/")
				.orderByChild("nombreProducto")
				.startAt(this.valor)
				.on("value", (snap) => {
					allProducts = [];
					snap.forEach((items) => {
						if (user.uid === items.val().idUsuario) {
							allProducts.push(items.val());
						}
					});
				});
			this.articles = allProducts;
		},
		/**
		 *
		 * @param {String} color -> representa el color de la notificacion
		 * @param {String} title -> representa el titulo de la notificaion
		 * @param {String} text -> representa el text o comentario en la notificacion
		 */
		openNotificacion: function (color, title, text, icono) {
			this.$vs.notification({
				square: true,
				icon: icono,
				progress: "auto",
				color: color,
				title: title,
				text: text,
				width: "100%",
			});
		},

		limpiar: function () {
			this.modificacion.arroba = false;
			this.modificacion.caja = false;
			this.modificacion.quintal = false;
			this.modificacion.unidad = false;
			this.modificacion.categoria = false;
			this.modificacion.codeProducto = "";
			this.modificacion.descProducto = "";
			this.modificacion.existencias = "";
			this.modificacion.fechaSubida = "";
			this.modificacion.idProducto = "";
			this.modificacion.idUsuario = "";
			this.modificacion.imagen = "";
			this.modificacion.libra = false;
			this.modificacion.nombreCooperativa = "";
			this.modificacion.nombreProducto = "";
			this.modificacion.nombreU = "";
			this.modificacion.precio = "";
			this.modificacion.precioVenta = "";
		},

		Guardar: function () {
			if (
				this.agregar.codeProducto != "" &&
				this.agregar.nombreProducto &&
				this.agregar.categoria != "" &&
				this.agregar.descProducto != "" &&
				this.agregar.existencias != "" &&
				this.agregar.fechaSubida != "" &&
				this.agregar.idProducto != "" &&
				this.agregar.idUsuario != "" &&
				this.agregar.imagen != "" &&
				this.agregar.nombreUsuario != ""
			) {

				if (

					this.agregar.pL == "" &&
					this.agregar.pA == "" &&
					this.agregar.pQ == "" &&
					this.agregar.pC == "" &&
					this.agregar.arroba == "" &&
					this.agregar.caja == "" &&
					this.agregar.quintal == "" &&
					this.agregar.unidad == "" &&
					this.agregar.categoria == ""
				) {

					guardarProducto.openNotificacion(
						"danger",
						"Espera!",
						"Por Favor Espere A Que La Imagen Se Carge O Completa Los Campos Faltantes",
						"<i class='bx bx-error-circle' ></i>"
					);
				} else if (this.agregar.pL != '' || this.agregar.pA != '' || this.agregar.pQ !== '' || this.agregar.pC != '') {
					if (this.agregar.imagen != "") {
						firebaseDB
							.ref("Productos/" + this.agregar.idProducto)
							.set({
								idProducto: guardarProducto.agregar.idProducto,
								codeProducto: guardarProducto.agregar.codeProducto,
								nombreProducto: guardarProducto.agregar.nombreProducto,
								descProducto: guardarProducto.agregar.descProducto,
								existencias: guardarProducto.agregar.existencias,
								categoria: guardarProducto.agregar.categoria,

								libra: guardarProducto.agregar.libra,
								Arroba: guardarProducto.agregar.arroba,
								Quintal: guardarProducto.agregar.quintal,
								Caja: guardarProducto.agregar.caja,
								nombreUsuario: guardarProducto.agregar.nombreUsuario,
								nombreCooperativa: guardarProducto.agregar.nombreCooperativa,
								idUsuario: guardarProducto.agregar.idUsuario,
								precioLibra: guardarProducto.agregar.pL,
								precioArroba: guardarProducto.agregar.pA,
								precioQuintal: guardarProducto.agregar.pQ,
								precioCaja: guardarProducto.agregar.pC,
								imagen: guardarProducto.agregar.imagen,
							})
							.then(() => {
								guardarProducto.openNotificacion(
									"success",
									"Agregado!!",
									"El Producto Fue Agregado Exitosamente",
									"<i class='bx bx-select-multiple' ></i>"
								);
								this.limpiar();
								this.displayArticles
							});
					} else {
						guardarProducto.openNotificacion(
							"danger",
							"Ups...",
							"Espera a que se carge la imagen",
							"<i class='bx bx-info-circle' ></i>"
						);
					}
				}
			} else {
				guardarProducto.openNotificacion('dark', 'Por favor complete los campos :)', '', "<i class='bx bx-info-circle' ></i>")
			}

		},

		editar: function (id) {
			confirmModificacion.modificacion.codeProducto = id.codeProducto;
			confirmModificacion.modificacion.nombreProducto = id.nombreProducto;
			confirmModificacion.modificacion.descProducto = id.descProducto;
			confirmModificacion.modificacion.existencias = id.existencias;
			confirmModificacion.modificacion.categoria = id.categoria;
			confirmModificacion.modificacion.unidad = id.Unidad;
			confirmModificacion.modificacion.libra = id.libra;
			confirmModificacion.modificacion.arroba = id.Arroba;
			confirmModificacion.modificacion.quintal = id.Quintal;
			confirmModificacion.modificacion.caja = id.Caja;
			confirmModificacion.modificacion.fechaSubida = id.fechaSubida;
			confirmModificacion.modificacion.idProducto = id.idProducto;
			confirmModificacion.modificacion.idUsuario = firebaseAuth.currentUser.uid;
			confirmModificacion.modificacion.imagen = id.imagen;
			confirmModificacion.modificacion.nombreCooperativa = id.nombreCooperativa;
			confirmModificacion.modificacion.nombreProducto = id.nombreProducto;
			confirmModificacion.modificacion.nombreUsuario = id.nombreUsuario;

			confirmModificacion.modificacion.pL = id.precioLibra;
			confirmModificacion.modificacion.pA = id.precioArroba;
			confirmModificacion.modificacion.pQ = id.precioQuintal;
			confirmModificacion.modificacion.pC = id.precioCaja;
		},

		eliminarProducto: function (id) {
			swal
				.fire({
					scrollbarPadding: false,
					backdrop: "true",
					width: "50%",
					title: "Estas seguro?",
					text: "No podras revertir esto",
					icon: "warning",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "Si, Eliminalo!",
					allowOutsideClick: false,
					allowEscapeKey: false,
					stopKeydownPropagation: false,
				})
				.then((result) => {
					if (result.value) {
						firebaseDB
							.ref("Productos/" + id)
							.remove()
							.then(() => {
								misproductosapp.openNotificacion(
									"success",
									"Eliminado!!",
									"El Producto Fue Eliminado Exitosamente :)",
									"<i class='bx bx-select-multiple' ></i>"
								);
							})
							.catch((error) => {
								swal.fire({
									title: "Ups..",
									text: "Ocurrio un error inesperdado" + error,
									icon: "error",
								});
							});
					}
				});
		},
	},
	computed: {
		displayArticles: function () {
			return this.paginate(this.articles);
		},
		async update() {
			await this.productsInTable()
		}
	},
	watch: {
		articles() {
			return this.setArticles();
		},

		update() {

		}
	},
});