/*
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file misproductos.js-> Sirve para la configuracion de los productos
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */

var misproductosapp = new Vue({
  el: "#misprod",
  data() {
    return {
      myproductos: [],
      valor: "",
      paginacion: [],

      allProducts: 0,
      pagPrincipal: 1,
      itemForPage: 4,
      total: [],
      page: 1,
    }
  },
  created: function () {
    this.myproductos = [];
    this.productsInTable()
    this.productosmios();
  },
  computed: {
    updateTable: function () {
      this.myproductos = [];
      this.productsInTable()
      this.productosmios();
    },
  },
  watch: {
    updateTable() {},
  },
  methods: {
    productsInTable: function () {
      let user = firebaseAuth.currentUser.uid
      let todo = []
      firebaseDB.ref('Productos')
        .limitToFirst(this.itemForPage)
        .on('value', snap => {
          todo = []
          snap.forEach(element => {
            if (user == element.val().idUsuario) {
              todo.push(element.val())
            }

          });
        })

      this.myproductos = todo;
    },
    busquedaProducto: function () {
      let user = firebase.auth().currentUser;
      let allProducts = [];
      firebaseDB
        .ref("Productos/")
        .orderByChild("nombreProducto")
        .startAt(misproductosapp.valor)
        .on("value", (snap) => {
          allProducts = [];
          snap.forEach((items) => {
            if (user.uid === items.val().idUsuario) {
              allProducts.push(items.val());
            }
          });
        });
      this.myproductos = allProducts;
    },
    openNotificacion: function (color, title, text) {
      this.$vs.notification({
        square: true,
        progress: "auto",
        color: color,
        title: title,
        text: text,
        width: "100%",
      });
    },
    onPageChange: function (numberP) {

      let user = firebaseAuth.currentUser.uid
      let todo = [];
      let page = this.itemForPage * (numberP - 1)
      console.log(page);

      firebaseDB.ref('Productos/')
        .limitToLast(this.itemForPage)
        .endAt(page)
        .on('value', snap => {
          todo = []
          snap.forEach(element => {
            if (user == element.val().idUsuario) {
              todo.push(element.val())

            }
          });
        })
      this.myproductos = todo;
    },
    onPageChangeP: function (numberP) {

      let user = firebaseAuth.currentUser.uid
      let todo = [];
      let page = this.itemForPage * (numberP - 1)
      console.log(page)
      firebaseDB.ref('Productos/')
        .limitToFirst(this.itemForPage)
        .endAt(page)
        .on('value', snap => {
          todo = []
          snap.forEach(element => {
            if (user == element.val().idUsuario) {
              todo.push(element.val())
            }
          });
        })
      this.myproductos = todo;
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
      confirmModificacion.modificacion.pU = id.precioUnidad;
      confirmModificacion.modificacion.pL = id.precioLibra;
      confirmModificacion.modificacion.pA = id.precioArroba;
      confirmModificacion.modificacion.pQ = id.precioQuintal;
      confirmModificacion.modificacion.pC = id.precioCaja;
    },

    /**
     * Mustra los productos del usuario
     * @access public
     * @function productosmios
     */
    productosmios: function () {
      var user = firebase.auth().currentUser;
      let dbchild = firebaseDB.ref("Productos/");
      if (user) {
        let todoProducto = [];

        dbchild.on("value", (snapshot) => {
          todoProducto = [];
          this.total = []
          let total = []
          snapshot.forEach((element) => {
            if (user.uid === element.val().idUsuario) {
              todoProducto.push(element.val());
              total.push(element.val())
            }
          });
          let to = todoProducto.length
          this.paginacion = Math.ceil(to / this.itemForPage)
          

          this.total = total.length
        });
      } else {
        // No user is signed in.
      }
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
                  "El Producto Fue Eliminado Exitosamente :)"
                );
              })
              .catch((error) => {
                swal.fire({
                  title: "Ups..",
                  text: "Ocurrio un error inesperdado",
                  icon: "error",
                });
              });
          }
        });
    },
  },
});

var guardarProducto = new Vue({
  el: "#addP",
  data: {
    agregar: {
      arroba: false,
      caja: false,
      quintal: false,
      unidad: false,
      categoria: false,
      pU: "",
      pL: "",
      pA: "",
      pQ: "",
      pC: "",
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
    },
  },
  created: function () {
    this.datosUser();
  },
  methods: {
    limpiar: function () {
      this.agregar.codeProducto = "";
      this.agregar.nombrePro = "";
      this.agregar.categoria = "";
      this.agregar.codeProducto = "";
      this.agregar.descProducto = "";
      this.agregar.existencias = "";
      this.agregar.fechaSubida = "";
      this.agregar.idProducto = "";
      this.agregar.idUsuario = "";
      this.agregar.imagen = "";
      this.agregar.libra = "";
      this.agregar.nombreCooperativa = "";
      this.agregar.nombreProducto = "";
      this.agregar.nombreUsuario = "";
      this.agregar.precioVent = "";
      this.agregar.arroba = "";
      this.agregar.caj = "";
      this.agregar.quintal = "";
      this.agregar.unidad = "";
      this.agregar.categoria = "";
      this.agregar.pU = "";
      this.agregar.pL = "";
      this.agregar.pA = "";
      this.agregar.pQ = "";
      this.agregar.pC = "";
    },
    limpieza: function () {
      this.limpiar();
    },
    cerrar: function () {
      this.limpiar();
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
            "Por Favor Espere A Que La Imagen Se Carge O Completa Los Campos Faltantes"
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
    datosUser: function () {
      let user = firebaseAuth.currentUser.uid;
      firebaseDB
        .ref("/users")
        .orderByChild("uId")
        .equalTo(user)
        .on("value", (snap) => {
          snap.forEach((element) => {
            this.agregar.nombreUsuario = element.val().nombreUsuario;
            this.agregar.idUsuario = element.val().uId;
            this.agregar.nombreCooperativa = element.val().nombreCooperativa;
          });
        });

      var nueva = firebaseDB.ref().child("Productos/").push().key;
      this.agregar.idProducto = nueva;
    },
    subirImagen: function (e) {
      let file = e.target.files[0];
      let random = Math.random();
      let upload = storage
        .ref()
        .child("productos/" + file.name + random)
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
                <div class="progress">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    style="width: ${progress}%;"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    ${progress}%
                  </div>
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
            guardarProducto.agregar.imagen = downloadURL;
            document.getElementById("barra").style.display = "none";
          });
        }
      );
    },
    openNotificacion: function (color, title, text, icon) {
      this.$vs.notification({
        square: true,
        icon: icon,
        progress: "auto",
        color: color,
        title: title,
        text: text,
        width: "100%",
      });
    },
  },
});