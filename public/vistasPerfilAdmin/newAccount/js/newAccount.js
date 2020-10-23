Vue.component('v-select', VueSelect.VueSelect);
var newAccount = new Vue({
    el: '#formCreate',
    data: {
        account: {
            name: '',
        },
        typeSeller: '',
        productor: '',
        cooperativa: '',
        options: [],
        admin: '',
        selectU: '',
        users: []

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
                    newAccount.getUSers(user.uid)
                    newAccount.admin = user.uid;
                } else {
                    // No user is signed in.
                    location.href = "../../login.html";
                }
            });
        },
        createUser: function () {
            if (this.selectU !== '' && this.typeSeller !== '') {
                this.users.forEach(element => {
                    if (element.correo === this.selectU) {
                        if (this.typeSeller === 'cooperativa') {
                            if (this.account.name !== '') {
                                firebaseDB.ref('users/' + element.uId).update({
                                    role: 1,
                                    nombreCooperativa: newAccount.account.name
                                }).then(() => {
                                    this.openNotification('Cuenta Creada!!!', 'success')
                                }).catch((e) => {
                                    this.openNotification('Fallo al crear cuenta', 'danger')
                                });
                            }
                        } else {
                            firebaseDB.ref('users/' + element.uId).update({
                                role: 1,
                                tipoU: 'Productor Pequeño'
                            }).then(() => {
                                this.openNotification('Cuenta Creada!!!', 'success')
                            }).catch((e) => {
                                this.openNotification('Fallo al crear cuenta', 'danger')
                            });
                        }

                    }
                });
            } else {

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

        },
        getUSers: function (user) {
            firebaseDB.ref('users/').on('value', snap => {
                snap.forEach(element => {
                    if (element.val().uId !== user) {
                        this.options.push(element.val().correo);
                        this.users.push(element.val());
                    }


                });
            })
        }
    }
})