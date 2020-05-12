var appinfo = new Vue({
	el: '#nosotrosdiv',
	data: {
	 nosotros:[]

	 },
	 created:function(){
		 
		 this.todo();
		 this.editardatos(sobreN);
		 
	 },
	 methods:{
	
		 todo:function(){
			
			fetch(`Private/Modulos/about/procesos.php?proceso=recibirinfo&nosotros=${JSON.stringify(this.nosotros)}`).then( resp=>resp.json() ).then(resp=>{ 
				this.nosotros = resp;	
					
			});			
		 },
		 editardatos:function(sobreNs){		
			appedit.sobreN = sobreNs;
			appedit.sobreN.accion = 'modificar';   
			console.log('array',sobreNs.Mision);	
		}
		
		
	 }
	
  });



  var appedit = new Vue({
	el: '#modaleditar',
	data: {
	 sobreN:{	
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
		fetch(`private/Modulos/about/procesos.php?proceso=recibirDatos&nosotros=${this.sobreN}`).then( resp=>resp.json() ).then(resp=>{ 
			if(resp.msg!='Datos Actualizados Exitosamente'){
				Swal.fire({
					position: 'top-end',
					icon: 'warning',
					title: resp.msg,
					showConfirmButton: false,
					timer: 1500
				  })	
			}else{
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: resp.msg,
					showConfirmButton: false,
					timer: 1500
				  })	
			}
		  });
		}
	 }
  });