const firebaseAdmin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
// change the path of json file
const serviceAccount = require('./nodejs-be-upload-image-firebase-adminsdk-vzkga-bd1696a09f.json');
// eslint-disable-next-line import/order
const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});
const storageRef = admin.storage().bucket('gs://nodejs-be-upload-image.appspot.com');

async function uploadFile(path, filename) {
  // Upload the File
  const storage = await storageRef.upload(path, {
    public: true,
    destination: `/uploads/${filename}`,
    metadata: {
      firebaseStorageDownloadTokens: uuidv4(),
      cacheControl: 'public, max-age=315360000',
      contentType: 'image/jpeg',
    },
  });

  return storage[0];
//  return storage[0].metadata.mediaLink;
}
module.exports = { uploadFile };
