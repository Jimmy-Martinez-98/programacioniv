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
                   

                } else {
                    // No user is signed in.
                    location.href = "../../login.html";
                }
            });
        },
        getDataFromDataBase: function (key) {
          
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
         chat: function () {
            $.get("chatAdmin/chatAdmin.html", function (data) {
                $('#contendedor').html(data);
            });
         },
        
    },
});