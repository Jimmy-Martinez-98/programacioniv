var datosCuenta =new Vue({
	el:'#cuenta',
	data:{
		datoscuenta:[]
	},methods:{
		traerdatosusuario:function(){	
			fetch(`Private/Modulos/usuarios/procesos.php?proceso=traercuenta&login=${JSON.stringify(this.datoscuenta )}`).then( resp=>resp.json() ).then(resp=>{ 
				this.datoscuenta = resp;				   
			});	   	     
		 },
		 modfoto:function (update) {
			editfoto.updatefoto=update;	
			editfoto.updatefoto.accion="modificar";		
			console.log(	editfoto.updatefoto.accion);
			
		   }
		
	},
	created:function () {
		this.traerdatosusuario();
	  }
});


var editfoto =new Vue({
	el:'#fotoperfiledit',
	data:{
		updatefoto:{
			idusuario:0,
			imagen:''		
		},
		imagenvista:''
	},
	created: function () { 
		this.traerid()
	 },
	methods:{
		traerid:function(){
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=traerid&nuevoP=""`).then(resp=>resp.json()).then(resp=>{
				this.updatefoto.idusuario=resp[0].idusuario;
				console.log('resp=',resp[0].idusuario,'usuario=',this.updatefoto.idusuario);
			})
		},
		Guardarimg:function(){
			
			fetch(`Private/Modulos/usuarios/procesos.php?proceso=recibirFoto&login=${JSON.stringify(this.updatefoto)}`).then(resp=>resp.json()).then(resp=>{
				if(resp.msg!="Foto de Perfil Actualizada"){
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: resp.msg,
						showConfirmButton: false,
						timer: 1500
					  })
				}else {
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: resp.msg,
						showConfirmButton: false,
						timer: 1500
					  })
				}
			})
		},

		obtenerimagen(e){
			
			
			let file=e.target.files[0];
			console.log('foot',e);
			
		
			var respuesta=null
			var formdata=new FormData($('#editfotoo')[0]);
			console.log(formdata);
			
			var ruta='Private/Modulos/usuarios/imgperfil.php';
			
			$.ajax({
				type: "POST",
				url: ruta,
				data: formdata,
				contentType:false,
				processData:false,
				async:false,
				success: function (response) {
				respuesta=response;
				}
				
			});
			this.updatefoto.imagen="Private/Modulos/usuarios/"+respuesta;
			
			this.cargarimagen(file);
			this.datosCuenta();

		},
		cargarimagen(file){
			let reader=new FileReader();
			reader.onload=(e)=>{
				this.imagenvista=e.target.result
			}
			reader.readAsDataURL(file)
		}
	},
	computed:{
		imagenes(){
			return this.imagenvista;
		}
	}
	
	
});

