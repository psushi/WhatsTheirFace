var singleGlobalVar ={};


firebase.auth().onAuthStateChanged(user => {
    if(user) {
        console.log("user signed-in");
    }

    else {
        window.alert("no users wth");
        
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
                setTimeout(function (){
                    uploadPrompt.innerHTML="Generating embedding..."
                },500)
                
                
            }


        },function (error) {
            console.log(error.message);
        }, function () {
            //succesful upload
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL){
                //uploaded image url 
                console.log(downloadURL);
                singleGlobalVar.downloadURL = downloadURL;
                
                //calling cloud function and saving it in singleGlobalVar--------------------------------
                
                var xhr = new XMLHttpRequest();
                var url = "https://us-central1-first-cloud-function-282616.cloudfunctions.net/face_embedding";
                xhr.open("POST",url,true);
                xhr.setRequestHeader("Content-Type","application/json");
                xhr.onreadystatechange = function() {
                    if(this.readyState===4 & this.status===200){
                        //var respond = JSON.parse(this.responseText);
                        console.log(this.responseText);
                        console.log(typeof(this.responseText));
                        
                        setTimeout(function (){
                            uploadImage.style.display="none";
                            userInfo.style.display="block";
                            uploadPrompt.style.display = "none";
                            document.getElementById("heading").innerHTML= "Add Information related to Image ";
                        },1000);
                        //singleGlobalVar.embedding = JSON.parse(xhr.responseText).embedding;
                        //alert(singleGlobalVar.embedding[0]);

                        
                    }
                };

                var data = JSON.stringify({"downloadURL":singleGlobalVar.downloadURL});
                xhr.send(data);











            
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

    







    