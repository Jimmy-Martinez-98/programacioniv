
var appusuario = new Vue({
    el:'#frm-usuarios',
    data:{
      
       
        usuario:{
            idUsuario 		 : 0,
            accion   		 : 'nuevo',
            nombreu   		 : '',
            selected         :'',
        nombrecooperativa    : '',
            telefono         :'',
			correo  		 : '',
            pass		     :'',
            fecha            :'',
            msg      		 : ''
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
			
			var wordpass=$('#contra').val();
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
          

		},
        guardarusuario:function(){
           if($('#msgs').val()=="Segura!"){
            fetch(`private/Modulos/usuarios/procesos.php?proceso=recibirRegistro&login=${JSON.stringify(this.usuario)}`).then( resp=>resp.json() ).then(resp=>{
                if(resp.msg=='usuario registrado correctamente'){
                    location.href="cooperativa.php"
                }else{
                this.usuario.msg = resp.msg;
                this.usuario.idUsuario = 0;
                  this.usuario.nombreu  = '';
                  this.usuario.selected='';
                this.usuario.nombrecooperativa = '';
                this.usuario.telefono='';
				this.usuario.correo = '';
                this.usuario.pass='';
                this.usuario.fecha='';
                this.usuario.accion = 'nuevo';
            }
              
            });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text:"la contraseña debe contener los requisitos ",
                
              })
        }
           
        },
        IniciarSesion:function(){
            location.href="login.php";
        },
       
        
       
        
    }
});

 
$( function() {
    $(".custom-select").change( function() {
         if ($(this).val() === "Cooperativa") {
             $("#cooperativa").prop("disabled", false);
             
         } else if($(this).val() === "Productor Pequeño") {
            
              $("#cooperativa").prop("disabled", true,'');
            
            
             
        }
      });
  });
     
