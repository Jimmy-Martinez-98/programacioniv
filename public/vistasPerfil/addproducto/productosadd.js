var publicarp=new Vue({
	el:'#frm-productoN',
	data: {
		
		publicP:{
			idprod:0,
			idusuario:0,
			nombre:'',
			descripcion:'',
			Categoria:'',
			imagen:'',
			Existencias:'',
			Precio:'',
			precioventa:'',
			fechasubida:'',
			accion:'nuevo',
			msg:''
		},
	
		imagenlittle:''

	},
	created:function(){this.traerid()},
	
	methods:{
		traerid:function(){
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=traerid&nuevoP=""`).then(resp=>resp.json()).then(resp=>{
				this.publicP.idusuario=resp[0].idusuario;
				console.log('resp=',resp[0].idusuario,'usuario=',this.publicP.idusuario);
				

			})
		},
		guardar:function(){

			console.log('imagen subida',this.publicP);
			
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=recibirDatos&nuevoP=${JSON.stringify(this.publicP )}`).then( resp=>resp.json() ).then(resp=>{ 
			
				if(resp.msg!="Su Producto Fue Publicado Exitosamente"){
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: resp.msg,
						showConfirmButton: false,
						timer: 1500
					  })
				} else{
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
			var respuesta=null;
			let file=e.target.files[0];
			var formdata=new FormData($('#frm-productoN')[0]);
			var ruta='Private/Modulos/guardarruta.php';
			
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
			
			console.log('asdasd',this.publicP.imagen= 'Private/Modulos/'+respuesta);
			
			this.cargar(file);
	
		},

		cargar(file){
			let reader=new FileReader();
			reader.onload=(e)=>{
				this.imagenlittle=e.target.result;
			}
			reader.readAsDataURL(file);
		}
	
	},
	computed:{
		imagen(){
			return this.imagenlittle;
		}
	}
	
});

