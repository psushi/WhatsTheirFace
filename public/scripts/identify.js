firebase.auth().onAuthStateChanged(user => {
    if(user) {
        console.log("user signed-in");
    }

    else {
        window.alert("no users wtf");
        
    }
  });


function upload() {
   
    var image = document.getElementById("inpFile").files[0];
    var uploadPrompt = document.getElementById("uploadDone");
    var uploadImage= document.getElementById("uploadImage")

    if(image){
        console.log("got here")
        document.getElementById("progressBar").style.display="inline-block";
        var user = firebase.auth().currentUser;
        var userId = user.uid;
    
        var imagename=image.name;
        var storageRef= firebase.storage().ref('images/'+userId+"/"+imagename);
        var progressBar = document.getElementById("progressBar");
        var userInfo = document.getElementById("userInfo");

        var uploadTask = storageRef.put(image);
        
        uploadTask.on('state_changed',function(snapshot){
            //observe state change events such as progress, pause , resume
            //get task progress by including the number of bytes uploaded
            
            var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
            console.log("upload is" + progress + " done.");
            
            progressBar.setAttribute("value",Math.round(progress));
            if(progress===100){
                console.log("inside")
                progressBar.style.display="none";
                uploadPrompt.innerHTML ="Upload Finished!";
                uploadPrompt.style.display = "block";
                
                
            }


        },function (error) {
            console.log(error.message);
        }, function () {
            //succesful upload
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL){
                //uploaded image url 
                console.log(downloadURL);
            })

        }
        )
    
    }

    else{
        document.getElementById("uploadDone").innerHTML = "Please add an image for upload";
        document.getElementById("uploadDone").style.display="block";
    
    }
}

const inpFile = document.getElementById("inpFile");
const previewContainer = document.getElementById("imagePreview");
const previewImage = previewContainer.querySelector(".image-preview__image");
const previewDefaultTex = previewContainer.querySelector(".image-preview__default-text");

inpFile.addEventListener("change" , function() {

    document.getElementById("uploadDone").style.display="none";
    document.getElementById("progressBar").setAttribute("value","0");
    const file = this.files[0];
    if(file) {
        const reader = new FileReader();
        previewDefaultTex.style.display="none";
        previewImage.style.display="block";

        reader.addEventListener("load", function() {
            console.log(this);
            previewImage.setAttribute("src", this.result);

        });

        reader.readAsDataURL(file);
    }

    else{
            previewDefaultTex.style.display=null;
            previewImage.style.display=null;
            previewImage.setAttribute("src","");

        }

    
})


function submitInfo() {

    var name = document.getElementById("userName").value;
    var relation = document.getElementById("userRelation").value;
    var database = firebase.database(); 
    userData = database.ref().child("users");
    var user = firebase.auth().currentUser;
    var userEmail = user.email;
    var userID = user.uid;
    
    console.log("works");
    console.log(user);



    if(name)
    {
        console.log("got in");
        console.log(typeof(userEmail));
        userData.child(userID).push({
            Name: name,
            relationship: relation
        });
    }


    setTimeout( function () {
        document.getElementById("submitInfo").style.display = "none";
        document.getElementById("afterSubmit").style.display="block";
        },1000)

}



function getData(){
    var user = firebase.auth().currentUser;
    var database = firebase.database();
    var userRef = database.ref('users/'+user.uid);
    var userKeys = [];
    var userEmbeddings=[];


    userRef.on('value',function(data) {
        var info = data.val();
        var keys = Object.keys(info);
        
        for(var i=0;i<keys.length;i++){
            var k = keys[i];
            userKeys.push(info[k].Name); 
            userEmbeddings.push(info[k].embedding);
            
            

        }
        console.log(userEmbeddings);



        
        

    });

   


}

    







    