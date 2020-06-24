/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file nosotros.js-> Sirve para la configuracion de la informacion del productor
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var appinfo = new Vue({
	el: '#nosotrosdiv',
	data: {
		we:[]
	},

	created:function(){	
		this.todo();
		
		
	},
	methods:{
		/**
		 * 	Trae imagen y descripcion de la cooperativa o productor
		 * @access public
		 * @function todo
		 */
		todo:function(){
			fetch(`Private/Modulos/about/procesos.php?proceso=recibirinfo&nosotros=${JSON.stringify(this.we)}`).then( resp=>resp.json() ).then(resp=>{ 
				this.we=resp[0];
			});			
		},
		/**
		 * Hace una peticion al archivo procesos.php para traer el id de usuario y asignarlo a appedit en su data: edidar
		 * Igualmente le asigna la informacion del item seleccionado 
		 * @access public
		 * @function editardatos
		 * @param {object} id - Representa la informacion del item seleccionado 
		 */
		editardatos:function(id){
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=traerid&nuevoP=""`).then(resp=>resp.json()).then(resp=>{
				appedit.edidar.fk_idusuario=resp[0].idusuario;	
				
				
			});
			appedit.edidar=id;
			appedit.edidar.accion='modificar'
		}
			
	}
});

	/** 
	 * @instance objeto de instancia de Vue.js
	*/
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

		/**
		 * Actualiza los datos de la informacion del usuario
		 * @access public
		 * @function guardar
		 */
		guardar:function(){	
			fetch(`private/Modulos/about/procesos.php?proceso=recibirDatos&nosotros=${JSON.stringify(this.edidar)}`).then( resp=>resp.json() ).then(resp=>{ 
				if(resp.msg!='Datos Actualizados Exitosamente'){
					alertify.warning(resp.msg);	
				}else{
					alertify.success(resp.msg);	
					appinfo.todo();
				
				}
			});
		},

		/**
		  * Obtiene la imagen que esta en el tag img para guardarlo en carpeta y
		  *  asignarlo a edidar.imagen su direccion
		  * @access public
		  * @function obtenerimagen
		  * @param {objec} e - Representa el cambio en el tag img 
		  */
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

		/**
		 * Carga la imagen en el tag img
		 * @access public
		 * @function cargarimagen
		 * @param {object} file -Reprecenta el archivo de imagen 
		 */
		cargar(file){
			let reader=new FileReader();
			reader.onload=(e)=>{
				this.imagenlittle=e.target.result;
			}
			reader.readAsDataURL(file);
		}
		
	},
	computed:{

		/**
		 * Retorna la imagen en el tag img
		 * @access public
		 * @function bindearimagen	
		 * @returns imagenlittle - Representa la imagen en si
		 */
		bindearimagen(){	
			return this.imagenlittle;	
			
		}
	}
});










var appnueva=new Vue({
	el:'#nuevam',
	data:{
		descripciones:{
			fk_idusuario:0,
			imagen:'',
			descripcion:'',
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
				this.descripciones.fk_idusuario = resp[0].idusuario;
				
				

				
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