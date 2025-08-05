const admin = require('firebase-admin');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// __dirname is available by default in CommonJS

// Path to service account file
const serviceAccountPath = path.join(__dirname, process.env.FIREBASE_CREDENTIAL);

// Check if the service account file exists
if (!fs.existsSync(serviceAccountPath)) {
    throw new Error(`Firebase service account file not found at: ${serviceAccountPath}`);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

// Initialize Firebase Admin with service account
const firebaseApp = initializeApp({
  credential: cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

const db = getFirestore(firebaseApp);

// Get collection prefix from environment (if not set, defaults to no prefix)
const collectionPrefix = process.env.FIREBASE_COLLECTION_PREFIX || '';

// Define collections with environment-specific prefix
const monthlyListCollection = db.collection(`${collectionPrefix}monthly_list`);
// const timestampCollection = db.collection(`${collectionPrefix}timestamp`);

// Export the Firebase app and database instances
module.exports = {
  app: firebaseApp,
  firestore: db,
  monthlyListCollection,
  // timestampCollection,
  admin
}; 