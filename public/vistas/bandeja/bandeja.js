/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file bandeja.js-> Sirve para comunicarse con los usuarios 
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 * 
 */
var socket = io.connect("http://localhost:3001",{'forceNew':true})
,
/**
 * @property el  elemento del DOM a enlazar
 */
   appbandeja = new Vue({
      el:'#bandejas',
      data:{
         msg :{
            de:0,
            para:0,
            msg:''
			},
			
			msgs : [],
			users:[],
         allmsg:[],
         nombrechat:[]
      },



      methods:{
         /**
          * Trae identificador del usuario logueado
          * @access public
          * @function traerusuario
          */
			traerusuario:function(){
				fetch(`../../../Private/Modulos/usuarios/procesos.php?proceso=traercuenta&login=""`).then(resp=>resp.json()).then(resp=>{
					this.msg.de=resp[0].idusuario;				
				})
			},
         
         /**
          * Es cuando el usuario envia un mensaje a otro usuario.
          * @access public
          * @function enviarMensaje 
         */
         enviarMensaje(){
				var msj=this.msg.msg;
			   this.msg.msg=msj.trim();
               if(this.msg.msg!='' && this.msg.para!='' && this.msg.de!=''){
                  socket.emit('enviarMensaje', this.msg);
                  this.msg.msg = ''; 
               }
         },

         /**
          * Trae desde la base de datos los usuarios
          * @access public 
          * @function vermensajes
          */
			vermensajes:function(){
				fetch(`../../../Private/Modulos/usuarios/procesos.php?proceso=traerusuarios&login=""`).then(resp=>resp.json()).then(resp=>{	                         
                  this.users=resp  
            });
         },
         
         /**
          * Abre el historial del chat seleccionado
          * @access public
          * @function openchat
          * @param {Int} id - Representa el Identificador del chat seleccionado 
          */
			openchat:function(id) {
            
            socket.emit('chatHistory');
            
            this.msg.para=id;
            
            this.msgs=[];
            
				this.allmsg.forEach(item=>{
               this.util(item);
            })
            /**
             * Recorre los usuarios de la base de datos
             * Y compara si el identificador es identico al del chat seleccionado
             */
            this.users.forEach(user=>{
               if(user.idusuario==id){
                  this.nombrechat=user;            
               }         
            })
         },

         /**
          * Compara si lo que esta en el objeto es igual al de msg
          * Si la comparacion es exitosa le hace push al msgs con todos los mensajes
          * que conincidan con el item
          * @access public
          * @function util
          * @param {object} item 
          */
         util:function(item){
				if(item.de === this.msg.de && item.para === this.msg.para ||
               item.de === this.msg.para && item.para === this.msg.de) {
               this.msgs.push(item);
            }
         },
      },


      created(){
			this.vermensajes();	
			this.traerusuario();
            socket.emit('chatHistory');
      }

   });




   /**
    * Es cuando recibe un mensaje de otro usuario y le notifica que tienen un mensaje
    * @access public
    * @event socket.on 
    */
socket.on('recibirMensaje',msg=>{
   if (msg.de === appbandeja.msg.de && msg.para === appbandeja.msg.para ||
   msg.para === appbandeja.msg.de && msg.de === appbandeja.msg.para) {
      appbandeja.msgs.push(msg);
      /**
       * Verifica si el el usuario que envio el mensaje sea diferente para notificar
       */
      if(msg.de!=appbandeja.msg.de){
         $.notification("Agro Producers Tienes Un Mensaje", msg.msg, '../../img/logo2,0.png');
      }
   }
});

/**
 * Carga el historial de mensajes en allmsg
 * @access public
 * @event socket.on
 */
socket.on('chatHistory', msgs => {
   appbandeja.allmsg = msgs;
});







/**
 * @property el  elemento del DOM a enlazar
 */
var validarsession=new Vue({
   el:"#hola",
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
       * Verifica si hay una variable de session activa si no lo hay redirecciona a login
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
       * Es la animacion en la barra de navegacion responsive
       * @function colapsar
       */
      colapsar:function(){  
         $("#toggles").animate({
            height: 'toggle'
         });
      },
      /**
       * Redirige a la pantalla de inicio
       * @function inicio
       */
      inicio(){
         location.href="../../../index.html"
      },

      /**
       * Redirige a la pantalla de login
       * @function login
       */
   login(){
      location.href="login.php"
   }
   }

});