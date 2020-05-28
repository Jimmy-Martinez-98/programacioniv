var appinfo = new Vue({
	el: '#nosotrosdiv',
	data: {
	 nosotros:[],
	
		

	 },
	 created:function(){
		 
		 this.todo();
		 this.editardatos();
		 
	 },
	 methods:{
	
		 todo:function(){
		
			fetch(`Private/Modulos/about/procesos.php?proceso=recibirinfo&nosotros=${JSON.stringify(this.nosotros)}`).then( resp=>resp.json() ).then(resp=>{ 
				this.nosotros =resp[0];
				
				
								
			});		
			
			
		 },
		 editardatos(id){
			 appedit.edidar.descripcion=id.descripcion,
			 appedit.edidar.imagenes=id.imagen
			 appedit.edidar.accion=accion='modificar'
		 
		 }
		
	 }
	
  });



  var appedit = new Vue({
	el: '#modaleditar',
	data: {

		edidar:{
			accion:'nuevo',
			imagenes:'',
			descripcion:'',
			usu:'',
			infousuario:''
			
		},
		datos:{
			idusuario:0,
			
		},
	 imagenlittle:''
	 },
	created:function(){
		this.traerid();
		this.infousuario();
	},
	 methods:{
		 infousuario:function(){
			fetch(`Private/Modulos/about/procesos.php?proceso=traeridinfo&nosotros=""`).then(resp=>resp.json()).then(resp=>{
				this.edidar.infousuario=resp[0].infoUsuario;
				
				
				
				
			})
		 },

		guardar:function(){		
		
			
				fetch(`private/Modulos/about/procesos.php?proceso=recibirDatos&nosotros=${JSON.stringify(this.edidar)}`).then( resp=>resp.json() ).then(resp=>{ 
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
		},
	
		obtenerimagen(e){
			
			
			let file=e.target.files[0];
			this.cargar(file);
			var respuesta=null;
			
			
			var formData=new FormData($('#imagens')[0]);
			
			
			var ruta='Private/Modulos/about/guardarimagencoo.php';
			
			$.ajax({
				type: "POST",
				url: ruta,
				data: formData,
				contentType:false,
				processData:false,
				async:false,
				success: function (response) {
				respuesta=response;
				}
				
			});
			this.edidar.imagenes="Private/Modulos/about/"+respuesta
			
		
			
		
			
			
		},
		cargar(file){
			let reader=new FileReader();
			reader.onload=(e)=>{
				this.imagenlittle=e.target.result;
				
				
			}
			reader.readAsDataURL(file);
		},
		traerid:function(){
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=traerid&nuevoP=""`).then(resp=>resp.json()).then(resp=>{
				this.datos.idusuario = resp[0].idusuario;
				
				this.edidar.usu= this.datos.idusuario;
		
				
				
			})
		}
	 },
	 computed:{
		bindearimagen(){
			
			return this.imagenlittle;
			
			
		}
	}
  });