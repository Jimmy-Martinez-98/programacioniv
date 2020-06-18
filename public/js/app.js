/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file app.js-> sirve para la interaccion con la barra de navegacion
 */
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
         $("#contenedor").load("public/vistas/home/home.html",function(data){
            $(this).html(data);
         
           
         });
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
         },
         inicio(){
               $("#contenedor").load("public/vistas/home/home.html",function(data){
                  $(this).html(data);       
               });

         },
         verdura(){
            $("#contenedor").load("public/vistas/verduras/verduras.html",function(data){
               $(this).html(data);
            });
         },
         legumbre(){
            $("#contenedor").load("public/vistas/legumbres/legumbres.html",function(data){
               $(this).html(data);
            });
         },
         fruto(){
            $("#contenedor").load("public/vistas/frutos/frutos.html",function(data){
               $(this).html(data);
            });
         },
         blog:function(){
            $("#contenedor").load("public/vistas/blog/blog.html",function(data){
               $(this).html(data);
            });
         }
         ,
         login(){
            location.href="login.php"
         }
        
      }
   });
