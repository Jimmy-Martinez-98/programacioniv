var guardardirecciones= new Vue({
	el:'#moddirec',
	data:{
		modificarD:{
			iddireccion	:0,
			idusuario	:0,
			direccion	:'',
			accion		:'nuevo'


		},
		
	},
	methods:{
		actualizar:function(){
			fetch(`private/Modulos/direcciones/procesos.php?proceso=recibirDatos&direction=${JSON.stringify(this.modificarD)}`).then( resp=>resp.json() ).then(resp=>{
				this.modificarD.msg = resp.msg;
				
            });
		},
	
	}


});

