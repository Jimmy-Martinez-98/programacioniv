var appperfilimg = new Vue({
	el:'#foto',
	data:{
		perfil:{
			accion:'',
			imagen:'',
			msg:''
		}

	},
	method:{
		guardarFoto:function(){
			fetch(`/private/Modulos/perfil/fotoperfil.php?proceso=resibirFoto&perfil=${JSON.stringify(this.perfil)}`).then( resp=>resp.json() ).then(resp=>{


			});

		}

	}

});