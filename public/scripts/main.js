function works() {
    alert("works!");
}

function logoff() {
    firebase.auth().signOut();
   
}


//Handle Account Status
firebase.auth().onAuthStateChanged(user => {
    if(!user) {
        window.location.href="loginpage.html";
    }

    else {
        var mailid = document.getElementById("userlogin");
        var email = user.email;
        mailid.innerHTML = email
        
    }
  });







/*var extern = document.getElementsByTagName("link")[4].import;
email = extern.getElementsByTagName('p')[0].innerHTML;

alert("email: "+ email);

document.getElementById('userlogin').innerHTML = email;*/






