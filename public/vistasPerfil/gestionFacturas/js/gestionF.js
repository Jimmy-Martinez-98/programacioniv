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
         * 
         * 
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
        traerUserOrder: function (user) {
            firebaseDB.ref('users/').orderByChild('uId').equalTo(user).on('value', snap => {
                snap.forEach(element => {
                    if (user == element.val().uId) {
                        this.OwnerOfOrder = element.val().nombreUsuario
                    }

                });
            })
        },
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