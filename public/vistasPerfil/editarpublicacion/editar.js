var appeditP = new Vue({
	el:'#frm-edit',
	data:{
		mod:{
			miproducto:0,
			fk_idusuario:0,
			nombre_producto:'',
			descprod:'',
			codigo_producto:'',
			categoria:'',
			imagen:'',
			existencias:'',
			precio:'',
			precio_venta:'',
			fecha_subida:'',
			accion:'modificar',
			msg:''
		},
		imagenlittle:''
	},
	
	methods:{
	
		editar:function (){
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=recibirDatosmod&nuevoP=${JSON.stringify(this.mod )}`).then( resp=>resp.json() ).then(resp=>{ 
			
				 if(resp.msg=="Su Producto Ha Sido Actualizado"){
					alertify.success(resp.msg);
					  this.mod='';
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
		obtenerimagen:function(e){
			var respuesta=null;
			let file=e.target.files[0];
			var formdata=new FormData($('#frm-edit')[0]);
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
			this.mod.imagen= 'Private/Modulos/'+respuesta	
			this.cargar(file);

		},
		cargar(file){
			let reader=new FileReader();
			reader.onload=(e)=>{
				this.imagenlittle=e.target.result;
			}
			reader.readAsDataURL(file);
		}



	},computed:{
		imagen(){
			return this.imagenlittle;
		}
	}


});


var apptodoP=new Vue({
	el:'#frmMis',
	data:{
		valor:'',
		todo_prod:[]
	},
	methods:{
		buscar:function() {
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=traerproductos&nuevoP=${this.valor}`).then(resp=>resp.json()).then(resp=>{
                this.todo_prod = resp;
            });

		  },
		  modi:function(id){
		
			 appeditP.mod=id;
			console.log(	appeditP.mod.accion='modificar');
			
			 
			  
		  }

	},
	created:function () {
		this.buscar();
	  }




})