var publicarp=new Vue({
	el:'#frm-productoN',
	data: {
	
		publicP:{
			miproducto:0,
			idusuario:0,
			nombre_producto:'',
			descprod:'',
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
	created:function(){this.traerid()},
	
	methods:{
		traerid:function(){
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=traerid&nuevoP=""`).then(resp=>resp.json()).then(resp=>{
				this.publicP.idusuario=resp[0].idusuario;
				console.log('resp=',resp[0].idusuario,'usuario=',this.publicP.idusuario);
			})
		},
		guardar:function(){	
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=recibirDatos&nuevoP=${JSON.stringify(this.publicP )}`).then( resp=>resp.json() ).then(resp=>{ 
			
				if(resp.msg!="Su Producto Ha Sido Actualizado"){
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


var appproductos=new Vue({
	el:'#productos',
	data:{
		valor:'',
		todoP:[],
		
	},
	created:function(){
		this.traerdatos();
	},
	methods:{
		
		traerdatos:function(){
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=traerproductos&nuevoP=${this.valor}`).then(resp=>resp.json()).then(resp=>{
                this.todoP = resp;
            });
		},
		modificar:function(mod) {
			publicarp.publicP=mod;
			publicarp.publicP.accion='modificar';
			console.log(publicarp.publicP.miproducto);
			
			
		}
	
	}


})

