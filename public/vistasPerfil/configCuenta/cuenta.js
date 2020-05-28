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
			
			
		   },
		   modificacionpass:function (passs) {
			editpass.cambiopass=passs;	
			
			
			
			
			
		   },
		
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



var editpass =new Vue({
	el:'#edicontra',
	data:{
		actualizarcontra:{
			idusuario:0,
			contranueva:'',
			confirmarcontra:'',
			accion:'modificar'
		},
		cambiopass:{
			contra:''
		}
	},
	created:function(){
		this.traeridusuario();
		
	}
	,methods:{

	
		alerta:function(){

			var mayus		=new RegExp("^(?=.*[A-Z])");
			var especial	= new RegExp("^(?=.*[*_.-])");
			var numeros		= new RegExp("^(?=.*[0-9])");
			var lower 		= new RegExp("^(?=.*[a-z])");
			var len	 		= new RegExp("^(?=.{8,})");
			var regexp		=[mayus,especial,numeros,lower,len];
			var checkval=0;
			
			var wordpass=$('#nuevap').val();
			for(var i=0; i<5; i++){
				if(regexp[i].test(wordpass)){
					checkval++;
					
				}
			}

			if(checkval >=0 && checkval<=2){
				$('#msgs').text("Muy Insegura!").css("color","red");
			}else if(checkval >=3 && checkval<=4){
				$('#msgs').text("Poco Segura!").css("color","orange");
			}else if(checkval===5){
				$('#msgs').text("Segura!").css("color","green");
			}
		

		},

		traeridusuario:function(){
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=traerid&nuevoP=""`).then(resp=>resp.json()).then(resp=>{
				this.actualizarcontra.idusuario=resp[0].idusuario;
			
				
			})
		
			
		},

		updatepass:function(){
		
			fetch(`Private/Modulos/usuarios/procesos.php?proceso=recibirpass&login=${JSON.stringify(this.actualizarcontra)}`).then(resp=>resp.json()).then(resp=>{
					if(resp.msg=="Favor Complete los Campós"){
						Swal.fire({
							position: 'top-end',
							icon: 'warning',
							title: resp.msg,
							showConfirmButton: false,
							timer: 1500
						  });
						
						  
						 
					}else if(resp.msg=="Las Contraseñas Deben Coinsidir"){
						Swal.fire({
							position: 'top-end',
						   icon: 'error',
							title: 'Las Contraseñas Deben Coinsidir',
							showConfirmButton: false,
						   timer: 1500
						  });
						 
					}else{
						Swal.fire({
							position: 'top-end',
							icon: 'success',
							title: resp.msg,
							showConfirmButton: false,
							timer: 1500
						  });
						
					}
				});
				

		
				
				 
			

			
		}

		
	}
});
