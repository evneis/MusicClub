const admin = require('firebase-admin');

/**
 * Get the Firebase collection prefix from environment variables
 * @returns {string} The collection prefix (empty string if not set)
 */
function getCollectionPrefix() {
    return process.env.FIREBASE_COLLECTION_PREFIX || '';
}

/**
 * Get the current month and year as a key
 * @returns {string} Format: "Month_Year" (e.g., "August_2024")
 */
function getCurrentMonthKey() {
    const currentDate = new Date();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    return `${monthName}_${year}`;
}

/**
 * Get the collection name with optional prefix
 * @returns {string} The collection name
 */
function getMonthlyListCollection() {
    const prefix = getCollectionPrefix();
    return `${prefix}monthly_list`;
}

/**
 * Get a collection reference with prefix applied
 * @param {string} collectionName - The base collection name
 * @returns {FirebaseFirestore.CollectionReference} The collection reference
 */
function getCollection(collectionName) {
    const db = getFirestore();
    const prefix = getCollectionPrefix();
    return db.collection(`${prefix}${collectionName}`);
}

/**
 * Check if Firebase is properly initialized
 * @returns {boolean} True if Firebase is available
 */
function isFirebaseAvailable() {
    return admin.apps.length > 0;
}

/**
 * Get Firestore database instance
 * @returns {FirebaseFirestore.Firestore} Firestore instance
 */
function getFirestore() {
    if (!isFirebaseAvailable()) {
        throw new Error('Firebase is not initialized');
    }
    return admin.firestore();
}

module.exports = {
    getCollectionPrefix,
    getCurrentMonthKey,
    getMonthlyListCollection,
    getCollection,
    isFirebaseAvailable,
    getFirestore,
    admin
}; 