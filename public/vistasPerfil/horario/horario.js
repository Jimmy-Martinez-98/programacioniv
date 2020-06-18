

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
                        appleerH.leerhorarios();
                        this.idtablainfo();
                    }
                });
                
        },
        editar_horario:function () {
            fetch(`Private/Modulos/about/procesos.php?proceso=recibirhorario&nosotros=${JSON.stringify(this.horario)}`).then(resp=>resp.json()).then(resp=>{
                if(resp.msg==='Horario Actualizado Correctamentee'){
                    Swal.fire({
                        icon: 'error',
                        text: resp.msg
                    }) 
                }else{
                    Swal.fire({
                        icon: 'success',
                        text: resp.msg
                    })
                    appleerH.leerhorarios();
                }
            });
        
        },
        limpiar:function () {
            this.horario.id_horario=0,
            this.horario.id_inf='';
            this.horario .Horas1='';
            this.horario.HORA2='';
            this.horario .Dias='';
            this.horario.accion='nuevo';
            appleerH.leerhorarios();
        }    
        }

});

