var settings = new Vue({
  el: "#settings",
  data: {
    dataUser: [],
    name: "",
  },
  created: function () {
    this.getDataUser();
  },
  computed: {
    validateImage: function () {
      return this.dataUser.imagen != "" || this.dataUser.imagen != null;
    },
  },
  methods: {
    getDataUser: function () {
      firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          firebaseDB
            .ref("users/")
            .orderByChild("uId")
            .equalTo(user.uid)
            .on("value", (snap) => {
              snap.forEach((element) => {
                this.dataUser = element.val();
              });
            });
        }
      });
    },
    passName: function () {
      this.name = this.dataUser.nombreUsuario;
    },
    saveName: function () {
      let key = this.dataUser.uId;
      firebaseDB
        .ref("users/" + key)
        .update({
          nombreUsuario: this.name,
        })
        .then(() => {
          this.openNotificacion(
            "primary",
            "Nombre Actualizado Correctamente",
            ""
          );
        });
    },
    getImage(e) {
      let file = e.target.files[0];
      let random = Math.random();
      let key = this.dataUser.uId;
      let upload = storage
        .ref()
        .child("Perfil/" + file.name + random)
        .put(file);

      upload.on(
        "state_changed",
        (snapshot) => {
          //muestra el progreso
          let progress = Math.round(
            (snapshot.bytesTransferred * 100) / snapshot.totalBytes
          );
          let img = document.getElementById("barra");
          img.innerHTML = `
                <div class="d-flex align-items-center">
                <strong>Subiendo Imagen...${progress}</strong>
                <div class="spinner-grow ml-auto" role="status" aria-hidden="true"></div>
                </div>`;
        },
        (error) => {
          //muestra error
          swal.fire({
            title: "Ups..",
            text: "Ocurrio un error al cargar Imagen",
            icon: "error",
          });
        },
        () => {
          //cuando la imagen ya esta subida
          upload.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            this.imagen = downloadURL;
            firebaseDB
              .ref("users/" + key)
              .update({
                imagen: this.imagen,
              })
              .then(() => {
                settings.openNotificacion(
                  "primary",
                  "Imagen de Perfil Actualizada Correctamente",
                  ""
                );
              });
            document.getElementById("barra").style.display = "none";
          });
        }
      );
    },
    sendPasswordReset: function (email) {
      firebaseAuth
        .sendPasswordResetEmail(email)
        .then(() => {
          this.openNotificacion(
            "primary",
            "Se Ha Enviado Un Correo Para Restablecer Su Contraseña",
            ""
          );
        })
          .catch((e) => {
            this.openNotificacion(
              "danger",
              " Ha Ocurrido Un Error Al Intentar Enviar Un Correo Para Restablecer Su Contraseña",
              ""
            );
        });
    },

    openNotificacion: function (color, title, text) {
      this.$vs.notification({
        square: true,
        progress: "auto",
        color: color,
        title: title,
        text: text,
        position: "top-right",
      });
    },
  },
});
