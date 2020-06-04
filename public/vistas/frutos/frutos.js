var seccionfrutas =new Vue({
	el:'#frutas',
	data:{
		fruta:[],
		valor:''
	},
		created:function(){
			this.traer();
			
		},
	methods:{
			traer(){
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirfrutos&miproducto=${JSON.stringify(this.fruta)}`).then(resp=>resp.json()).then(resp=>{
				this.fruta=resp;	
					
			});
		},
		buscarF:function(){		
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=buscarproductoss&miproducto=${this.valor}`).then(resp=>resp.json()).then(resp=>{
					console.log(resp);
				this.fruta=resp;	
            });

		  }
		,
		verProd(info){
			var data={
			   info
			}
			
			   sessionStorage.setItem("data",JSON.stringify(data));
			   location.href="productos.html"
			}   

	}
})