var socket = io.connect("http://localhost:3001",{'forceNew':true}),
    appchat = new Vue({
        el:'#frm-chats',
        data:{
            msg : '',
            msgs : []
        },
        methods:{
            enviarMensaje(){
               if(this.msg==''){
                  Swal.fire({
                      position: 'top-end',
                      icon: 'warning',
                      title: 'Favor Escriba un Mensaje',
                      showConfirmButton: false,
                      timer: 1500
                    })
               }else{
                  socket.emit('enviarMensaje', this.msg);
                  this.msg = '';  
                  
               }  
            },
            limpiarChat(){
                this.msg = '';
            }
        },
        created(){
            socket.emit('chatHistory');
        }
    });
    socket.on('recibirMensaje',msg=>{
        console.log(msg);
        appchat.msgs.push(msg);
    });
    socket.on('chatHistory',msgs=>{
        appchat.msgs = [];
        msgs.forEach(item => {
            appchat.msgs.push(item.msg);
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
      traercuenta: function (param) {  
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
  
