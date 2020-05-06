var appdirecciones=new Vue({
	el:'#frm-direcciones',
	data: {
		direction:[] ,
   
		},
	created:function(){
		
		this.info();
		
	},
	methods:{
   
		info:function(){
		   
		   fetch(`private/Modulos/direcciones/procesos.php?proceso=recibirdireccion&direction=${this.direction}`).then( resp=>resp.json() ).then(resp=>{ 
			   this.direction = resp;	
			   
		   });
		   
		   
		   
		}
	}

})