

  var appverifi= new Vue({
	  el:"#frm-verify",
	  data:{
		  code:{
			  codigo:''
		  },
		
	  },
	  
	  methods:{
		  verificar:function(){

			fetch(`Private/Modulos/usuarios/procesos.php?proceso=recibircode&login=${JSON.stringify(this.code) }`).then(resp=>resp.json() ).then(resp=>{ 
				if(resp.msg==="Usuario Verificado"){
					alertify.alert('Verificacion de Usuario', resp.msg, function(){
						location.href="index.html"
					 });
				}  else{
					alertify.alert('Verificacion de Usuario', resp.msg, function(){
						
					 });
				} 
			});	   	     
			
		  },
	
	  }
  })
  // Example starter JavaScript for disabling form submissions if there are invalid fields
