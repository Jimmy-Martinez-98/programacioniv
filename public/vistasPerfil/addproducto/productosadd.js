var publicarp=new Vue({
	el:'#frm-productoN',
	data: {
		publicP:{
			idprod:0,
			idusuario:0,
			nombre:'',
			descripcion:'',
			Categoria:'',
			imagen:'',
			Existencias:'',
			Precio:'',
			precioventa:'',
			fechasubida:'',
			accion:'nuevo',
			msg:''
		},
	
		

	},
	created:function(){this.traerid()},
	
	methods:{
		traerid:function(){
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=traerid&nuevoP=""`).then(resp=>resp.json()).then(resp=>{
				this.publicP.idusuario=resp[0].idusuario;
				console.log('resp=',resp[0].idusuario,'usuario=',this.publicP.idusuario);
				

			})
		},
		guardar:function(){

			console.log('imagen subida',this.publicP);
			
			fetch(`Private/Modulos/publicarproducto/procesos.php?proceso=recibirDatos&nuevoP=${JSON.stringify(this.publicP )}`).then( resp=>resp.json() ).then(resp=>{ 
			
				if(resp.msg!="Su Producto Fue Publicado Exitosamente"){
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: resp.msg,
						showConfirmButton: false,
						timer: 1500
					  })
				} else{
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: resp.msg,
						showConfirmButton: false,
						timer: 1500
					  })
				}
				
			});	  
		
		},
	}
});






var verimagen = document.getElementById('img-preview');
var Uploader = document.getElementById('img-uploader');
var Uploadbar = document.getElementById('img-upload-bar');

var CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/michaelslayer/image/upload`
var CLOUDINARY_UPLOAD_PRESET = 'hliq2aqu';

Uploader.addEventListener('change', async (e) => {
    // console.log(e);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    // Send to cloudianry
    const res = await axios.post(
        CLOUDINARY_URL,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress (e) {
                let progress = Math.round((e.loaded * 100.0) / e.total);
                console.log(progress);
              Uploadbar.setAttribute('value',progress)
            }
        }
    );
    console.log(res);
	verimagen.src = res.data.secure_url;
	publicarp.publicP.imagen=res.data.secure_url;
});