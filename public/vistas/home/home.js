var app=new Vue({
	el:"#slider",
	data:{
	   productos:[]
	  
	  
	 
	},
	created:function(){
	this.datoss();
	
	},
	methods:{
	 
	
	   datoss:function(){         
		  fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirDatos&miproducto=${JSON.stringify(this.productos )}`).then( resp=>resp.json() ).then(resp=>{ 
			 this.productos = resp;		
			
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
	
	});
 