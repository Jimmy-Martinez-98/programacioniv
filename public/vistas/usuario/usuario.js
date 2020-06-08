
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
           if($('#msgs').val("Segura!")){
            fetch(`private/Modulos/usuarios/procesos.php?proceso=recibirRegistro&login=${JSON.stringify(this.usuario)}`).then( resp=>resp.json() ).then(resp=>{
                if( resp.msg==='mensaje enviado'){
                    location.href="verify.html"
                }else{
              
                    alertify.alert('Alert Title', resp.msg, function(){  });
               
                 }
              
                 }).catch(e=>{ console.log(e); })
           
             }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text:"la contraseña debe cumplir con los requisitos ",
                
              });
             }
           
        },
        IniciarSesion:function(){
            location.href="login.php";
        },
        Rcliente:function () {
            location.href="registroCliente.php"
          }
       
        
       
        
    }
});

 
$(function () {
    $('[data-toggle="popover"]').popover()
    })
  
