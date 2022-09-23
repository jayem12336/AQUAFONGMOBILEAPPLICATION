import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    initializeAuth,
    getReactNativePersistence,
} from 'firebase/auth/react-native';

const firebaseConfig = {
    apiKey: "AIzaSyCZAposoVvtUSxItCeBNoeJh6Z4JHPpleQ",
    authDomain: "aquafong-d95f2.firebaseapp.com",
    projectId: "aquafong-d95f2",
    storageBucket: "aquafong-d95f2.appspot.com",
    messagingSenderId: "139688848239",
    appId: "1:139688848239:web:c38dc3cd72fb9d452cd69a"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { auth, db };