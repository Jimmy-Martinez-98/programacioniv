var seccionverduras =new Vue({
	el:'#vegetales',
	data:{
		verdes:[]
	},
		created:function(){
			this.traer();
		},
	methods:{
			traer(){
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirverduras&miproducto=${JSON.stringify(this.verdes)}`).then(resp=>resp.json()).then(resp=>{
				this.verdes=resp;	
				console.log(resp);
						
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