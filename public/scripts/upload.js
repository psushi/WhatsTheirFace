function upload() {
    var image = document.getElementById("image").files[0];

    var imagename=image.name;
    var storageRef= firebase.storage().ref('images/'+imagename);

    var uploadTask = storageRef.put(image);
    uploadTask.on('state_changed',function(snapshot){
        //observe state change events such as progress, pause , resume
        //get task progress by including the number of bytes uploaded
        var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log("upload is" + progress + " done.");
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

    const inpFile = document.getElementById("inpFile");
    const previewContainer = document.getElementById("imagePreview");
    const previewImage = previewContainer.querySelector(".image-preview__image");
    const previewDefaultTex = previewContainer.querySelector(".image-preview__default-text");

    inpFile.addEventListener("change" , function() {
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






    