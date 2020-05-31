var publicarp=new Vue({
	el:'#frm-productoN',
	data: {
	
		publicP:{
			miproducto:0,
			idusuario:0,
			nombre_producto:'',
			descprod:'',
			codigo_producto:'',
			categoria:'',
			imagen:'',
			existencias:'',
			precio:'',
			precio_venta:'',
			fecha_subida:'',
			accion:'nuevo',
			msg:''
		},
		
		imagenlittle:''

	},
	created:function(){this.traerid()
	
	},
	
	methods:{
		traerid:function(){
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=traerid&nuevoP=""`).then(resp=>resp.json()).then(resp=>{
				this.publicP.idusuario=resp[0].idusuario;
				
				
			})
		},
		guardar:function(){	

				fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=recibirDatos&nuevoP=${JSON.stringify(this.publicP )}`).then( resp=>resp.json() ).then(resp=>{ 
					if(resp.msg=="Su Producto Fue Publicado Exitosamente"){
						  alertify.success(resp.msg);
						  this.publicP='';
					}else{
						Swal.fire({
							position: 'top-end',
							icon: 'warning',
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
			this.publicP.imagen= 'Private/Modulos/'+respuesta	
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



