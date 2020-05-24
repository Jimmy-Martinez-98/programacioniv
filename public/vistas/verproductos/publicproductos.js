var mostrardetalle = new Vue({
	el:"#productovista",
	data:{
		detallesprod:[],
		productosrelacionados:[],
		contador:1
		
	},
	created:function(){
		this.todo();
		this.traerproductos();
		
	},
	methods:{
	
		todo:function(){
			var datafromstorage=JSON.parse(sessionStorage.getItem("data"));
			this.detallesprod=datafromstorage;	

			
			
		},
		traerproductos:function(){
			fetch(`Private/Modulos/inicio/procesos.php?proceso=recibirDatos&miproducto=${JSON.stringify(this.productosrelacionados)}`).then(resp=>resp.json()).then(resp=>{
				this.productosrelacionados=resp;
			})
		},
		suma:function(){
			this.contador++
		},
		resta:function(){
			if(this.contador===1){
				this.contador=1
			}else{
				this.contador--
			}
		},
		contactar:function(){
			location.href="public/vistas/chat/chat.html"
		}
	
	}
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
		  fetch(`Private/Modulos/usuarios/procesos.php?proceso=verVariable&login=${this.valor}`).then(resp=>resp.json()).then(resp=>{
			 if(resp.msg=="regrese"){
				this.session=0;
			 }else{
				this.session=1;
			 }
				
			 
		  })
	   },
	   traercuenta: function () {  
		  fetch(`Private/Modulos/usuarios/procesos.php?proceso=traercuenta&login=${this.datoscuenta}`).then(resp=>resp.json()).then(resp=>{
			 this.datoscuenta=resp;
			 
		  })
	   },
	   colapsar:function(){
		  console.log("click");
	  
		  $(".collapse").animate({
		   height: 'toggle'
		  });
	   }
	}
 })

$(document).ready(function () {
	$('#verduras').click(()=>{
	   
		$("#contenedor").load("public/vistas/verduras/verduras.html",function(data){
		  $(this).html(data);
	   });
	
	});
   
	$('#frutos').click(()=>{
	
		$("#contenedor").load("public/vistas/frutos/frutos.html",function(data){
		  $(this).html(data);
	   });
	
	});
	$('#login').click(()=>{
	  
	   location.href='login.php';
	});
	
	
	$(function () {
	   $('[data-toggle="popover"]').popover()
	 })
	
	
 });