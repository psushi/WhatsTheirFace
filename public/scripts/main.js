

function works() {
    alert("works!");
}

function logoff() {
    firebase.auth().signOut();
   
}


//Handle Account Status
firebase.auth().onAuthStateChanged(user => {
    if(!user) {
        window.location.href="index.html";
    }

    else {
        var mailid = document.getElementById("userlogin");
        var email = user.email;
        mailid.innerHTML = email
        
    }
  });









