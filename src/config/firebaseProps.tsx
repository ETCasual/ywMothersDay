import { DatabaseProvider, FirestoreProvider, useFirebaseApp } from 'reactfire';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

export const FirebaseProps = ({ children }) => {
  const app = useFirebaseApp();

  const firestoreInstance = getFirestore(app);
  const database = getDatabase(app);
  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <DatabaseProvider sdk={database}>{children}</DatabaseProvider>
    </FirestoreProvider>
  );
};
