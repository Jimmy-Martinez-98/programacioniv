var applogin = new Vue({
	el:'#frm-login',
	data:{
		name:{
			
			correo  	: '',
			pass		:'',
			msg			:''
		},
		
	},
	methods:{
		 inicioSesion:function(){
			fetch(`private/Modulos/usuarios/procesos.php?proceso=recibirUsuario&login=${JSON.stringify(this.name)}`).then( resp=>resp.json() ).then(resp=>{
				if(resp.msg=="Bienvenido"){
					location.href='cooperativa.php';
				
				}else{
					this.name.pass='';
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: resp.msg,
						
					  })
				}
				
				
				
            });
		 },
		 Registrate:function(){
			location.href="Registro.php";
		},
		Recuperar:function(){
			location.href="password.html";
		}
	}


})
