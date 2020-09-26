var Admin = new Vue({
    el: "#menuNavegacion",
    data: {
        userLog: "",
    },
    created: function () {
        this.watchUser();
    },
    methods: {
        watchUser: function () {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    // User is signed in.
                    Admin.getDataFromDataBase(user.uid);
                    console.log(user.uid);

                } else {
                    // No user is signed in.
                    location.href = "../../login.html";
                }
            });
        },
        getDataFromDataBase: function (key) {
            console.log(key);

            firebaseDB.ref("users/").on("value", (snap) => {
                snap.forEach((element) => {
                    if (key === element.val().uId) {
                        this.userLog = element.val().nombreUsuario;
                    }
                });
            });
        },
        signOut: function () {
            firebaseAuth.signOut();
        },
        newAccount: function () {

            $.get("newAccount/newAccount.html", function (data) {
                $('#contendedor').html(data);
            });
        },
        /* inboxTab: function () {
             $("#contendedor").load("viewChat/chat.html", function (data) {
                 $(this).html(data);
             });
         },
         accountSettings: function () {
             $("#contendedor").load("viewSettings/settings.html", function (data) {
                 $(this).html(data);
             });
         },*/
    },
});