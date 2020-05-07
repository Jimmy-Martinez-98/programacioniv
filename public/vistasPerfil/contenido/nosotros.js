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
				
			});
			
			
			
		 },
		 editar:function(abouts){
		appedit.abouts= abouts;
			appedit.abouts.accion = 'modificar';
			console.log(abouts);	
		 }
	
		
		
	 }
	
  });

