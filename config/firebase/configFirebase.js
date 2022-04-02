const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('./nodejs-be-upload-image-firebase-adminsdk-vzkga-bd1696a09f.json');

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});
//
// const gs = 'gs://';
// const bucketName = 'nodejs-be-upload-image.appspot.com.appspot.com';
const storageRef = admin.storage().bucket('gs://nodejs-be-upload-image.appspot.com');

async function uploadFile(path, filename) {
  let result;
  // Upload the File
  const destination = `uploads/${filename}`;

  const storage = await storageRef.upload(path, {
    public: true,
    destination,
  })
    .then(() => {
      const file = storageRef.file(destination);
      return file.getSignedUrl({
        action: 'read',
        expires: '03-25-2023',
      }).then((signedUrls) => {
        // signedUrls[0] contains the file's public URL
        // console.log(signedUrls[0]);
        result = signedUrls[0];
      });
    });
  return result;
}
module.exports = uploadFile;
