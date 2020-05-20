
var app=new Vue({
   el:"#slider",
   data:{
      productos:[]
   },
   created:function(){
   this.datoss();
   },
   methods:{
      datoss:function(){         
         fetch(`Private/Modulos/inicio/procesos.php?proceso=recibirDatos&miproducto=${JSON.stringify(this.productos )}`).then( resp=>resp.json() ).then(resp=>{ 
            this.productos = resp;		   
         });

      },
      verProd(info){
      var data={
         info
      }
       
         sessionStorage.setItem("data",JSON.stringify(data));
         location.href="productos.html"
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
         traercuenta: function (param) {  
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
  




