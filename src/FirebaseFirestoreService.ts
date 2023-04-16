import { doc, setDoc } from 'firebase/firestore';
import { firestore } from './FirebaseConfig';

const createDocument = (collection: string, data: any) => {
    return setDoc(doc(firestore, collection, data.id), data);
};

const FirebaseFirestoreService = {
    createDocument
};

export default FirebaseFirestoreService;
