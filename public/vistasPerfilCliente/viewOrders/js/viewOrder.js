var Pedidos = new Vue({
	el: "#pedidos",
	data: {
		allOrders: [],
		valor: "",
		userVal: "",
		forSearch: "",
		page: 1,
		perPage: 10,
		pages: [],
	},
	created: function () {
		this.listOrders();
	},

	computed: {
		displayOrders: function () {
			return this.paginate(this.allOrders);
		},
		update: function () {
			this.listOrders();
		},
	},
	watch: {
		update() {},

		allOrders() {
			this.setOrders();
		},
	},
	methods: {
		async listOrders() {
			let data = [];
			await firebaseAuth.onAuthStateChanged((user) => {
				if (user) {
					this.userVal = user.uid;
					firebaseDB.ref("/ordersClient").on("value", (snap) => {
						snap.forEach((element) => {
							if (user.uid == element.val().idClient) {
								data.push(element.val());
							}
						});
					});
					this.allOrders = data;

					if ((this.valor = null)) {
						this.allOrders = data;
					}
					return;
				}
			});
		},

		setOrders: function () {
			let numberOfPages = Math.ceil(this.allOrders.length / this.perPage);
			this.pages = [];
			for (let i = 1; i <= numberOfPages; i++) {
				this.pages.push(i);
			}
		},

		paginate: function (orders) {
			let page = this.page,
				perPage = this.perPage,
				from = page * perPage - perPage,
				to = page * perPage;
			return orders.slice(from, to);
		},

		busqueda: function () {

			if (this.forSearch == "nombre") {
				let data = [];
				firebaseDB.ref("/ordersClient").orderByChild("/producName").startAt(this.valor).on("value", (snap) => {
					snap.forEach((element) => {
						if (this.userVal == element.val().idClient) {
							data.push(element.val());
						}
					});
				});

				this.allOrders = data;
			} else if (this.forSearch == "fecha") {
				let data = [];
				firebaseDB
					.ref("/ordersClient")
					.orderByChild("/fecha")
					.startAt(this.valor)
					.on("value", (snap) => {
						snap.forEach((element) => {
							if (this.userVal == element.val().idClient) {
								data.push(element.val());
							}
						});
					});

				this.allOrders = data;
			}
		},
	},
});