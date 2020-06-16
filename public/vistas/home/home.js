var app=new Vue({
	el:"#slider",
	data:{
		productos:[],
		stars:[],
		
	},
	created:function(){
	this.datoss();
	
	},
	methods:{
	   datoss:function(){         
		  fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirDatos&miproducto=${JSON.stringify(this.productos )}`).then( resp=>resp.json() ).then(resp=>{ 
			 this.productos = resp;		
			
		  });		  
	   },
	verProd(info){
		var data={
		info
		}
		sessionStorage.setItem("data",JSON.stringify(data));
		
	},


	
	}
	
	});
 

var todoproducto= new Vue({
	el:'#todoproducto',
	data:{
		all:[],
		lista_deseo:{
			fk_idusuario:'',
			nombre_producto:'',
			precio_venta:'',
			descprod:'',
			imagen:'',
			Libra:'0',
			Arroba:'0',
			Quintal:'0',
			Caja:'0',
			isagotado:'',
			id_quiere:'',
			accion:'nuevo'
		},

		pintar:false
	
	},
	created:function () {
		this.traer_todo();
		this.traerlogueo();
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
		traerlogueo:function(){
			fetch(`Private/Modulos/usuarios/procesos.php?proceso=traerusuarios&login=""`).then(resp=>resp.json()).then(resp=>{
				this.lista_deseo.id_quiere=resp[0].idusuario;
			})
		}
		,
		addlista:function(producto){
		
			this.lista_deseo.fk_idusuario=producto.idusuario,
			this.lista_deseo.nombre_producto=producto.nombre_producto,
			this.lista_deseo.precio_venta=producto.precio_venta,
			this.lista_deseo.descprod=producto.descprod,
			this.lista_deseo.imagen=producto.imagen,
			this.lista_deseo.Libra=producto.Libra,
			this.lista_deseo.Arroba=producto.Arroba,
			this.lista_deseo.Quintal=producto.Quintal,
			this.lista_deseo.Caja=producto.Caja,
			this.lista_deseo.isagotado=producto.isagotado;
			console.log(this.lista_deseo);
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=guardarlista&miproducto=${JSON.stringify(this.lista_deseo) }`).then(resp=>resp.json()).then(resp=>{
				alertify.success(resp.msg);
				if(resp.msg=='Producto Añadido a Lista de Deseos'){
					pintar=true;
				}else{
					pintar=false;
				}
			});
		}		  
	}
})