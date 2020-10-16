/**
 * @author Jimmy Martinez <jimmimartinez215@gmail.com>
 * @file guardar.js-> Sirve para guardar datos de la direccion del usuario
 * @license MIT Libre disttribucion
 * @instance objeto de instancia de Vue.js
 */
var user = firebaseAuth.currentUser;
var mostrarDBanc = new Vue({
  el: "#frm-datosBancarios",
  data: {
    datosBancarios: [],
  },
  created: function () {
    this.info();
  },
  methods: {
    /**
     * Trae los datos banacrios de el usuario desde la DB
     * @access public
     * @function info
     */
    info: function () {
      let data = [];
      if (user) {
        firebaseDB.ref("DatosBancarios/").on("value", (snapshot) => {
          snapshot.forEach((element) => {
            if (user.uid == element.val().idUsuario) {
              data.push(element.val());
            }
          });
          this.datosBancarios = data[0];
        });
      }
    },

    /**
     * Asigna el item selecionado a la variable EditardatosBancarios en su data: modDatosBancarios
     * @access public
     * @function editardire
     * @param {object} modD - contiene los datos bancarios seleccionados 
     */
    editardatosbancarios: function (modD) {
      EditardatosBancarios.modDatosBancarios = modD;
      EditardatosBancarios.modDatosBancarios.accion = "modificar";
    },
  },
});

/**
 * @instance objeto de instancia de Vue.js
 */
var EditardatosBancarios = new Vue({
  el: "#modalmodificar",
  data: {
    modDatosBancarios: {
      accion: "modificar",
    },
  },
  methods: {
    /**
     * Metodo para actualizar datos bancarios
     * @access public
     * @function actualizar
     */
    actualizar: function () {
      let datos = this.jsonParse(
        this.modDatosBancarios.idDatosBancarios,
        this.modDatosBancarios.idUsuario,
        this.modDatosBancarios.cuentaI,
        this.modDatosBancarios.bancoI,
        this.modDatosBancarios.cuentaII,
        this.modDatosBancarios.bancoII,
        this.modDatosBancarios.cuentaIII,
        this.modDatosBancarios.bancoIII
      );
      if (this.modDatosBancarios.cuentaI != "" && this.modDatosBancarios.bancoI != "") {
        firebaseDB
          .ref("DatosBancarios/" + this.modDatosBancarios.idDatosBancarios)
          .update(datos, () => {
            this.openNotificacion('success', 'Datos bancarios', 'Datos bancarios actualizados correctamente');
            mostrarDBanc.info();
            this.limpiar();
          })
          .catch((error) => {
            this.openNotificacion('success', 'Datos bancarios', 'Error');
          });
      } else {
        if (this.modDatosBancarios.cuentaII != "" && this.modDatosBancarios.bancoII != "") {
          firebaseDB
          .ref("DatosBancarios/" + this.modDatosBancarios.idDatosBancarios)
          .update(datos, () => {
            this.openNotificacion('success', 'Datos bancarios', 'Datos bancarios actualizados correctamente');
            mostrarDBanc.info();
            this.limpiar();
          })
          .catch((error) => {
            this.openNotificacion('success', 'Datos bancarios', 'Error');
          });
        } else {
          if (this.modDatosBancarios.cuentaIII != "" && this.modDatosBancarios.bancoIII != "") {
            firebaseDB
              .ref("DatosBancarios/" + this.modDatosBancarios.idDatosBancarios)
              .update(datos, () => {
                this.openNotificacion('success', 'Datos bancarios', 'Datos bancarios actualizados correctamente');
                mostrarDBanc.info();
                this.limpiar();
              })
              .catch((error) => {
                this.openNotificacion('success', 'Datos bancarios', 'Error');
              });
          } else {
            this.openNotificacion('danger', 'Datos bancarios', 'Debe tener al menos una cuenta de banco');
            mostrarDBanc.info();
          }
        }
      }
    },
    jsonParse: function (key, idU, cuentaI,bancoI,cuentaII,bancoII,cuentaIII,bancoIII) {
      let data = {
        idDatosBancarios: key,
        idUsuario: idU,
        cuentaI: cuentaI,
        bancoI: bancoI,
        cuentaII: cuentaII,
        bancoII: bancoII,
        cuentaIII: cuentaIII,
        bancoIII: bancoIII,
      };
      return data;
    },
    limpiar:function(){
      this.modDatosBancarios.idDatosBancarios='';
      this.modDatosBancarios.idUsuario='';
      this.modDatosBancarios.cuentaI = '';
      this.modDatosBancarios.bancoI = '';
      this.modDatosBancarios.cuentaII = '';
      this.modDatosBancarios.bancoII = '';
      this.modDatosBancarios.cuentaIII = '';
      this.modDatosBancarios.bancoIII='';
    },
      /**
         * 
         * @param {String} color -> representa el color de la notificacion 
         * @param {String} title -> representa el titulo de la notificacion
         * @param {String} text  -> representa el texto de la notificacion
         */
        openNotificacion: function (color, title, text) {
          this.$vs.notification({
              square: true,
              progress: "auto",
              color: color,
              title: title,
              text: text,
              position: "top-right",
          });
      }
  },
});

