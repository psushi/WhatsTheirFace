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