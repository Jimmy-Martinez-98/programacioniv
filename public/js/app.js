
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








$(document).ready(function () {
   toggle();
  
   

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
  
  
  

   $('ul li a:first').addClass('active');

   $('ul li a').click(function (e) { 
      $('ul li a').removeClass('active');
      $(this).addClass('active');
      
   });
	  
function toggle(){
	$("#toggles").click(function(){
		console.log("click");
		
        $(".collapse").animate({
			height: 'toggle'
		  });
	  });
}


