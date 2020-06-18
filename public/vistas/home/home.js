

var app=new Vue({
	el:"#slider",
	data:{
		productos:[],
		stars:[],
		lista_deseox:{
			id_miproducto:'',
			id_usuario:'',
			accion:'nuevo'
		}
		
	},
	created:function(){
	this.datoss();
	
	},
	methods:{
	   datoss:function(){         
		  fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirall&miproducto=${JSON.stringify(this.productos )}`).then( resp=>resp.json() ).then(resp=>{ 
			 this.productos = resp;		
			
		  });		  
	   },
		verProd(info){
			var data={
			info
			}
			sessionStorage.setItem("data",JSON.stringify(data));
		
		},
	
		addlista:function(producto){
			if(this.session==1){
				this.lista_deseox.id_miproducto=producto.miproducto;
				console.log(this.lista_deseo);
			
				fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=guardarlista&miproducto=${JSON.stringify(this.lista_deseo) }`).then(resp=>resp.json()).then(resp=>{
					alertify.success(resp.msg);	
				});	
			}else{
				Swal.fire(
					'Ups...',
					'Debes Iniciar Sesión Para Usar Esta Opción',
					'warning'
				)
	
			}
		}	

	}
});


var todoproducto= new Vue({
	el:'#todoproducto',
	data:{
		all:[],
		lista_deseo:{
			id_miproducto:'',
			id_usuario:'',
			accion:'nuevo'
		},
		session:''

		
	
	},
	created:function () {
		this.traer_todo();
		this.traersession();
		this.traercuenta();
	},
	methods:{
		traer_todo:function(){
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirall&miproducto=${JSON.stringify(this.all )}`).then( resp=>resp.json() ).then(resp=>{ 
				this.all = resp;		
			});
		},
		verdetalle:function(info){
			var data={
				info
			};
			sessionStorage.setItem("data",JSON.stringify(data));
		},
		traersession:function(){
            fetch(`Private/Modulos/usuarios/procesos.php?proceso=verVariable&login=${this.valor}`).then(resp=>resp.json()).then(resp=>{
            	if(resp.msg=="regrese"){
					this.session=0;
					console.log(resp);
            	}else{
					this.session=1;
					console.log(resp);
            	}
            });
		 },
		 traercuenta: function () {  
            fetch(`Private/Modulos/usuarios/procesos.php?proceso=traercuenta&login=${this.datoscuenta}`).then(resp=>resp.json()).then(resp=>{
    			if(this.session!=1){
					console.log('no hay session');
					
				}else{
					this.lista_deseo.id_usuario=resp[0].idusuario;

				}
               
            })
         },
		
		addlista:function(producto){
			if(this.session==1){
				this.lista_deseo.id_miproducto=producto.miproducto;
				console.log(	this.lista_deseo);
				
				fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=guardarlista&miproducto=${JSON.stringify(this.lista_deseo) }`).then(resp=>resp.json()).then(resp=>{
					alertify.success(resp.msg);	
				});
			
		}else{
			Swal.fire(
				'Ups...',
				'Debes Iniciar Sesión Para Usar Esta Opción',
				'warning'
			  )
		
		}
		}		  
	}
})