var appofertas = new Vue({
el:"#frm-ofertas",
data:{
	productos:[]
},

created:function(){
		 
	this.traerProductos();
	
},
methods:{
	traerProductos:function(){
		fetch(`Private/Modulos/misproductos/proceso.php?proceso=recibirDatos&miproducto=${JSON.stringify(this.productos)}`).then( resp=>resp.json() ).then(resp=>{ 
			this.productos = resp;	
		console.log(this.productos);
		
	});
	},
	modoferta:function(id){
		modaloferta.datosprod=id;	
		
	}
}

})


var modaloferta=new Vue({
el:"#frmoferta",
data:{
	oferta:{
		idproducto:0,
		poferta:''
	},
	datosprod:{
		
	}
},methods:{
	guardaroferta:function(){
		fetch(`/Private/Modulos/publicarproducto/procesos.php`)
	}
}


})