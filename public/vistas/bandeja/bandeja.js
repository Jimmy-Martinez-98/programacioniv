var socket = io.connect("http://localhost:3001",{'forceNew':true})
,
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
			traerusuario:function(){
				fetch(`../../../Private/Modulos/usuarios/procesos.php?proceso=traercuenta&login=""`).then(resp=>resp.json()).then(resp=>{
					this.msg.de=resp[0].idusuario;				
				})
			},
         
            enviarMensaje(){

				var msj=this.msg.msg;
				this.msg.msg=msj.trim();
               if(this.msg.msg!='' && this.msg.para!='' && this.msg.de!=''){
                  socket.emit('enviarMensaje', this.msg);
                  this.msg.msg = ''; 
               } 
			},
			vermensajes:function(){
				fetch(`../../../Private/Modulos/usuarios/procesos.php?proceso=traerusuarios&login=""`).then(resp=>resp.json()).then(resp=>{	
					this.users=resp;
					
					
				});
			},
			openchat:function(id) {
				this.msg.para=id
				this.msgs=[];
				this.allmsg.forEach(item=>{
               this.util(item);
              
            })
            this.users.forEach(user=>{
             if(user.idusuario==id){
               this.nombrechat=user;
               console.log(user.imagen);
                           
             }
               
            })
            
               
			  },
			  util:function(item){
				if (item.de === this.msg.de && item.para === this.msg.para ||
                    item.de === this.msg.para && item.para === this.msg.de) {
                    this.msgs.push(item);
                }
			  }

            
        },
        created(){
			this.vermensajes();
			
			this.traerusuario();
            socket.emit('chatHistory');
        }
    });
    socket.on('recibirMensaje',msg=>{
        if (msg.de === appbandeja.msg.de && msg.para === appbandeja.msg.para ||
            msg.para === appbandeja.msg.de && msg.de === appbandeja.msg.para) {
            appbandeja.msgs.push(msg);
        }
        
        
    });
	socket.on('chatHistory', msgs => {
		appbandeja.allmsg = msgs;
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
  