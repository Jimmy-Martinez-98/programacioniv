var newAccount = new Vue({
    el: '#formCreate',
    data: {
        account: {
            name: '',
            correo: '',
            password: '',
            fecha: ''
        },
        typeSeller: '',
        productor: '',
        cooperativa: ''
    },
    created: function () {
        this.getUserLog();
    },

    methods: {
        getUserLog: function () {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    // User is signed in.
                    console.log('ook');

                } else {
                    // No user is signed in.
                    location.href = "../../login.html";
                }
            });
        },
        createUser: function () {
            if (this.productor != '' && this.cooperativa == '') {
                this.account.name = this.productor;
            } else if (this.productor == '' && this.cooperativa != '') {
                this.account.name = this.cooperativa
            } else if (this.productor != '' && this.cooperativa != '') {
                if (this.typeSeller == 'cooperativa') {
                    this.name = this.cooperativa
                    this.productor == null
                } else if (this.typeSeller == 'productor') {
                    this.account.name = this.productor
                }
            }

            if (this.account.correo != '' && this.account.password != '' && this.name != '') {
                let email = this.account.correo;
                let password = this.account.password;
                firebaseAuth.createUserWithEmailAndPassword(email, password).then(() => {
                    this.openNotification('Usuario Creado', 'primary');
                    this.limpiar()
                }).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    if (errorCode == "auth/email-already-in-use") {
                        document.getElementById("alerta").innerHTML = `
                            <div class="alert alert-danger" role="alert">
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>  
                            Dirección de Correo Electronico Ya Existe
                        </div>`;
                    } else if (errorCode == "auth / invalid-email") {
                        document.getElementById("alerta").innerHTML = `
                            <div class="alert alert-danger" role="alert">
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            Direccion de Correo Electronico Invalido
                        </div>`;
                    }
                    // ...
                });

            } else {
                document.getElementById("alerta").innerHTML = `
                            <div class="alert alert-danger" role="alert">
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>  
                            Complete Los Campos Vacios
                        </div>`;
            }

        },

        openNotification: function (msg, color) {
            const noti = this.$vs.notification({
                icon: '<i class="fa fa-user-plus" aria-hidden="true fa-2x"></i>',
                position: 'bottom-center',
                progress: 'auto',
                square: true,
                width: '100%',
                color: color,
                title: msg,
                text: ''
            })
            return noti
        },
        limpiar: function () {
            this.account.name = '';
            this.account.correo = '';
            this.account.fecha = '';
            this.account.password = '';
            this.typeSeller = '';
            this.productor = '';
            this.cooperativa = '';

        }
    }
})