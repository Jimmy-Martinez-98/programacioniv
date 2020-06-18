var mostrardetalle = new Vue({
	el:"#productovista",
	data:{
		detallesprod:[],
		productosrelacionados:[],
		contador:1,
		lista_deseo:{
			id_miproducto:'',
			id_usuario:'',
			accion:'nuevo'
		},
		session:'',
		valor:'',
		cuentalogueada:[]
		
	},
	created:function(){
		this.todo();
		this.traerproductos();
		this.traersession();
		this.traeridlogue();
		
	},
	methods:{
	
		todo:function(){
			var datafromstorage=JSON.parse(sessionStorage.getItem("data"));
			this.detallesprod=datafromstorage;	

			
		},
		
		addlista:function(producto){
			if(this.session==1){
				this.lista_deseo.id_miproducto=producto.info.miproducto;
			
			
				fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=guardarlista&miproducto=${JSON.stringify(this.lista_deseo) }`).then(resp=>resp.json()).then(resp=>{
					alertify.success(resp.msg);	
				});	
			}
			else{
				Swal.fire(
					'Ups...',
					'Debes Iniciar Sesión Para Usar Esta Opción',
					'warning'
				)
	
			}
		},
		traerproductos:function(){
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirDatos&miproducto=${JSON.stringify(this.productosrelacionados)}`).then(resp=>resp.json()).then(resp=>{
				this.productosrelacionados=resp;
			
			})
		},
		suma:function(){
			this.contador++
		},
		resta:function(){
			if(this.contador===1){
				this.contador=1
			}else if(this.contador<=0){
				this.contador=1;
			}else{
				this.contador--
			}
		},
		contactar:function(){
			location.href="public/vistas/chat/chat.html"
		},
		traersession:function(){
			fetch(`Private/Modulos/usuarios/procesos.php?proceso=verVariable&login=${this.valor}`).then(resp=>resp.json()).then(resp=>{
			   if(resp.msg=="regrese"){
				  this.session=0;
			   }else{
				  this.session=1;
			   }
				  
			   
			})
		 },
		 traeridlogue:function(){
			fetch(`Private/Modulos/usuarios/procesos.php?proceso=traercuenta&login=${this.cuentalogueada}`).then(resp=>resp.json()).then(resp=>{
			
				this.lista_deseo.id_usuario=resp[0].idusuario;
				
				
				
			 })
		 }
	
	}
});

