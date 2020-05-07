var guardardirecciones= new Vue({
	el:'#nuevaD1',
	data:{
		nuevaD:{
			iddireccion	:0,
		
			usuario:{
				idusuario:0
			},
			accion	:'nuevo'


		},
		usuario:{}
	},
	methods:{
		almacenar:function(){
			fetch(`private/Modulos/direcciones/procesos.php?proceso=recibirDatos&direction=${JSON.stringify(this.nuevaD)}`).then( resp=>resp.json() ).then(resp=>{
                this.nuevaD.msg = resp.msg;
            });
		}
	
	}


})