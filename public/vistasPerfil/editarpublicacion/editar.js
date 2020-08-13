/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file editar.js-> Sirve para la edicion de productos
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */

var appeditP = new Vue({
  el: "#frm-edit",
  data: {
    mod: {
      miproducto: 0,
      fk_idusuario: 0,
      nombre_producto: "",
      descprod: "",
      codigo_producto: "",
      categoria: "",
      imagen: "",
      Libra: "",
      Arroba: "",
      Quintal: "",
      existencias: "",
      precio: "",
      precio_venta: "",
      fecha_subida: "",
      Caja: "",
      Unidad:''
    },
    imagenlittle: "",
  },
  methods: {
    /**
     * Actualiza los datos de producto seleccionado
     * @access public
     * @function editar
     */
    ModificarPublicacion: function () {
      if (
        appeditP.mod.miproducto != "" &&
        appeditP.mod.fk_idusuario != "" &&
        appeditP.mod.nombreProducto != "" &&
        appeditP.mod.descProducto != "" &&
        appeditP.mod.codeProducto != "" &&
        appeditP.mod.categoria != "" &&
        appeditP.mod.existencias != "" &&
        appeditP.mod.precio != "" &&
        appeditP.mod.precioVenta != "" &&
        appeditP.mod.fechaSubida != ""
        
      ) {
       
        let dbChild = firebaseDB.ref("Productos/" + appeditP.mod.miproducto);
        let data = appeditP.jsonParse(
          appeditP.mod.miproducto,
          appeditP.mod.fk_idusuario,
          appeditP.mod.nombreProducto,
          appeditP.mod.descProducto,
          appeditP.mod.codeProducto,
          appeditP.mod.categoria,
          appeditP.mod.existencias,
          appeditP.mod.precio,
          appeditP.mod.precioVenta,
          appeditP.mod.fechaSubida,
          appeditP.mod.libra,
          appeditP.mod.Arroba,
          appeditP.mod.Quintal,
          appeditP.mod.Caja,
          appeditP.mod.Unidad
        );

        dbChild
          .update(data)
          .then(() => {
            swal.fire({
              title: "ok",
              text: "Producto Modificado existosamente",
              icon: "success",
            });
            appeditP.limpiar();
          })
          .catch((error) => {
            console.log(error);
          });
        apptodoP.buscar();
      } else {
        swal.fire({
          title: "Error",
          text: "Los campos estan vacios",
          icon: "error",
        });
        
      }
     
      
    },
    jsonParse: function (
      id,
      idU,
      nombre,
      descripcion,
      codigo,
      categoria,
      cantidad,
      precio,
      preciov,
      fecha,
      libra,
      Arroba,
      Quintal,
      Caja,
      Unidad
    ) {
      let data = {
        idProducto: id,
        idUsuario: idU,
        nombreProducto: nombre,
        descProducto: descripcion,
        codeProducto: codigo,
        categoria: categoria,
        existencias: cantidad,
        precio: precio,
        precioVenta: preciov,
        fechaSubida: fecha,
        libra: libra,
        Arroba: Arroba,
        Quintal: Quintal,
        Caja: Caja,
        Unidad: Unidad,
      };
      return data;
    },
    limpiar: function () {
      this.mod.miproducto = "";
      this.mod.idUsuario = "";
      this.mod.descProducto = "";
      this.mod.codeProducto = "";
      this.mod.categoria = "";
      this.mod.imagen = "public/img/ico.png";
      this.mod.libra = "";
      this.mod.Arroba = "";
      this.mod.Quintal = "";
      this.mod.Caja = "";
      this.mod.Unidad = "";
      this.mod.existencias = "";
      this.mod.precio = "";
      this.mod.precioVenta = "";
      this.mod.fechaSubida = "";
      this.mod.nombreProducto = "";
    },

    /**
     * Obtiene la imagen que esta en el tag img para guardarlo en carpeta y
     *  asignarlo a updatefoto.imagen su direccion
     * @access public
     * @function obtenerimagen
     * @param {objec} e - Representa el cambio en el tag img
     */
    obtenerimagen: function (e) {
      let file = e.target.files[0];
      let upload = storage
        .ref()
        .child("productos/" + file.name)
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
            text: "Ocurrio al cargar Imagen",
            icon: "error",
          });
        },
        () => {
          //cuando la imagen ya esta subida
          upload.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            appeditP.mod.imagen = downloadURL;
            document.getElementById("barra").style.display = "none";
          });
        }
      );
    },
  },
});

/**
 * @instance objeto de instancia de Vue.js
 */
var apptodoP = new Vue({
  el: "#frmMis",
  data: {
    valor: "",
    todo_prod: [],
  },
  methods: {
    /**
     * Busca los productos y si el input se digita algo lo busca en base a eso
     * @access public
     * @function busca
     */
    buscar: function () {
      var user = firebase.auth().currentUser;
      let dbchild = firebaseDB.ref("Productos/");
      if (user) {
        /*orderByChild(funciona como el select)
         * equalTo(funciona como el where)
         *starAt - funciona igual que where solo que muestra los datos tipo mas acertados
         * en la busqueda
         */
        dbchild
          .orderByChild("nombreProducto")
          .startAt(this.valor)
          .on("value", (snapshot) => {
            let todoProducto = [];
            snapshot.forEach((element) => {
              if (user.uid === element.val().idUsuario) {
                todoProducto.push(element.val());
              }
            });
            this.todo_prod = todoProducto;
          });
        if (this.valor === "") {
          this.autoSearch();
        }
      } else {
        // No user is signed in.
      }
    },

    /**
     * Asigna los datos del item seleccionado para su modificacion
     *@access public
     *@function modi
     * @param {object} id - Representa los datos del item seleciconado
     */
    modi: function (id) {
      appeditP.mod.miproducto=id.idProducto
        appeditP.mod.fk_idusuario=id.idUsuario
        appeditP.mod.nombreProducto=id.nombreProducto
        appeditP.mod.descProducto=id.descProducto
        appeditP.mod.codeProducto=id.codeProducto
        appeditP.mod.categoria=id.categoria
        appeditP.mod.existencias=id.existencias
        appeditP.mod.precio=id.precio
        appeditP.mod.precioVenta=id.precioVenta
        appeditP.mod.fechaSubida=id.fechaSubida
        appeditP.mod.libra=id.libra
        appeditP.mod.Arroba=id.Arroba
        appeditP.mod.Quintal=id.Quintal
        appeditP.mod.Caja=id.Caja
        appeditP.mod.Unidad=id.Unidad
        appeditP.mod.imagen=id.imagen
    },
    autoSearch: function () {
      var user = firebase.auth().currentUser;
      let dbchild = firebaseDB.ref("Productos/");
      dbchild.on("value", (snapshot) => {
        let todoProducto = [];
        snapshot.forEach((element) => {
          if (user.uid === element.val().idUsuario) {
            todoProducto.push(element.val());
          }
        });
        this.todo_prod = todoProducto;
      });
    },
  },
  created: function () {
    this.buscar();
    this.autoSearch();
  },
});
