import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    storageBucket: 'gs://fir-poc-bb964.firebasestorage.app'
}

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage;