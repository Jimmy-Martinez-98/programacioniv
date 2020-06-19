/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file usuario.js-> Sirve para el registro de usuario tipo vendedor
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
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
            
        },
        verificarchek:''
    },
    methods:{


	    /**
		 * Muestra un mensaje para indicar si la contraseña cumple con los requisitos
		 * @access public
		 * @function alerta
		 */
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


        /**
         * Es cuando verifica si las contraseñas coninciden manda los datos al archivo.php para su procesamiento
         * @access public
         * @function guardarusuario
         */
        guardarusuario:function(){
            if (this.verificarchek!=false||this.verificarchek!='') {
                if($('#msgs').val("Segura!")){
                fetch(`private/Modulos/usuarios/procesos.php?proceso=recibirRegistro&login=${JSON.stringify(this.usuario)}`).then( resp=>resp.json() ).then(resp=>{
                    if( resp.msg==='mensaje enviado'){
                        location.href="verify.html"
                    }else{
                
                        alertify.alert('Alerta', resp.msg, function(){});
                
                    }
                
                    }).catch(e=>{ console.log(e); })
            
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text:"la contraseña no comple con los requisitos ",
                        
                    });
                }
            }else{
                Swal.fire({
                    icon: 'warning',
                    text:"Debe Aceptar La Política de Privacidad ",
                    
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

/**
 * Sirve para mostrar los mensajitos de popovers
 * @function
 */
$(function () {
    $('[data-toggle="popover"]').popover()
    })
  
