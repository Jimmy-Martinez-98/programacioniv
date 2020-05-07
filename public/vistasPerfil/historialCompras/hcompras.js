var appprod = new Vue({
	el: '#productoss',
	data: {
	 productos:[],

	 },
	 created:function(){
		 
		 this.fullp();
		 
	 },
	 methods:{
	
		 fullp:function(){
			
			fetch(`private/Modulos/compras/procesos.php?proceso=recibirDatos&mostrar=${JSON.stringify(this.productos)}`).then( resp=>resp.json() ).then(resp=>{ 
				this.productos = resp;	
				
			});
		
		 }
		}
	})
