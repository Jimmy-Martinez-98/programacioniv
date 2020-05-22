var socket = io.connect("http://localhost:3001",{'forceNew':true}),
appchat = new Vue({
    el:'#myForm',
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
   
    appchat.msgs.push(msg);
});
socket.on('chatHistory',msgs=>{
    appchat.msgs = [];
    msgs.forEach(item => {
        appchat.msgs.push(item.msg);
    });
});









function openForm() {
	document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
    
  }

