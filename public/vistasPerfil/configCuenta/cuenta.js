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
		 modificarF:function(Foto) {
			editfoto.updatefoto=Foto;
			editfoto.updatefoto.accion='modificar';
			
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
			imagen:'',
			accion:'modificar'
		},
		imagenpeque:''
	},methods:{

		cambiarFoto:function(){

		},
		cambiarFoto(e){
			var respuesta=null;
			let file=e.target.files[0];
			console.log(file);
			
			// var formdata=new FormData($('#fotoperfiledit')[0]);
			// var ruta='Private/Modulos/usuarios/imgperfil.php';
			// $.ajax({
			// 	type: "POST",
			// 	url: ruta,
			// 	data: formdata,
			// 	contentType:false,
			// 	processData:false,
			// 	async:false,
			// 	success: function (response) {
			// 	respuesta=response;
			// 	}
				
			// });
			// this.publicP.imagen= 'Private/Modulos/'+respuesta	
			this.cargar(file);
		},
		cargar(file){
			let reader=new FileReader();
			reader.onload=(e)=>{
				this.perfiles=e.target.result;
			}
			reader.readAsDataURL(file);
		}
	},
	computed:{
		perfiles(){
			return this.imagenpeque;
		}
	}
	
});

