import { useState, useEffect } from 'react';
import './App.css';
import MonthSummary from './screens/MonthSummary';
import db from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';

function App() {
  const [cats, setCats] = useState();
  const catCollectionRef = collection(db, 'categories');

  useEffect(() => {
    const arr = [];
    const getCats = async () => {
      const data = await getDocs(catCollectionRef);

      data.forEach((doc) => {
        arr.push(doc.data());
      })

      setCats(arr);
      console.log(arr);

    }

    getCats();

  }, [])
  return (
    <div className="App">
      <MonthSummary />
    </div>
  );
}

export default App;
