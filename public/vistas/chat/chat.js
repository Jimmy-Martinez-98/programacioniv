/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file chat.js-> Sirve para comunicarse con el usuario dueño de un producto
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 * 
 */
var socket = io.connect("http://localhost:3001",{'forceNew':true}),


/**
 * @property el  elemento del DOM a enlazar
 */
   appchat = new Vue({
      el:'#frm-chats',
      data:{
         msg :{
            de:0,
            para:0,
            msg:''
         },
         msgs : [],
         receptor:[]
      },
      methods:{

         /**
          * Obtiene de localstorage el identificador del usuario a quien ira el mensaje
          * @access public 
          * @function para
          */
         para:function(){
            var datafromstorage=JSON.parse(sessionStorage.getItem("data"));

            this.msg.para=datafromstorage.info.idusuario;

            this.receptor=datafromstorage.info; 
         },

         /**
          * Es el identificador del usuario que mandara el mensaje
          * @access public
          * @function de
          */
         de:function(){ 

            fetch(`../../../Private/Modulos/usuarios/procesos.php?proceso=traercuenta&login=""`).then(resp=>resp.json()).then(resp=>{
               this.msg.de=resp[0].idusuario;   
               
               socket.emit('chatHistory');
            });       
         },

         /**
          * Es cuando el usuario manda el mensaje
          * @access public
          * @function enviarMensaje
          */
         enviarMensaje(){
            var msj=this.msg.msg;
				this.msg.msg=msj.trim();
            if(this.msg!='' && this.msg.msg!='' ){
               socket.emit('enviarMensaje', this.msg);  
               this.msg.msg = '';   
            }  
         },
      },
      created(){
            this.para();
            this.de();  
      }
   });


   /**
    * Es cuando el usuario recibe el mensaje de otro usuario y recibira una notificacion
    * @access public
    * @event socket.on('recibirMensaje',msg)
    * 
    */
socket.on('recibirMensaje',msg=>{
   if (msg.de === appchat.msg.de && msg.para === appchat.msg.para ||
      msg.para === appchat.msg.de && msg.de === appchat.msg.para) {
         appchat.msgs.push(msg);
         if(msg.de!=appchat.msg.de){
            $.notification("Agro Producers Tienes Un Mensaje", msg.msg, '../../img/logo2,0.png');
         }
      }
      
});

/**
 * Carga el historial de mensajes
 * @access public
 * @event socket.on('chatHistory',msgs)
 */
socket.on('chatHistory',msgs=>{
      appchat.msgs = [];
      msgs.forEach(item => {
         if (item.de === appchat.msg.de && item.para === appchat.msg.para ||
            item.para === appchat.msg.de && item.de === appchat.msg.para) {
               appchat.msgs.push(item);  
         }
      });
});






/**
 * @instance objeto de instancia de Vue.js
 * 
*/
var validarsession=new Vue({
   el:"#nav",
   data:{
      valor:'',
      session:'',
      datoscuenta:[]
   },
   created:function(){
      this.traersession();
      this.traercuenta();
   },

   methods:{
      /**
       * Verifica si hay variable de session y si no lo hay redirige al login
       * @access public
       * @function traersession
       */
      traersession:function(){
         fetch(`../../../Private/Modulos/usuarios/procesos.php?proceso=verVariable&login=${this.valor}`).then(resp=>resp.json()).then(resp=>{
            if(resp.msg=="regrese"){
               location.href="../../../login.php"
            }
         })
      },

      /**
       * Trae la cuenta del usuario logueado
       * @access public
       * @function traercuenta
       */
      traercuenta: function () {  
         fetch(`../../../Private/Modulos/usuarios/procesos.php?proceso=traercuenta&login=${this.datoscuenta}`).then(resp=>resp.json()).then(resp=>{
            this.datoscuenta=resp;
            
         });
      },

      /**
       * Es la animacion de la barra de navegacion responsive
       * @access public
       * @event  collapse
       */
      collapse:function(){
         $(".collapse").animate({
            height: 'toggle'
         });
      }
   }

});