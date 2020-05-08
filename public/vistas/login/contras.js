var appcontras = new Vue({
	el:'#frm-Recuperar',
	data:{
		name:{
			
			correo  	: '',
			pass		:'',
			confir		:'',
			msg			:''
		},
		
	},
	methods:{
		Recuperar:function(){
			fetch(`private/Modulos/usuarios/procesos.php?proceso=recibirUsuario&login=${JSON.stringify(this.name)}`).then( resp=>resp.json() ).then(resp=>{
				if(resp.msg=="Bienvenido"){
					location.href='cooperativa.php';
				}else{
					this.name.correo='';
					this.name.pass='';
					this.name.msg=resp.msg;
				}
				
				
				
            });
		 },
		atras:function(){
			location.href="login.php";
		},

		
	}


})
