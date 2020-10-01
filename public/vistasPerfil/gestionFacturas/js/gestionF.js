/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file gestionF.js-> Es la vista de gestion de facturas
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var factura = new Vue({
    el: '#factura',
    data: {
        datos: [],
        OwnerOfOrder: ''
    },
    /**
     * Esta funcion llama a metodos para ejecutarlos al cargar el DOM
     * @access public 
     * @function created 
     */
    created: function () {
        this.observador()
    },
    methods: {
        /**
         * observa el estado de la session en la web
         * @access public 
         * @function observador
         */
        observador: function () {
            firebaseAuth.onAuthStateChanged((user) => {
                if (user) {
                    firebaseDB.ref('dataFacturas').on('value', snap => {
                        snap.forEach(element => {

                            if (element.val().idOwner == user.uid) {
                                this.traerUserOrder(element.val().idOwnerOfOrder)
                                this.datos = element.val()
                            }
                        });
                    })

                }
            })
        },
        /**
         * obtiene los datos del usuario de la BD para mostrar nombre en la vista
         * @access public   
         * @function traerUserOrder
         * @param {String} user 
         */
        traerUserOrder: function (user) {
            firebaseDB.ref('users/').orderByChild('uId').equalTo(user).on('value', snap => {
                snap.forEach(element => {
                    if (user == element.val().uId) {
                        this.OwnerOfOrder = element.val().nombreUsuario
                    }

                });
            })
        },
        /**
         * es cuando el usuario clickea el item verificar del menu de opciones en la tabla 
         * @access public
         * @function verificar
         * @param {String} id 
         */
        verificar: function (id) {
            firebaseDB.ref('dataFacturas/' + id).update({
                'estado': "Verificada"
            }).then(() => {
                this.$vs.notification({
                    square: true,
                    progress: "auto",
                    color: 'success',
                    title: "Factura Verificada :)",
                    position: 'bottom-center',
                });
            })
        },
         /**
          * es cuando el usuario clickea el item anular del menu de opciones en la tabla 
          * @access public
          * @function anular
          * @param {String} id 
          */
        anular: function (id) {
            firebaseDB.ref('dataFacturas/' + id).update({
                'estado': "Anulada"
            }).then(() => {
                this.$vs.notification({
                    square: true,
                    progress: "auto",
                    color: 'success',
                    title: "Factura Anulada :)",
                    position: 'bottom-center',
                });
            })
        }
    }
})