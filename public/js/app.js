
var app=new Vue({
   el:"#slider",
   data:{
      productos:[],
      items:[],
      clase:''
    
   },
   created:function(){
   this.datoss();
   
   },
   methods:{
    
   
      datoss:function(){         
         fetch(`Private/Modulos/inicio/procesos.php?proceso=recibirDatos&miproducto=${JSON.stringify(this.productos )}`).then( resp=>resp.json() ).then(resp=>{ 
            this.productos = resp;		
           
              
            var ojo=[]
            var datos=[]
            resp.forEach(element => {
                 ojo.push(element);
               datos =ojo;    
              
            }); 
            
            console.log("hey",datos.length);
            
           for (let index = 0; index < datos.length; index++) {

                  console.log(index);
                  this.items=index
                 
              
           }
          
          datos.find(function (value,index) {
             if(index===0){
             console.log('active');
               $('.carousel-item ').addClass('active');
             }
            
            })
          
           
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
  



