const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


const admin = require('firebase-admin');
admin.initializeApp();

exports.addMessage = functions.https.onRequest(async (req,res)=> {
    const original = req.query.text;
    const writeResult = await admin.firestore().collection('messages').add({original:original});
    res.json({result:'Message with ID : ${writeResult.id added.'});

});

