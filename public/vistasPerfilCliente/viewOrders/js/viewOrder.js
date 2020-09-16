var Pedidos = new Vue({
  el: "#pedidos",
  data: {
    allOrders: [],
    valor: "",
    userVal: "",
    forSearch: "",
  },
  created: function () {
    this.getAllOrders();
  },
  methods: {
    getAllOrders: function () {
      let data = [];
      firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          this.userVal = user.uid;
          firebaseDB.ref("/ordersClient").on("value", (snap) => {
            snap.forEach((element) => {
              if (user.uid == element.val().idClient) {
                data.push(element.val());
              }
            });
          });
          return (this.allOrders = data);
        }
      });
    },
    busqueda: function () {
      if (this.forSearch == "nombre") {
        let data = [];
        firebaseDB
          .ref("/ordersClient")
          .orderByChild("/producName")
          .startAt(this.valor)
          .on("value", (snap) => {
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
