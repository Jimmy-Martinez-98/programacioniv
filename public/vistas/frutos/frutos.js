var seccionfrutas =new Vue({
	el:'#frutas',
	data:{
		fruta:[]
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
		verProd(info){
			var data={
			   info
			}
			
			   sessionStorage.setItem("data",JSON.stringify(data));
			   location.href="productos.html"
			}   

	}
})