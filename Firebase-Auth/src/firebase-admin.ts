import admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// Load the environment variables
const serviceAccountPath = process.env.SERVICE_ACCOUNT_KEY_PATH;

if (!serviceAccountPath) {
  throw new Error('SERVICE_ACCOUNT_KEY_PATH is not defined in the environment variables');
}

const serviceAccount = JSON.parse(fs.readFileSync(path.resolve(__dirname, serviceAccountPath), 'utf-8'));

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default admin;
