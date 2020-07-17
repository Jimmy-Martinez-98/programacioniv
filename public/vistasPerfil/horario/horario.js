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
      DE: "",
      A: "",
      Dias: "",
      accion: "nuevo",
    },
  },

  methods: {
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
          this.horario.horaDe != "" &&
          this.horario.horaA != "" &&
          this.horario.DE != "" &&
          this.horario.A != "" &&
          this.horario.dias != ""
        ) {
          let uId = user.uid;
          let key = db.ref().child("horarioTrabajo/").push().key;
          let data = this.jsonParse(
            key,
            uId,
            this.horario.horaDe,
            this.horario.horaA,
            this.horario.Dias,
            this.horario.DE,
            this.horario.A
          );
          db.ref("horarioTrabajo/" + key)
            .set(data, (error) => {
              if (error) {
                console.log("error", error);
              } else {
                swal.fire({
                  title: "OK!",
                  text: "Datos Guardados Exitosamente",
                  icon: "success",
                });
                appleerH.verHorarios();
                appHorarios.limpiar();
              }
            })
            .catch(() => {
              swal.fire({
                title: "Error",
                text: "Ocurrio un error inesperado",
                icon: "error",
              });
            });
        }else{
          swal.fire({
            text:'Complete los campos',
            icon:'info'
          })
        }
      } else {
        console.log("no Hay");
      }
    },
    jsonParse(key, id, horaDe, horaA, Dias, DE, A) {
      let data = {
        idHorario: key,
        idU: id,
        horaDe: horaDe,
        DE: DE,
        horaA: horaA,
        A: A,
        Dias: Dias,
      };
      return data;
    },

    /**
     * Limpia los inputs
     * @access public
     * @function limpiar
     */
    limpiar: function () {
      this.horario.horaDe = "";
      this.horario.horaA = "";
      this.horario.Dias = "";
      this.horario.DE = "";
      this.horario.A = "";
      this.horario.accion = "nuevo";
      appleerH.verHorarios();
    },
    modificar: function () {
      firebaseDB
        .ref("horarioTrabajo/" + this.horario.idHorario)
        .update(
          {
            horaDe: this.horario.horaDe,
            DE: this.horario.DE,
            horaA: this.horario.horaA,
            A: this.horario.A,
            Dias: this.horario.Dias,
          },
          (error) => {
            if (error) {
              console.log(e);
            } else {
              Swal.fire({
                icon: "success",
                title: "Horario Actualizado",
              });
              appHorarios.limpiar();
             
            }
          }
        )
        .catch(() => {
          swal.fire({
            title: "Ocurrio un error inesperado",
            icon: "error",
          });
        });
    },
  },
});
