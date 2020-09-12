var perfilCliente = new Vue({
  el: "#menuNavegacion",
  data: {
    userLog: "",
  },
  created: function () {
    this.watchUser();
  },
  methods: {
    watchUser: function () {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          perfilCliente.getDataFromDataBase(user.uid);
        } else {
          // No user is signed in.
          location.href = "../../login.html";
        }
      });
    },
    getDataFromDataBase: function (key) {
      firebaseDB.ref("users/").on("value", (snap) => {
        snap.forEach((element) => {
          if (key == element.val().uId) {
            this.userLog = element.val().nombreUsuario;
          }
        });
      });
    },
    signOut: function () {
      document.getElementById("progreso").innerHTML = `
       <div class="d-flex justify-content-center">
        <div class="spinner-grow" role="status" style="width: 10rem; height: 10rem;" >
            <span class="sr-only">Loading...</span>
        </div>
        </div>
       `;
      firebaseAuth.signOut();
    },
    orderTab: function () {
      $("#contendedor").load("viewOrders/orders.html", function (data) {
        $(this).html(data);
      });
    },
    inboxTab: function () {},
    accountSettings: function () {},
  },
});