/**
 * @instance objeto de instancia de Vue.js
 */
var nuevoDatosBancarios = new Vue({
  el: "#nuevoDatosBancarios",
  data: {
    NdatosBancarios: {
      cuentaI: "",
      bancoI: "",
      cuentaII: "",
      bancoII: "",
      cuentaIII: "",
      bancoIII:"",
      accion: "nuevo",
    },
  },
  methods: {
    /**
     * envia los datos recolectados en el arrego NdatosBancarios para su procesamiento en php
     * Donde si php responde con Registro Insertado Correctamente mostrara alerta de exito
     *  si no una de error
     * @access public
     * @function almacenar
     */
    almacenar: function () {
      let newKey = firebaseDB.ref().child("DatosBancarios/").push().key;
      let data = this.jsonParse(newKey, user.uid, this.NdatosBancarios.cuentaI,this.NdatosBancarios.bancoI, this.NdatosBancarios.cuentaII, this.NdatosBancarios.bancoII,this.NdatosBancarios.cuentaIII,this.NdatosBancarios.bancoIII);
      if (user) {
        if (this.NdatosBancarios.cuentaI != "" && this.NdatosBancarios.bancoI != "") {
          firebaseDB
            .ref("DatosBancarios/" + newKey)
            .set(data)
            .then(() => {
              this.openNotificacion('success', 'Datos bancarios', 'Datos bancarios almacenados correctamente');
              nuevoDatosBancarios.limpiar();
            })
            .catch((error) => {
              this.openNotificacion('success', 'Datos bancarios', 'Error');
            });
        } else {
          if (this.NdatosBancarios.cuentaII != "" && this.NdatosBancarios.bancoII != "") {
            firebaseDB
              .ref("DatosBancarios/" + newKey)
              .set(data)
              .then(() => {
                this.openNotificacion('success', 'Datos bancarios', 'Datos bancarios almacenados correctamente');
                nuevoDatosBancarios.limpiar();
              })
              .catch((error) => {
                this.openNotificacion('success', 'Datos bancarios', 'Error');
              });
          } else {
            if (this.NdatosBancarios.cuentaIII != "" && this.NdatosBancarios.bancoIII != "") {
              firebaseDB
                .ref("DatosBancarios/" + newKey)
                .set(data)
                .then(() => {
                  this.openNotificacion('success', 'Datos bancarios', 'Datos bancarios almacenados correctamente');
                  nuevoDatosBancarios.limpiar();
                })
                .catch((error) => {
                  this.openNotificacion('success', 'Datos bancarios', 'Error');
                });
            } else {
              this.openNotificacion('danger', 'Datos bancarios', 'Debe agregar al menos una cuenta de banco');
            }
          }
        }
      }
    },
    jsonParse: function (key, idU, cuentaI,bancoI,cuentaII,bancoII,cuentaIII,bancoIII) {
      let data = {
        idDatosBancarios: key,
        idUsuario: idU,
        cuentaI: cuentaI,
        bancoI: bancoI,
        cuentaII: cuentaII,
        bancoII: bancoII,
        cuentaIII: cuentaIII,
        bancoIII: bancoIII,
      };
      return data;
    },
    limpiar: function () {
      this.NdatosBancarios.cuentaI = "";
      this.NdatosBancarios.cuentaII = "";
      this.NdatosBancarios.cuentaIII = "";
      this.NdatosBancarios.bancoI = "";
      this.NdatosBancarios.bancoII = "";
      this.NdatosBancarios.bancoIII = "";
    },
    /**
         * 
         * @param {String} color -> representa el color de la notificacion 
         * @param {String} title -> representa el titulo de la notificacion
         * @param {String} text  -> representa el texto de la notificacion
         */
        openNotificacion: function (color, title, text) {
          this.$vs.notification({
              square: true,
              progress: "auto",
              color: color,
              title: title,
              text: text,
              position: "top-right",
          });
      }
  },
});
