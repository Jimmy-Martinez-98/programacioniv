var appinfo = new Vue({
	el: '#frm-nosotros',
	data: {
	 about:[],

	 },
	 created:function(){
		 
		 this.todo();
		 
	 },
	 methods:{
	
		 todo:function(){
			
			fetch(`private/Modulos/about/procesos.php?proceso=recibirinfo&about=${JSON.stringify(this.about)}`).then( resp=>resp.json() ).then(resp=>{ 
				this.about = resp;	
				return console.log('objeto',this.about[0]);
				
			});
			
			
			
		 },
		
		 editar:function(abouts){
			appinfo.abouts= abouts;
				appinfo.abouts[0].accion = 'modificar';
				console.log('array',abouts[0].Vision,abouts[0].Mision);	
			 }
		
		
	 }
	
  });

