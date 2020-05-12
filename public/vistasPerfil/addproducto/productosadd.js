 var publicproductos= new Vue({
	el:'#frm-productoN',
	data:{

		publicar:{
			idproductoo:0,
			idusuario:0,
			nombre:'',
			imagen:'',
			descripcion:'',
			categoria:'',
			existencias:'',
			precio:'',
			precioventa:'',
			fecha:'',
			msg:'',
			accion:'nuevo'
		},


		return:{
			file:null
		}
		
		
		
	}, 
	
	
	methods:{

	
		publicar:function(){
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=recibirDatos&nuevoP=${JSON.stringify(publicar)}`).then(resp=>resp.json()).then(resp=>{

				if(resp.msg!="Su Producto Fue Publicado Exitosamente"){
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
			})
		},
		file(value) {
		
			this.publicar.imagen=this.file=value.target.files[0];
			
			console.log('imagen',this.publicar.imagen);
			
		}
	}


 })