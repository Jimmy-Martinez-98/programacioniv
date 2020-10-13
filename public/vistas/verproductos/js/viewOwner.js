var viewsOwners = new Vue({
  el: "#view",
  data: {
    owner: [],
    descripcion: [],
    horario:[]
  },
  created: function () {
    this.view();
  },
  computed: {
    name: function () {
      return (
        this.owner.nombreCooperativa == "" ||
        this.owner.nombreCooperativa == null
      );
    },
  },
  methods: {
    view: function () {
      var dataFromStorage = JSON.parse(sessionStorage.getItem("owner"));
      let id = dataFromStorage;
      this.getDataUser(id);
      this.getTimeWork(id);
    },
    getDataUser: function (id) {
      let uid = id["id"];

      firebaseDB
        .ref("users/")
        .orderByChild("uId")
        .equalTo(uid)
        .on("value", (snap) => {
          snap.forEach((element) => {
            this.owner = element.val();
          });
        });
      firebaseDB
        .ref("descUsuario/")
        .orderByChild("idU")
        .equalTo(uid)
        .on("value", (snap) => {
          snap.forEach((element) => {
            this.descripcion = element.val();
          });
        });
    },
    getTimeWork: function (id) {
      let uid = id["id"];

      firebaseDB
        .ref("users/")
        .orderByChild("uId")
        .equalTo(uid)
        .on("value", (snap) => {
          snap.forEach((element) => {
            this.owner = element.val();
          });
        });
      firebaseDB
        .ref("horarioTrabajo/")
        .orderByChild("idU")
        .equalTo(uid)
        .on("value", (snap) => {
          snap.forEach((element) => {
            this.horario = element.val();
          });
        });
    }
  },
});