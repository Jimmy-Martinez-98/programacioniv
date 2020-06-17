
var appinfo = new Vue({
	el: '#nosotrosdiv',
	data: {
		we:[]
	},
	created:function(){	
		this.todo();
		
		
	},
	methods:{
		todo:function(){
			fetch(`Private/Modulos/about/procesos.php?proceso=recibirinfo&nosotros=${JSON.stringify(this.we)}`).then( resp=>resp.json() ).then(resp=>{ 
				this.we=resp[0];
				
				
				
			});			
		},
		editardatos:function(id){
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=traerid&nuevoP=""`).then(resp=>resp.json()).then(resp=>{
				appedit.edidar.fk_idusuario=resp[0].idusuario;	
			});
			appedit.edidar=id;
			appedit.edidar.accion='modificar'
		}
			
	}
});



var appedit = new Vue({
	el: '#modaleditar',
	data: {

		edidar:{
			accion:'modificar',
			descripcion:'',
			imagen:'',
			infoUsuario:'',
			fk_idusuario:''
			
		},
	
		imagenlittle:''
	},
	methods:{
		guardar:function(){	
		
			fetch(`private/Modulos/about/procesos.php?proceso=recibirDatos&nosotros=${JSON.stringify(this.edidar)}`).then( resp=>resp.json() ).then(resp=>{ 
				if(resp.msg!='Datos Actualizados Exitosamente'){
					alertify.warning(resp.msg);	
				}else{
					alertify.success(resp.msg);	
					appinfo.todo();
				
				}
			});
		}
		,
		obtenerimagen(e){
			let file=e.target.files[0];
			this.cargar(file);
			var respuesta=null;
			var formData=new FormData($('#imgs')[0]);
			var ruta='Private/Modulos/about/guardarimagencoo.php';
			$.ajax({
				type: "POST",
				url: ruta,
				data: formData,
				contentType:false,
				processData:false,
				async:false,
				success: function (response) {
				respuesta=response;
				}
			});
			this.edidar.imagen="Private/Modulos/about/"+respuesta;
		},
		cargar(file){
			let reader=new FileReader();
			reader.onload=(e)=>{
				this.imagenlittle=e.target.result;
			}
			reader.readAsDataURL(file);
		}
		
	},
	computed:{
		bindearimagen(){	
			return this.imagenlittle;	
			
		}
	}
});










var appnueva=new Vue({
	el:'#nuevam',
	data:{
		descripciones:{
			idusuario:0,
			imagen:'',
			describ:'',
			accion:'nuevo'
		},
		imglittle:''
	},
	created:function(){
		this.traerusuario();
	
	}
	,methods:{

		traerusuario:function(){
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=traerid&nuevoP=""`).then(resp=>resp.json()).then(resp=>{
				this.descripciones.idusuario = resp[0].idusuario;
				
			});
		},

		nuevosdatos :function () {
			fetch(`Private/Modulos/about/procesos.php?proceso=recibirdesc&nosotros=${JSON.stringify(this.descripciones)}`).then( resp=>resp.json() ).then(resp=>{ 
				if(resp.msg!="Tus datos se almacenaron exitosamente"){
					alertify.warning(resp.msg);		
					
				}else {
					alertify.success(resp.msg);	
					appinfo.todo();
				}				
			});		
		},obtenerimagenN(e){
			let file=e.target.files[0];

			this.cargar(file);

			var respuesta=null;

			var formData=new FormData($('#datos')[0]);

			var ruta='Private/Modulos/about/guardarimagencoo.php';
			
			$.ajax({
				type: "POST",
				url: ruta,
				data: formData,
				contentType:false,
				processData:false,
				async:false,
				success: function (response) {
				respuesta=response;
				}
				
			});

			this.descripciones.imagen="Private/Modulos/about/"+respuesta;
		},
		cargar(file){
			let reader=new FileReader();
			reader.onload=(e)=>{
				this.imglittle=e.target.result;
				
				
			}
			reader.readAsDataURL(file);
		},
	},
	computed:{
		bindearimagenN(){
			return this.imglittle;
		}
	}
});	