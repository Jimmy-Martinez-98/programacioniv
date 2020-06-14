
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
        modifier:function(id) {    
        apphorarios.horario=id;
        apphorarios.horario.accion="modificar"
       
         
         }
    }


})