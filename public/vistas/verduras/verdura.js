var seccionverduras =new Vue({
	el:'#vegetales',
	data:{
		verdes:[],
		
		valor:''
	},
		created:function(){
			this.traer();
		},
	methods:{
		
		
			traer(){
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirverduras&miproducto=${JSON.stringify(this.verdes)}`).then(resp=>resp.json()).then(resp=>{
				this.verdes=resp;	
			
						
			});
		},
		autobusquda:function(){
			if(this.valor==''){
				this.traer();
			}
		},
		buscarV:function () {
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=buscarproductosV&miproducto=${this.valor}`).then(resp=>resp.json()).then(resp=>{
				
				this.verdes=resp;	
				

            });
		  }
		,
		verProd(info){
			var data={
			   info
			}
			
			   sessionStorage.setItem("data",JSON.stringify(data));
			   location.href="productos.html"
			},
			descP:function () { 

				fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirbusquedatipo&miproducto=${JSON.stringify(this.verdes)}`).then(resp=>resp.json()).then(resp=>{		
					this.verdes=resp;	
						
						});
			} ,
			ascP:function () { 
				fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirbusquedatipovasc&miproducto=${JSON.stringify(this.verdes)}`).then(resp=>resp.json()).then(resp=>{		
					this.verdes=resp;	
						
						});
			 }

	}
})