import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
// Note: Auth persistence warning is expected in React Native with Web SDK
// For full persistence, consider using @react-native-firebase/app
export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics is not supported in React Native - use Firebase console for web analytics
export { app };
