firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    document.getElementById("login-div").style.display = "none";
    document.getElementById("user-div").style.display = "block";
    var user = firebase.auth().currentUser;

    if (user != null) {
      var email = user.email;
      var email_verified = user.emailVerified;

      if (email_verified != false) {

        document.getElementById("verification").style.display = "none";

      }
    }

    document.getElementById("user-para").innerHTML = email;




  } else {
    // No user is signed in.
    document.getElementById("login-div").style.display = "block";
    document.getElementById("user-div").style.display = "none";
  }
});



function login_alert() {

  var userEmail = document.getElementById("email_field").value;
  var userPassword = document.getElementById("password_field").value;


  //-----------------------------------------------------------------------------------

  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    window.alert("Error:" + errorMessage);
  });
}

function gotopage() {
  var user = firebase.auth().currentUser;
  var email = user.email;
  var email_verified = user.emailVerified;


  if (email_verified != false) {
    window.location.href = "main.html";
  }
  else {
    alert("Please verify your email address!");
  }
}


function create_account() {
  var userEmail = document.getElementById("email_field").value;
  var userPassword = document.getElementById("password_field").value;
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert(errorMessage);
    // ...
  });


}


function send_verification() {
  var user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function () {

    // Email sent.
    window.alert("Verification sent");
  }).catch(function (error) {
    // An error happened.
    window.alert("Error: " + error);
  });

}