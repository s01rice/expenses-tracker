import { doc, getFirestore } from 'firebase/firestore';
import { FirebaseAppProvider, FirestoreProvider, useFirestoreDocData, useFirestore, useFirebaseApp, DatabaseProvider, AuthProvider } from 'reactfire';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import Home from "./Home";


function BurritoTaste() {
  // access the Firestore library
  const burritoRef = doc(useFirestore(), 'tryreactfire', 'burrito');

  // subscribe to a document for realtime updates. just one line!
  const { status, data } = useFirestoreDocData(burritoRef);

  // check the loading status
  if (status === 'loading') {
    return <p>Fetching burrito flavor...</p>;
  }

  return <p>The burrito is {data.yummy ? 'good' : 'bad'}!</p>;
}

function App() {
  const app = useFirebaseApp();
  const database = getDatabase(app);
  const auth = getAuth(app);
  const firestoreInstance = getFirestore(useFirebaseApp());
  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <AuthProvider sdk={auth}>
        <DatabaseProvider sdk={database}>
          <Home />
        </DatabaseProvider>
      </AuthProvider>
    </FirestoreProvider>
  );
}

export default App;
