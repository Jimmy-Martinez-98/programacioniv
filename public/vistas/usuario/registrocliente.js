/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file registrocliente.js-> Sirve para registrar a un usuario que sea cliente
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var appusuario = new Vue({
    el:'#frm-cliente',
    data:{

        usuario:{
            idUsuario   		 : 0,
            accion   	    	 : 'nuevo',
            nombrec   		   : '',
            telefono         :'',
		      	correo  		     : '',
            pass	    	     :'',
            fecha            :'',
            msg          		 : ''
        },
        valorcheck:''
    },
    methods:{
        /**
         * Muestra un mensaje para indicar si la contraseña cumple con los requisitos
         * @access public
         * @function alerta
        */
        alerta:function(){
          var mayus		= new RegExp("^(?=.*[A-Z])");
          var especial    	= new RegExp("^(?=.*[*_.-])");
          var numeros	    	= new RegExp("^(?=.*[0-9])");
          var lower      		= new RegExp("^(?=.*[a-z])");
          var len	      		= new RegExp("^(?=.{8,})");
          var regexp    		= [mayus,especial,numeros,lower,len];
          var checkval=0;
        
          var wordpass=$('#contra').val();
          for(var i=0; i<5; i++){
            if(regexp[i].test(wordpass)){
              checkval++;
            
            }
          }
          if(checkval===0){
            $('#msgs').hide();
          }else	if(checkval >=0 && checkval<=2){
            $('#msgs').show();
            $('#msgs').text("Muy Insegura!").css("color","red");
          }else if(checkval >=3 && checkval<=4){
            $('#msgs').text("Poco Segura!").css("color","orange");
          }else if(checkval===5){
            $('#msgs').text("Segura!").css("color","green");
          }
        },
          /**
           * Envia los datos del usuario al archivo.php para su procesamiento
           * @access public
           * @function guardarusuario
           */
        guardarusuario:function(){

          if(this.valorcheck!=''||this.valorcheck!=false){
            if($('#msgs').val("Segura!")){
              fetch(`private/Modulos/usuarios/procesos.php?proceso=recibircliente&login=${JSON.stringify(this.usuario)}`).then( resp=>resp.json() ).then(resp=>{
                  if(resp.msg==='mensaje enviado'){
                      location.href="verify.html"
                    
                      
                  }else{
                
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text:resp.msg,
                      
                    });
                    
                    this.usuario.pass=''
                  }
                  });
            
              }
              else{
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
        /**
         * Redirige al usuario al formulario login
         * @access public
         * @function IniciarSesion
         */
        IniciarSesion:function(){
            location.href="login.php";
        },

        /**
         * Redirige al usuario al formulario de registro
         * @access public
         * @function registro
         */
        registro:function () {
            location.href="Registro.php"
        }
    },
});


/**
 * Sirve para la validacion de los inputs
 * @function
 */
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === null) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();


/**
 * Sirve para el uso de mensajes popovers
 * @function
 */
$(function () {
  $('[data-toggle="popover"]').popover()
  })
