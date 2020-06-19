/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file cuenta.js-> Sirve para la eliminar un horario y pasar datos para modificar
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var appleerH = new Vue({
    el:'#leerhorario',
    data:{
        horarios:[]
    },
    created:function(){
        this.leerhorarios();
    },
    methods:{

        /**
         * Trae los horarios del usuario
         * @access public 
         * @function leerhorarios
         */
        leerhorarios:function(){
            fetch(`Private/Modulos/about/procesos.php?proceso=leer&nosotros=${this.horarios}`).then(resp=>resp.json()).then(resp=>{
                this.horarios=resp;
            });
        },
        /**
         * pasa los datos del item seleccionados a apphorarios.horario para su modificacion
         * @access public
         * @function modifier
         * @param {object} Htrabajo - Representa los datos del item 
         */
        modifier:function(Htrabajo) {    
            apphorarios.horario=Htrabajo;
            apphorarios.horario.accion='modificar';
        },

        /**
         * Elimina un item 
         * @access public
         * @function deleteH
         * @param {Int} id_horario - Representa el identificador del item a eliminar 
         */
        deleteH:function (id_horario) { 
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminalo!'
            }).then((result) => {
                if (result.value) {
                    fetch(`Private/Modulos/about/procesos.php?proceso=eliminarhorario&nosotros=${id_horario}`).then(resp=>resp.json()).then(resp=>{
                        Swal.fire(
                            'Eliminado!',
                            resp.msg,
                            'success'
                        )
                        this.leerhorarios();
                        apphorarios.idtablainfo();
                    });
                }
            });	
        }
    }
});