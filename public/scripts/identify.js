

var loneGlobalVar = {};

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log("user signed-in");
    }

    else {
        window.alert("no users wtf");

    }
});


function upload() {

    var image = document.getElementById("inpFile").files[0];
    var uploadPrompt = document.getElementById("uploadDone");
    var uploadImage = document.getElementById("uploadImage")

    if (image) {
        console.log("got here")
        document.getElementById("progressBar").style.display = "inline-block";
        var user = firebase.auth().currentUser;
        var userId = user.uid;

        var imagename = image.name;
        var storageRef = firebase.storage().ref('images/' + userId + "/verify/" + imagename);
        var progressBar = document.getElementById("progressBar");
        var userInfo = document.getElementById("userInfo");

        var uploadTask = storageRef.put(image);

        uploadTask.on('state_changed', function (snapshot) {
            //observe state change events such as progress, pause , resume
            //get task progress by including the number of bytes uploaded

            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("upload is" + progress + " done.");

            progressBar.setAttribute("value", Math.round(progress));
            if (progress === 100) {
                console.log("inside")
                progressBar.style.display = "none";
                uploadPrompt.innerHTML = "Upload Finished!";
                uploadPrompt.style.display = "block";

                setTimeout(function(){
                    uploadPrompt.innerHTML = "Identifying....";
                    getData();
                    



                },1500)


            }


        }, function (error) {
            console.log(error.message);
        }, function () {
            //succesful upload
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                //uploaded image url 
                console.log(downloadURL);
                loneGlobalVar.downloadURL = downloadURL;

            })

        }
        )

    }

    else {
        document.getElementById("uploadDone").innerHTML = "Please add an image for upload";
        document.getElementById("uploadDone").style.display = "block";

    }
}

const inpFile = document.getElementById("inpFile");
const previewContainer = document.getElementById("imagePreview");
const previewImage = previewContainer.querySelector(".image-preview__image");
const previewDefaultTex = previewContainer.querySelector(".image-preview__default-text");

inpFile.addEventListener("change", function () {

    document.getElementById("uploadDone").style.display = "none";
    document.getElementById("progressBar").setAttribute("value", "0");
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        previewDefaultTex.style.display = "none";
        previewImage.style.display = "block";

        reader.addEventListener("load", function () {
            console.log(this);
            previewImage.setAttribute("src", this.result);

        });

        reader.readAsDataURL(file);
    }

    else {
        previewDefaultTex.style.display = null;
        previewImage.style.display = null;
        previewImage.setAttribute("src", "");

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



    if (name) {
        console.log("got in");
        console.log(typeof (userEmail));
        userData.child(userID).push({
            Name: name,
            relationship: relation
        });
    }


    setTimeout(function () {
        document.getElementById("submitInfo").style.display = "none";
        document.getElementById("afterSubmit").style.display = "block";
    }, 1000)

}



function getData() {
    var user = firebase.auth().currentUser;
    var database = firebase.database();
    var userRef = database.ref('users/' + user.uid);
    loneGlobalVar.userKeys = [];
    loneGlobalVar.userEmbeddings = [];
    loneGlobalVar.downloadURLs = [];

    userRef.on('value', function (data) {
        var info = data.val();
        var keys = Object.keys(info);

        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            loneGlobalVar.userKeys.push(info[k].name);
            loneGlobalVar.userEmbeddings.push(info[k].embedding);
            loneGlobalVar.downloadURLs.push(info[k].downloadURL);

        }
        console.log("got all user details!");

        setTimeout(get_embed(loneGlobalVar.downloadURL),5000);
        return;
        
        

    });

    
    

}



function get_embed(downloadURL) {

    var xhr = new XMLHttpRequest();
    var url = "https://us-central1-first-cloud-function-282616.cloudfunctions.net/face_embedding";
    xhr.open("POST", url, true);
    
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 & xhr.status === 200) {
            var reply = JSON.parse(xhr.responseText);
            loneGlobalVar.new_embed = reply.embedding;
            //console.log(loneGlobalVar.new_embed);

            setTimeout(identify(),1000);

            

        }
    };

    var data = JSON.stringify({ "downloadURL": downloadURL });
    xhr.send(data);
    return;
}




function identify() {

    var njnew_embed = nj.array(loneGlobalVar.new_embed);
    var distances = [];
    var sum = 0;


    for (let embeds of loneGlobalVar.userEmbeddings) {
        embeds = nj.array(embeds);
        let diff = embeds.subtract(njnew_embed);
        diff = diff.pow(2);
        distances.push(Math.sqrt(diff.sum()));
    }

    var index = indexOfMin(distances);
    let njdist = nj.array(distances);

    //sigmoid -> threshold ----------------------------------------------------
    var confidences = nj.sigmoid(njdist);
    confidences = confidences.subtract(0.5);
    var confidence = 1 - confidences.get(index);
    


    // softmax -> threshold -----------------------------------------------------

    /*var confidences =nj.softmax(njdist);
    var confidence = 1 - confidences.get(index);*/


    console.log(loneGlobalVar.userKeys[index]+" confidence:"+confidence);


    previewImage.setAttribute('src',loneGlobalVar.downloadURLs[index]);

    document.getElementById("uploadDone").innerHTML ="Match!";
    document.getElementById("uploadImage").style.display = "none";

    return;




}


function indexOfMin(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var min = arr[0];
    var minIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            minIndex = i;
            min = arr[i];
        }
    }

    return minIndex;
}










