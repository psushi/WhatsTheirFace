

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

function testit(){

    var xhr = new XMLHttpRequest();
    var url = "https://us-central1-first-cloud-function-282616.cloudfunctions.net/face_embedding";
    xhr.open("POST",url,true);
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.onreadystatechange = function() {
        if(xhr.readyState===4 & xhr.status===200){
            console.log(xhr.responseText)
            //var json=JSON.parse(xhr.responseText);
            //console.log(json.email+ ", "+json.password);
        }
    };

    var data = JSON.stringify({"email":"hey@mail","password":"1010101"});
    xhr.send(data);





}






/*var extern = document.getElementsByTagName("link")[4].import;
email = extern.getElementsByTagName('p')[0].innerHTML;

alert("email: "+ email);

document.getElementById('userlogin').innerHTML = email;*/






