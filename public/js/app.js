


   var validarsession=new Vue({
      el:"#hola",
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
		
            $("#toggles").animate({
             height: 'toggle'
            });
         }
        
      }
   });










  
   
$(document).ready(function () {
   $("#contenedor").load("public/vistas/home/home.html",function(data){
      $(this).html(data);
   
     
   });
   $('#home').click(()=>{
     
	   $("#contenedor").load("public/vistas/home/home.html",function(data){
         $(this).html(data);
      
        
      });
   
   });

   $('#verduras').click(()=>{
      console.log('hola');
      
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
  



