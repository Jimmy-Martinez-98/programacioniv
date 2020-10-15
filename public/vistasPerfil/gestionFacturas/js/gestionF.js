/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file gestionF.js-> Es la vista de gestion de facturas
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var factura = new Vue({
    el: "#factura",
    data: {
        OwnerOfOrder: "",
        datos: [],
        forPage: 7,
        pages: [],
        page: 1,
    },
    /**
     * Esta funcion llama a metodos para ejecutarlos al cargar el DOM
     * @access public
     * @function created
     */
    created: function () {
        this.observador();

    },

    computed: {
        displayFacturas: function () {
            return this.paginate(this.datos);
        },
        updateData: function () {
            this.observador()
        }
    },
    watch: {
        updateData() {},
        datos() {
            return this.setFacturas();
        },

    },
    methods: {
        /**
         * observa el estado de la session en la web
         * @access public
         * @function observador
         */
        async observador() {
            await firebaseAuth.onAuthStateChanged((user) => {
                if (user) {
                    firebaseDB.ref("dataFacturas").on("value", (snap) => {
                        this.datos = [];
                        snap.forEach((element) => {
                            if (element.val().idOwner == user.uid) {
                                this.traerUserOrder(element.val().idOwnerOfOrder);
                                this.datos.push(element.val());
                            }
                        });
                    });

                }
            });


        },

        /**
         * Muestra el numero de paginas
         * @access public
         * @function setFacturas
         */
        setFacturas: function () {
          
            let numberOfPage = Math.ceil(this.datos.length / this.forPage);
            this.pages = [];
            for (let i = 1; i <= numberOfPage; i++) {
                this.pages.push(i);
            }
        },
        /**
         * Calcula la el numero de paginas para la tabla
         * @access public
         * @function paginate
         * @param {object} facturas -> representa el total de facturas de la db
         */
        paginate: function (facturas) {
            let page = this.page,
                forPage = this.forPage,
                from = page * forPage - forPage,
                to = pages * forPage;
            return facturas.slice(from, to);
        },

        /**
         * obtiene los datos del usuario de la BD para mostrar nombre en la vista
         * @access public
         * @function traerUserOrder
         * @param {String} user
         */
        traerUserOrder: function (user) {
            firebaseDB
                .ref("users/")
                .orderByChild("uId")
                .equalTo(user)
                .on("value", (snap) => {
                    snap.forEach((element) => {
                        if (user == element.val().uId) {
                            this.OwnerOfOrder = element.val().nombreUsuario;
                        }
                    });
                });
        },
        /**
         * es cuando el usuario clickea el item verificar del menu de opciones en la tabla
         * @access public
         * @function verificar
         * @param {String} id
         */
        verificar: function (id) {
            firebaseDB
                .ref("dataFacturas/" + id)
                .update({
                    estado: "Verificada",
                })
                .catch(() => {
                    this.$vs.notification({
                        square: true,
                        progress: "auto",
                        color: "danger",
                        title: "Ocurrio un error al intentar realizar la acción",
                        position: "bottom-center",
                        icon: "<i class='bx error-circle'></i>",
                    });
                });
        },
        /**
         * es cuando el usuario clickea el item anular del menu de opciones en la tabla
         * @access public
         * @function anular
         * @param {String} id
         */
        anular: function (id) {
            firebaseDB
                .ref("dataFacturas/" + id)
                .update({
                    estado: "Anulada",
                })
                .catch(() => {
                    this.$vs.notification({
                        square: true,
                        progress: "auto",
                        color: "danger",
                        title: "Ocurrio un error al intentar realizar la acción",
                        position: "bottom-center",
                        icon: "<i class='bx error-circle'></i>",
                    });
                });
        },
    },
});