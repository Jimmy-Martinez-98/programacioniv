
var appleerH = new Vue({
    el:'#leerhorario',
    data:{
        horarios:[]
    },
    created:function(){
        this.leerhorarios();
    },
    methods:{
        leerhorarios:function(){
        fetch(`Private/Modulos/about/procesos.php?proceso=leer&nosotros=${this.horarios}`).then(resp=>resp.json()).then(resp=>{
         this.horarios=resp;
            
        });
        },
        modifier:function(Htrabajo) {    
        apphorarios.horario=Htrabajo;
        apphorarios.horario.accion='modificar';
         },
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
                    });
                }
              })	
              
              this.leerhorarios();

          
            }
    }


})