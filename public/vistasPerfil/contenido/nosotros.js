var appinfo = new Vue({
	el: '#frm-nosotros',
	data: {
	 about:[]

	 },
	 created:function(){
		 console.log('iniciar...');
		 this.todo();
		 
	 },
	 methods:{
		 todo:function(){
			fetch(`private/Modulos/about/procesos.php?proceso=recibirinfo&about=${this.about}`).then( resp=>resp.json() ).then(resp=>{ 
				this.about = resp;
				
				
            });
		 }
	
		
		
	 }
	
  });

 