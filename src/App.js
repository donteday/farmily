import React from 'react';
import { useSelector } from 'react-redux'
import './App.css';
import Bed from './components/Bed/Bed';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';

function App() {
  const data = useSelector(state => state.counter.data)


  return (
    <div>
      <Header />
      <div className='garden'>
        {
          data.map((bed, index) =>
            <Bed
              key={index}
              index={index}
              bed={bed}
            />)
        }
      </div>
        <Shop/>
    </div>

  );
}

export default React.memo(App);
