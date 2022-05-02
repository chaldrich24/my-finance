import { useState, useEffect } from 'react';
import './App.css';
import MonthSummary from './screens/MonthSummary';
import { db, auth } from './firebase-config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import Login from './screens/Login';
import { signOut, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [cats, setCats] = useState([]);
  const catCollectionRef = collection(db, 'categories');
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();

  const handleLogout = () => {
    signOut(auth);
  }

  const authListener = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
            console.log(user);
        } else {
            setUser('');
        }
    })
}

  useEffect(() => {
    const q = query(catCollectionRef);
    onSnapshot(q, (querySnapshot => {
      setCats(querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      })));
    }));
  }, []);

  return (
    <div className='page'>
      <div className='nav'>
        {user ? <button onClick={handleLogout}>Sign Out</button> : <button disabled style={{color: 'transparent'}}>G</button>}
      </div>
      <div className="App">
        {!user ? <Login setLoggedIn={setLoggedIn} setUser={setUser} user={user} authListener={authListener} /> : <MonthSummary categories={cats} />}
      </div>
    </div>
  );
}

export default App;
