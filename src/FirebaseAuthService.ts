import { firebaseApp } from './FirebaseConfig';
import { auth } from './FirebaseConfig';

import {
    Auth,
    UserCredential,
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';

const registerUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

const loginUser = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
};

const logoutUser = () => {
    return auth.signOut();
};

const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
    return auth.onAuthStateChanged(callback);
};

const getCurrentUser = () => {
    return auth.currentUser;
};

const FirebaseAuthService = {
    registerUser,
    loginUser,
    resetPassword,
    logoutUser,
    loginWithGoogle,
    subscribeToAuthChanges,
    getCurrentUser
};

export default FirebaseAuthService;
