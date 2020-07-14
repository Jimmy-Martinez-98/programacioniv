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
      msg: "",
    },
    imagenlittle: "",
  },
  methods: {
    /**
     * Actualiza los datos de producto seleccionado
     * @access public
     * @function editar
     */
    editar: function () {
      if (
        this.mod.idProducto === "" &&
        this.mod.idUsuario === "" &&
        this.mod.nombreProducto === "" &&
        this.mod.descProducto === "" &&
        this.mod.codeProducto === "" &&
        this.mod.categoria === "" &&
        this.mod.existencias === "" &&
        this.mod.precio === "" &&
        this.mod.caja === "" &&
        this.mod.unidad === "" &&
        this.mod.precioVenta === "" &&
        this.mod.fechaSubida === "" &&
        this.mod.libra === "" &&
        this.mod.arroba === "" &&
        this.mod.quintal === ""
      ) {
        swal.fire({
          title: "Error",
          text: "Los campos estan vacios",
          icon: "warning",
        });
      } else {
        let dbChild = firebaseDB.ref("Productos/" + this.mod.idProducto);

        let data = this.jsonParse(
          this.mod.idProducto,
          this.mod.idUsuario,
          this.mod.nombreProducto,
          this.mod.descProducto,
          this.mod.codeProducto,
          this.mod.categoria,
          this.mod.existencias,
          this.mod.precio,
          this.mod.precioVenta,
          this.mod.fechaSubida,
          this.mod.libra,
          this.mod.arroba,
          this.mod.quintal,
          this.mod.caja,
          this.mod.unidad
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
      arroba,
      quintal,
      caja,
      unidad
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
        arroba: arroba,
        quintal: quintal,
        caja: caja,
        unidad: unidad,
      };
      return data;
    },
    limpiar: function () {
      this.mod.idProducto = "";
      this.mod.idUsuario = "";
      this.mod.descProducto = "";
      this.mod.codeProducto = "";
      this.mod.categoria = "";
      this.mod.imagen = "public/img/ico.png";
      this.mod.libra = "";
      this.mod.arroba = "";
      this.mod.quintal = "";
      this.mod.caja = "";
      this.mod.unidad = "";
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
      var respuesta = null;
      let file = e.target.files[0];
      var formdata = new FormData($("#frm-edit")[0]);
      var ruta = "Private/Modulos/guardarruta.php";

      $.ajax({
        type: "POST",
        url: ruta,
        data: formdata,
        contentType: false,
        processData: false,
        async: false,
        success: function (response) {
          respuesta = response;
        },
      });
      this.mod.imagen = "Private/Modulos/" + respuesta;
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
      };
      reader.readAsDataURL(file);
    },
  },
  computed: {
    /**
     * Retorna la imagen en el tag img
     * @access public
     * @function imagenes
     * @returns imagenlittle - Representa la imagen en si
     */
    imagen() {
      return this.imagenlittle;
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
      appeditP.mod = id;
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
