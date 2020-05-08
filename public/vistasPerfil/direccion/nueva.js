var guardardirecciones= new Vue({
	el:'#moddirec',
	data:{
		modificarD:{
			iddireccion	:0,
			idusuario	:0,
			direccion	:'',
			accion		:'nuevo'


		},
		
	},
	methods:{
		actualizar:function(){
			fetch(`private/Modulos/direcciones/procesos.php?proceso=recibirDatos&direction=${JSON.stringify(this.modificarD)}`).then( resp=>resp.json() ).then(resp=>{
				this.modificarD.msg = resp.msg;
				
            });
		},
	
	}


});

var nuevadireccion = new Vue({
	el:'#nuevaD1',
	data:{
		nuevaDireccion:{
			iddireccion	:0,
			idusuario	:0,
			direccion	:'',
			accion		:'nuevo',
			msg			:'',
		}
	},
	
	methods:{

		almacenar:function(){
			fetch(`private/Modulos/direcciones/procesos.php?proceso=recibirDatos&direction=""`).then(resp => resp.json()).then(resp => {
				this.nuevaDireccion=resp;
				if(resp.msg=="por favor ingrese la Dirección"){
					 
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
				console.log('hola',);
				
			});
		
			
		},

		idlogin: function () {
            fetch(`private/Modulos/direcciones/procesos.php?proceso=idLogin&direction=""`).then(resp => resp.json()).then(resp => {
				this.nuevaD.idLogin = resp[0].idLogin;
				console.log(resp[0].idusuario);
				
				this.almacenar();
				
			});
			console.log(resp[0].idusuario);
        }
	}
})