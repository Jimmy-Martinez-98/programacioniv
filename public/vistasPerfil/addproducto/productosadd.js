 var publicproductos= new Vue({
	el:'#frm-productoN',
	data:{
		nuevoProducto:{
			idproductoo:0,
			idusuario:0,
			
			nombre:'',
			descripcion:'',
			categoria:'',
			existencias:'',
			precio:'',
			precioventa:'',
			fecha:'',
			msg:'',
			accion:'nuevo'
		}
	},
	methods:{
		publicar:function(){
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=recibirDatos&nuevoP=${JSON.stringify(nuevoProducto)}`).then(resp=>resp.json()).then(resp=>{

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
		}
	}


 })