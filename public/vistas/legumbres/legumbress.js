var seccionlegumbre = new Vue({
	el:'#legum',
	data:{
		legumbressss:[]
	},
	methods:{
		traerlegumbres:function(){
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirlegumbres&miproducto=${JSON.stringify(this.legumbressss )}`).then( resp=>resp.json() ).then(resp=>{ 
			this.legumbressss=resp;		
			   
			 });	
		},
		verProd(info){
			var data={
				info
			 }
			 
				sessionStorage.setItem("data",JSON.stringify(data));
				location.href="productos.html"
		}
	},
	created:function(){
		this.traerlegumbres();
	}



})