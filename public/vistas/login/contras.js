var appcontras = new Vue({
	el:'#frm-Recuperar',
	data:{
		name:{
			
			correo  	: '',
			pass		:'',
			confir		:'',
			msg			:''
		}
		
	},
	methods:{
	
		
		alerta:function(){

			var mayus		=new RegExp("^(?=.*[A-Z])");
			var especial	= new RegExp("^(?=.*[*_.-])");
			var numeros		= new RegExp("^(?=.*[0-9])");
			var lower 		= new RegExp("^(?=.*[a-z])");
			var len	 		= new RegExp("^(?=.{8,})");
			var regexp		=[mayus,especial,numeros,lower,len];
			var checkval=0;
			
			var wordpass=$('#nuevap').val();
			for(var i=0; i<5; i++){
				if(regexp[i].test(wordpass)){
					checkval++;
					
				}
			}

			if(checkval >=0 && checkval<=2){
				$('#msgs').text("Muy Insegura!").css("color","red");
			}else if(checkval >=3 && checkval<=4){
				$('#msgs').text("Poco Segura!").css("color","orange");
			}else if(checkval===5){
				$('#msgs').text("Segura!").css("color","green");
			}
		

		}

		,
		Recuperar:function(){
			
				fetch(`private/Modulos/usuarios/procesos.php?proceso=recibirRecuperacion&login=${JSON.stringify(this.name)}`).then( resp=>resp.json() ).then(resp=>{		
					if(resp.msg!="contraseña actualizada"){
						Swal.fire({
							position: 'top-end',
							icon: 'warning',
							title: resp.msg,
						   showConfirmButton: false,
						   timer: 1500
					  })
				}else{
						  location.href="login.php"
					}
			   });
			
		 },
		atras:function(){
			location.href="login.php";
		},

		
	}


})
