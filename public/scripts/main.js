

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

    const Url = 'https://us-central1-first-cloud-function-282616.cloudfunctions.net/hello_get?name=Sushi&number=3'
    const testUrl = 'https://jsonplaceholder.typicode.com/posts';
    axios.get(Url)
    .then(data=>console.log(data.data))
    .catch(err=>console.log(err))




}






/*var extern = document.getElementsByTagName("link")[4].import;
email = extern.getElementsByTagName('p')[0].innerHTML;

alert("email: "+ email);

document.getElementById('userlogin').innerHTML = email;*/






