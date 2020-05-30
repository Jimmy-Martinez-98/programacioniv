var socket = io.connect("http://localhost:3001",{'forceNew':true})
,
    appchat = new Vue({
        el:'#frm-chats',
        data:{
            msg :{
                de:0,
                para:0,
                msg:''
            },
            msgs : [],
            imgs:[]
        },
        methods:{

            para:function(){
                var datafromstorage=JSON.parse(sessionStorage.getItem("data"));
                this.msg.para=datafromstorage.info.idusuario;
                fetch(`../../../Private/Modulos/usuarios/procesos.php?proceso=traercuenta&login=""`).then(resp=>resp.json()).then(resp=>{
                  this.imgs=resp[0].imagen;     
                 
                  
               });
              
            },
            de:function(){ 
                    fetch(`../../../Private/Modulos/usuarios/procesos.php?proceso=traercuenta&login=""`).then(resp=>resp.json()).then(resp=>{
                       this.msg.de=resp[0].idusuario;   
                      
                    });
                   
            },
            enviarMensaje(){
               if(this.msg!=''){
                  socket.emit('enviarMensaje', this.msg);  
                  this.msg.msg = '';   
               }  
              
            }
           
        },
        created(){
          
            this.para();
            this.de();  
            socket.emit('chatHistory')
        }
    });
    socket.on('recibirMensaje',msg=>{
        if (msg.de === appchat.msg.de && msg.para === appchat.msg.para ||
            msg.para === appchat.msg.de && msg.de === appchat.msg.para) {
            appchat.msgs.push(msg);
           
        }
      
    });
    socket.on('chatHistory',msgs=>{
        appchat.msgs = [];
       msgs.forEach(item => {
        if (item.de === appchat.msg.de && item.para === appchat.msg.para ||
            item.para === appchat.msg.de && item.de === appchat.msg.para) {
             appchat.msgs.push(item.msg);  
          
        }
    });
    });







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
      traersession:function(){
         fetch(`../../../Private/Modulos/usuarios/procesos.php?proceso=verVariable&login=${this.valor}`).then(resp=>resp.json()).then(resp=>{
            if(resp.msg=="regrese"){
              location.href="../../../login.php"
            }
               
            
         })
      },
      traercuenta: function () {  
         fetch(`../../../Private/Modulos/usuarios/procesos.php?proceso=traercuenta&login=${this.datoscuenta}`).then(resp=>resp.json()).then(resp=>{
            this.datoscuenta=resp;
            
         });
      },collapse:function(){
         $(".collapse").animate({
            height: 'toggle'
           });
      }
   }

});
  