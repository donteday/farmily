import React from 'react';
import { useSelector } from 'react-redux'
import { store } from './redux/root'
import './App.css';
import Bed from './components/Bed/Bed';
import Header from './components/Header/Header';

function App() {
  const data = useSelector(state => state.counter.data)
  function sub() {
    console.log(1);
  }
  store.subscribe(sub);

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

    </div>

  );
}

export default React.memo(App);
