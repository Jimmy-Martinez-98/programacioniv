var appedit = new Vue({
	el: '#modaleditar',
	data: {
	
	 abouts:{
		
            infoperfil   : 0,
			accion       : 'nuevo',
			fkusuario	 :'',
            mision   	 : '',
            vision   	 : '',
            valores		 : '',
            principios	 : '',
			msg      	 : ''
	 }
	
		 

	 },
	 methods:{
		guardar:function(){
		
			
		fetch(`private/Modulos/about/procesos.php?proceso=recibirDatos&nosotross=${this.abouts}`).then( resp=>resp.json() ).then(resp=>{ 
			this.abouts = resp;   
			
		  });
		}
	 }
	
	
  });