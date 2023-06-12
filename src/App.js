import { useState } from 'react';
import './App.css';
import Bed from './components/Bed/Bed';
import Header from './components/Header/Header';

function App() {

  const [money, setMoney] = useState(20);
  const [bedCount, setBedCount] = useState(20);
  const [nonBedCount, setNonBedCount] = useState(5);
  return (
    <div>
      <Header money={money}/>
      <div className='garden'>
        {
          [...Array(bedCount)].map((x, index) =>
          <Bed
          key={index}
          index={index}
          money={money}
          setMoney={setMoney}
          bedCount={bedCount}
          setBedCount={setBedCount}
          nonBedCount={nonBedCount}
          setNonBedCount={setNonBedCount}
          />)
        }
      </div>

    </div>

  );
}

export default App;
