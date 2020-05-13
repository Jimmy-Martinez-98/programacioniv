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
		littleimage:''
		

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
		file(value) {	 
			let file=value.target.files[0];
			this.publicP.imagen=file;
			console.log('img',this.publicP);
			this.cargarimagen(file);
		},
		cargarimagen:function(file){
			let reader= new FileReader();
			reader.onload=(e)=>{
				this.littleimage=e.target.result;
			}
			reader.readAsDataURL(file);
		}
		
		
	},
	computed:{
		imagen(){
			return this.littleimage;
		}
	}
});