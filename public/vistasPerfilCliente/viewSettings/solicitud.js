/**
 * @author Jimmy Martinez <jimmimartinez215@gmail.com>
 * @file guardar.js-> Sirve para guardar datos de la direccion del usuario
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
/**
 * enviar solictud de vendedor al nodo de chat
 */
var user = firebaseAuth.currentUser;
var SolicV = new Vue({
    el: "#nuevaSoliV",
    data() {
        return {
            dataSoliV: {
                de: "",
                para: "",
                selectU: "",
                nombreCoo: "",
                nombreP: '',
                correo: "",

            },

        }

    },

    methods: {
        /** 
         * @access public
         * @function almacenar 
         * Funcion para enviar y almacenar la sovitud de vendedor en el nodo de chat
         */
        almacenar: function () {

            let tipo = this.dataSoliV.selectU;
            let nombreC = this.dataSoliV.nombreCoo;
            let nombreP = this.dataSoliV.nombreP;
            let correo = this.dataSoliV.correo;
            if (tipo != '' && correo != '' && nombreC != '' || nombreP != '') {
                if (tipo == 'Cooperativa') {
                    return firebaseDB
                        .ref("/chat")
                        .push({
                            De: user.uid,
                            Para: "73BoHGyTnzYYYCtUK1q5aoGrhas2",
                            Mensaje: "tipo de suario: " + tipo + "\n" +
                                ", Nombre: " + nombreC + "\n" +
                                ", Correo: " + correo,
                        })
                        .then(() => {
                            this.limpieza()
                            this.openNotificacion('success',
                                'Solicitud Enviada!!',
                                'En la bandeja de sus chats vera su mensaje con el chat de administrador :)')
                        });

                } else if (tipo == "Productor pequeño") {


                    return firebaseDB
                        .ref("/chat")
                        .push({
                            De: user.uid,
                            Para: "73BoHGyTnzYYYCtUK1q5aoGrhas2",
                            Mensaje: "tipo de suario: " + tipo + "\n" +
                                ", Nombre: " + nombreP + "\n" +
                                ", Correo: " + correo,
                        })
                        .then(() => {
                            this.limpieza()
                            this.openNotificacion('success', 'Solicitud Enviada!!', 'En la bandeja de sus chats vera su mensaje con el chat de administrador :)')
                        });
                }

            } else {

                this.openNotificacion('danger', 'Complete los campos', '')
            }

        },
        closeX: function () {
            this.limpieza()
        },
        closebtn: function () {
            this.limpieza()
        },
        limpieza: function () {
            this.dataSoliV.selectU = "";
            this.dataSoliV.nombreC = "";
            this.dataSoliV.correo = "";
            this.dataSoliV.nombreP = "";
        },
        /**
         * 
         * @param {String} color -> representa el color de la notificacion 
         * @param {String} title -> representa el titulo de la notificacion
         * @param {String} text  -> representa el texto de la notificacion
         */
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
    }
})