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
                    fetch(`Private/Modulos/misproductos/proceso.php?proceso=DelItemList&miproducto=${miproducto}`)
                    .then(resp=>resp.json()).then(resp=>{
                        if (resp.msg!='Eliminado de la Lista') {
							Swal.fire(
								'Ups...!',
								'Ocurrio un Error Inesperado!'
								
							);
						}else{
							Swal.fire(
								'Eliminado de la Lista!',
								resp.msg,
								'success'
								
							);
                            this.Lista_Deseos();
						}
					});
				}
			});	
            
            
        }
    },
    created:function(){
        this.Lista_Deseos();
    }
})