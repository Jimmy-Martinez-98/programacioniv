
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
        fetch(`Private/Modulos/about/procesos.php?proceso=recibirlectura&nosotros=${JSON.stringify(this.horarios)}`).then(resp=>resp.json()).then(resp=>{
         this.horarios=resp;
            
        })
        },
        modifier:function(id) {    
        apphorarios.horario=id;
        apphorarios.horario.accion="modificar"
       
         
         }
    }


})

var apphorarios=new Vue({
    el:'#horarioos',
    data:{
        horario:{
            id_horario:0,
            id_info:'',
            Horas1:'',
            HORA2:'',
            DE    :'',
            A     :'',
            Dias:'',
            accion:'nuevo'
        }
    },
    created:function () {
        this.idtablainfo();
      },
    methods:{


        idtablainfo:function(){	
			fetch(`Private/Modulos/about/procesos.php?proceso=traeridinfo&nosotros=""`).then(resp=>resp.json()).then(resp=>{
                this.horario.id_info=resp[0].infoUsuario;	
              
                
            });
        },
        guardar_horario:function () {
                fetch(`Private/Modulos/about/procesos.php?proceso=recibirhorario&nosotros=${JSON.stringify(this.horario)}`).then(resp=>resp.json()).then(resp=>{
                    if(resp.msg!='Horario Guardado Correctamente'){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: resp.msg
                           
                          })
                          
                    }else{
                        Swal.fire({
                            icon: 'success',
                            text: resp.msg
                          })
                    }
                });
            
            },
            editar_horario:function () {
                fetch(`Private/Modulos/about/procesos.php?proceso=recibirhorario&nosotros=${JSON.stringify(this.horario)}`).then(resp=>resp.json()).then(resp=>{
                    if(resp.msg!='Horario Actualizado Correctamentee'){
                        Swal.fire({
                            icon: 'success',
                            title: 'Felicidades',
                            text: resp.msg
                           
                          })
                        this.horario='';
                    }else{
                        Swal.fire({
                            icon: 'error',
                            text: resp.msg
                          })
                          this.horario.id_info='',
                          this.Horas1='',
                          this.HORA2='',
                          this.DE='',
                          this.A='',
                          this.Dias='',
                          this.accion='nuevo'
                    }
                });
              }
           
          }

});

