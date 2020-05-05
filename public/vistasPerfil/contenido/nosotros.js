var appnosotros=new Vue({
	el:'#frm-nosotros',
	data:{
		about:[],
		valor:''
	},
	methods:{
		buscarProductos:function(){
			fetch(`private/Modulos/usuarios/procesos.php?proceso=recibirUsuario&login=${JSON.stringify(this.name)}`).then( resp=>resp.json() ).then(resp=>{
			
			});

		}
	}

})