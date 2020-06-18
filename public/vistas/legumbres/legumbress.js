var seccionlegumbre = new Vue({
	el:'#legum',
	data:{
		legumbressss:[],
		valor:''
		
	},
	methods:{
		traerlegumbres:function(){
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirlegumbres&miproducto=${JSON.stringify(this.legumbressss )}`).then( resp=>resp.json() ).then(resp=>{ 
			this.legumbressss=resp;		
			   
			 });	
		},
		buscarL:function () {
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=buscarproductosL&miproducto=${this.valor}`).then(resp=>resp.json()).then(resp=>{
					
					
			this.legumbressss=resp;	
		});
		  }
		,
		autobusquda:function(){
			if(this.valor==''){
				this.traerlegumbres();
			}
		},
		verProd(info){
			var data={
				info
			 }
			 
				sessionStorage.setItem("data",JSON.stringify(data));
				location.href="productos.html"
		},
		descL:function () { 
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirbusquedatipoDESCL&miproducto=${JSON.stringify(this.legumbressss)}`).then(resp=>resp.json()).then(resp=>{		
				this.legumbressss=resp;	
					
					});
		 },
		ascL:function () { 
			fetch(`Private/Modulos/inicio+secciones/procesos.php?proceso=recibirbusquedatipoASCL&miproducto=${JSON.stringify(this.legumbressss)}`).then(resp=>resp.json()).then(resp=>{		
				this.legumbressss=resp;	
					
					});
		 }
	},
	created:function(){
		this.traerlegumbres();
	}



})