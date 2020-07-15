/**
 * @author Michael Rodriguez <scottlovos503@gmail.com>
 * @file horario.js-> Sirve para el guardado de el horario de trabajo
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var appHorarios = new Vue({
  el: "#horarioos",
  data: {
    horario: {
      horaDe: "",
      horaA: "",
      Dias: "",
    },
  },

  methods: {

    horarios:function(){
      let uId = firebaseAuth.currentUser.uid;
      let db = firebaseDB;
      let data=[]
      db.ref("horarioTrabajo/").on("value", (snap) => {
        snap.forEach((element) => {
          if (uId === element.val().idU) {
            data.push(element.val());
          }
        });
        if(data!=''){
          appHorarios.horario=data[0];
        }else{
          appHorarios.horario='';
         
          
        }
        
        
        
      });
    },
    /**
     * Guarda el nuevo horario
     * @access public
     * @function guardar_horario
     */
    guardarHorario: function () {
      let user = firebaseAuth.currentUser;
      let db = firebaseDB;
      if (user) {
        console.log("si Hay");
        if (
          this.horario.horaDe != '' &&
          this.horario.horaA != '' &&
          this.horario.dias!='' 
        ) {
          let uId = user.uid;
          let key = db.ref().child("horarioTrabajo/").push().key;
          let data = this.jsonParse(
            uId,
            key,
            this.horario.horaDe,
            this.horario.horaA,
            this.horario.Dias
          );
          db.ref("horarioTrabajo/" + key)
            .set(data)
            .then(() => {
              swal.fire({
                title: "OK!",
                text: "Datos Guardados Exitosamente",
                icon: "success",
              });
              appHorarios.limpiar();
            })
            .catch(() => {
              swal.fire({
                title: "Error",
                text: "Ocurrio un error inesperado",
                icon: "error",
              });
            });
        } else {
          swal.fire({
            title: "Alerta!",
            text: "Complete los campos",
            icon: "info",
          });
        }
      } else {
        console.log("no Hay");
      }
    },
    jsonParse(key,id,horaDe,horaA,Dias){
      let data={
        'idHorario':key,
        'idU':id,
        'horaDe':horaDe+' '+'AM',
        'horaA':horaA+' '+'PM',
        'Dias':Dias
      }
      return data;
    },

    /**
     * Edita un Horario seleccionado
     * @access public
     * @function editar_horario
     */
    editar_horario: function () {
      fetch(
        `Private/Modulos/about/procesos.php?proceso=recibirhorario&nosotros=${JSON.stringify(
          this.horario
        )}`
      )
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.msg === "Horario Actualizado Correctamentee") {
            Swal.fire({
              icon: "error",
              text: resp.msg,
            });
          } else {
            Swal.fire({
              icon: "success",
              text: resp.msg,
            });
            appleerH.leerhorarios();
          }
        });
    },
    /**
     * Limpia los inputs
     * @access public
     * @function limpiar
     */
    limpiar: function () {
      (this.horario.id_horario = 0), (this.horario.id_inf = "");
      this.horario.Horas1 = "";
      this.horario.HORA2 = "";
      this.horario.Dias = "";
      this.horario.accion = "nuevo";
      appleerH.leerhorarios();
    },
  },
});
