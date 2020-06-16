var AppListaD =new Vue({
    el:'#list_deseos',
    data:{
        AllDeseos:[]
    },
    methods:{
        Lista_Deseos:function(){
            fetch(`Private/Modulos/misproductos/proceso.php?proceso=lista_deseos&miproducto=${this.AllDeseos}`).then(resp=>resp.json()).then(resp=>{
              
              this.AllDeseos=resp;  
            });
        },
        deleteproducto(miproducto){
            fetch(`Private/Modulos/misproductos/proceso.php?proceso=DelItemList&miproducto=${miproducto}`)
            .then(resp=>resp.json()).then(resp=>{
                if (resp.msg!='Eliminado de la Lista') {
                    alertify.error('Ocurrio un Error Inesperado!');
                }else{
                    alertify.success(resp.msg);
                    this.Lista_Deseos();
                }
            })
        }
    },
    created:function(){
       this.Lista_Deseos();
    }
})