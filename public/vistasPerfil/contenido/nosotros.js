var appinfo = new Vue({
	el: '#nosotrosdiv',
	data: {
	 nosotros:[]
	 
	
		

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
			
			
			var formData=new FormData($('#imgs')[0]);
			
			
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
			this.edidar.imagenes="Private/Modulos/about/"+respuesta;
			
		
			
		
			
			
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










  var appnueva=new Vue({
	el:'#nuevam',
	data:{
		descripciones:{
			idusuario:0,
			imagen:'',
			describ:'',
			accion:'nuevo'
		},
		imglittle:''
	},
	created:function(){
		this.traerusuario();
	}
	,methods:{

		traerusuario:function(){
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=traerid&nuevoP=""`).then(resp=>resp.json()).then(resp=>{
				this.descripciones.idusuario = resp[0].idusuario;
				
			});
		},

		nuevosdatos :function () {
			fetch(`Private/Modulos/about/procesos.php?proceso=recibirdesc&nosotros=${JSON.stringify(this.descripciones)}`).then( resp=>resp.json() ).then(resp=>{ 
				if(resp.msg!="Tus datos se almacenaron exitosamente"){		
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title:resp.msg,
						showConfirmButton: false,
						timer: 1500
						
					})
					
				}else {
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: resp.msg,
						showConfirmButton: false,
						timer: 1000
					  })
				}				
			});		
		   },obtenerimagenN(e){
			
			
			let file=e.target.files[0];
			this.cargar(file);
			var respuesta=null;
			
			
			var formData=new FormData($('#datos')[0]);
			
			
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
			this.descripciones.imagen="Private/Modulos/about/"+respuesta;
			console.log(	this.descripciones.imagen="Private/Modulos/about/"+respuesta);
			
			
		
			
		
			
			
		},
		cargar(file){
			let reader=new FileReader();
			reader.onload=(e)=>{
				this.imglittle=e.target.result;
				
				
			}
			reader.readAsDataURL(file);
		},

	},
	computed:{
		bindearimagenN(){
			
			return this.imglittle;
			
			
		}
	}
});	