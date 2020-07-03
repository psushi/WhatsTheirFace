function works() {
    alert("works!");
}

function logoff() {
   firebase.auth().signOut();
    window.location.href  = "loginpage.html";
}




/*var extern = document.getElementsByTagName("link")[4].import;
email = extern.getElementsByTagName('p')[0].innerHTML;

alert("email: "+ email);

document.getElementById('userlogin').innerHTML = email;*/






