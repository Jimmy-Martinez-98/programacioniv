
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




