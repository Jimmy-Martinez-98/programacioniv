var misproductosapp = new Vue({
	el: '#misprod',
	data: {
	 myproductos:[],
	
	 },
	 created:function(){
		 
		 this.productosmios();
		 
	 },
	 methods:{
	
		 productosmios:function(){
			
			
			fetch(`Private/Modulos/misproductos/proceso.php?proceso=recibirDatos&miproducto=${JSON.stringify(this.myproductos)}`).then( resp=>resp.json() ).then(resp=>{ 
					this.myproductos = resp;	
				
			});
			
		 }
		}
		 
	})