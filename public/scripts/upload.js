function upload() {
   
    var image = document.getElementById("inpFile").files[0];
    var uploadPrompt = document.getElementById("uploadDone");
    var uploadImage= document.getElementById("uploadImage")

    if(image){
        console.log("got here")
        document.getElementById("progressBar").style.display="inline-block";
        
        var imagename=image.name;
        var storageRef= firebase.storage().ref('images/'+imagename);
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
                    uploadImage.style.display="none";
                    userInfo.style.display="block";
                    uploadPrompt.style.display = "none";
                    document.getElementById("heading").innerHTML= "Add Information related to Image ";
                },1000)
                
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






    