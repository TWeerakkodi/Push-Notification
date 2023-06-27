

const express = require('express');
const admin = require('firebase-admin');

const app = express();
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = require("Your_Json_File_Path");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.post('/send-notification', (req, res) => {
  const registrationToken = req.body.registrationToken;
  const title = req.body.title;
  const description = req.body.description;

  console.log('Received registrationToken:', registrationToken);

  const message = {
    notification: {
      title: title,
      body: description
    },
    token: registrationToken
  };

  admin.messaging().send(message)
    .then((response) => {
      console.log('Notification sent successfully:', response);
      res.status(200).send('Notification sent successfully');
    })
    .catch((error) => {
      console.error('Error sending notification:', error);
      res.status(500).send('Error sending notification');
    });
});

// const port = 3000;
const port = 45350;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

