
/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file horario.js-> Sirve para el guardado de el horario de trabajo
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var apphorarios = new Vue({
    el: '#horarioos',
    data: {
        horario: {
            id_horario: 0,
            id_info: '',
            Horas1: '',
            HORA2: '',
            DE: '',
            A: '',
            Dias: '',
            accion: 'nuevo'
        }
    },
    created: function () {
        this.idtablainfo();
    },
    methods: {

        /**
         * Trae la informacion del Horario
         * @access public
         * @function idtablainfo
         */
        idtablainfo: function () {
            fetch(`Private/Modulos/about/procesos.php?proceso=traeridinfo&nosotros=""`).then(resp => resp.json()).then(resp => {
                this.horario.id_info = resp[0].infoUsuario;
            });
        },

        /**
         * Guarda el nuevo horario
         * @access public
         * @function guardar_horario
         */
        guardar_horario: function () {
            fetch(`Private/Modulos/about/procesos.php?proceso=recibirhorario&nosotros=${JSON.stringify(this.horario)}`).then(resp => resp.json()).then(resp => {
                if (resp.msg != 'Horario Guardado Correctamente') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: resp.msg
                    })
                } else {
                    Swal.fire({
                        icon: 'success',
                        text: resp.msg
                    })
                    appleerH.leerhorarios();
                    this.idtablainfo();
                }
            });

        },

        /**
         * Edita un Horario seleccionado
         * @access public 
         * @function editar_horario
         */
        editar_horario: function () {
            fetch(`Private/Modulos/about/procesos.php?proceso=recibirhorario&nosotros=${JSON.stringify(this.horario)}`).then(resp => resp.json()).then(resp => {
                if (resp.msg === 'Horario Actualizado Correctamentee') {
                    Swal.fire({
                        icon: 'error',
                        text: resp.msg
                    })
                } else {
                    Swal.fire({
                        icon: 'success',
                        text: resp.msg
                    })
                    appleerH.leerhorarios();
                }
            });

        },
        /**
         * Limpia los inputs
         * @access public
         * @function limpiar
         */
        limpiar: function () {
            this.horario.id_horario = 0,
            this.horario.id_inf = '';
            this.horario.Horas1 = '';
            this.horario.HORA2 = '';
            this.horario.Dias = '';
            this.horario.accion = 'nuevo';
            appleerH.leerhorarios();
        }
    }
});

