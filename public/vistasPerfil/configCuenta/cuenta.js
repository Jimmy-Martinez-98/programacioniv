var appperfilimg = new Vue({
	el:'#fotoperfiledit',
	data:{
		perfil:{
			accion:'nuevo',
			imagen:'',
			msg:''
		}

	},
	method:{
		guardarfoto:function(){
			fetch(`private/Modulos/perfil/fotoperfil.php?proceso=recibirDatos&perfil=${JSON.stringify(this.perfil)}`).then( resp=>resp.json() ).then(resp=>{


			});

		}

	}

});