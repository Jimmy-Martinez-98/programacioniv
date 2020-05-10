var mostrardirecciones=new Vue({
	el:'#frm-direcciones',
	data: {
		direction:[] ,
   
		},
	created:function(){
		
		this.info();
		this.editardire(modificarD);
		
	},
	methods:{
   
		info:function(){
		   
		   fetch(`private/Modulos/direcciones/procesos.php?proceso=recibirdireccion&direction=${JSON.stringify(this.direction )}`).then( resp=>resp.json() ).then(resp=>{ 
			   this.direction = resp;	
			   
		   });	   	   
		   
		}
	
	
	}

});

