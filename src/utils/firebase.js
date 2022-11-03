import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    initializeAuth,
    getReactNativePersistence,
} from 'firebase/auth/react-native';

const firebaseConfig = {
    apiKey: "AIzaSyCKoV0D9vmUv7XrdV2E0D31TemM7FAqYBw",
    authDomain: "aquafondfisheries.firebaseapp.com",
    projectId: "aquafondfisheries",
    storageBucket: "aquafondfisheries.appspot.com",
    messagingSenderId: "832873044598",
    appId: "1:832873044598:web:b6d767df221716bc0f1d57"
  };
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };