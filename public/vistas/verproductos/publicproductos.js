var mostrardetalle = new Vue({
	el:"#productovista",
	data:{
		detallesprod:[],
		productosrelacionados:[]
	},
	created:function(){
		this.todo();
		this.traerproductos();
	},
	methods:{
	
		todo:function(){
			var datafromstorage=JSON.parse(sessionStorage.getItem("data"));
			this.detallesprod=datafromstorage;	
		},
		traerproductos:function(){
			fetch(`Private/Modulos/inicio/procesos.php?proceso=recibirDatos&miproducto=${JSON.stringify(this.productosrelacionados)}`).then(resp=>resp.json()).then(resp=>{
				this.productosrelacionados=resp;
			})
		}
	}
});