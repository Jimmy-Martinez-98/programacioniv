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
		guardar(){
			console.log('hola',abouts);
			
		fetch(`private/Modulos/about/procesos.php?proceso=recibirDatos&nosotross=${this.nosotross}`).then( resp=>resp.json() ).then(resp=>{ 
			this.about = resp;          
		  });
		},
	 }
	
  });