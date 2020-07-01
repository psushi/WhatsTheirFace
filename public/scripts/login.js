firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById("login-div").style.display="none";
      document.getElementById("user-div").style.display="block";
      var user = firebase.auth().currentUser;

      if(user!=null){
          var email = user.email;
      }

      document.getElementById("user-para").innerHTML =  email;
        



    } else {
      // No user is signed in.
      document.getElementById("login-div").style.display="block";
      document.getElementById("user-div").style.display="none";
    }
  });



function login_alert() {

    var userEmail = document.getElementById("email_field").value;
    var userPassword = document.getElementById("password_field").value;
    
    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        window.alert("Error:" + errorMessage)
      });
}

function logout() {
    firebase.auth().signOut();
    
}