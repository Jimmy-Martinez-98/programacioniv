var appedit = new Vue({
	el: '#modalEdit',
	data: {
	 nosotross:{
		
            infoperfil   : 0,
			accion       : 'nuevo',
			fkusuario	 :'',
            mision   	 : '',
            vision   	 : '',
            valores		 : '',
            principios	 : '',
            msg      	 : ''
		 },
		 about:{}

	 },
	 methods:{
		guardar:function(){
			console.log('hola');
			
		fetch(`private/Modulos/about/procesos.php?proceso=recibirDatos&nosotross=${this.nosotross}`).then( resp=>resp.json() ).then(resp=>{ 
			this.nosotross = resp;          
		  });
		},
		actualizar:function(about){
			appinfo.about=about;
			appinfo.about.accion='modificar';
		}
	 }
	
  });