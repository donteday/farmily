import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setPlant, makeShopActiveItem } from './redux/store/store';
import './App.css';
import Bed from './components/Bed/Bed';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';



function App() {
  const data = useSelector(state => state.counter.data);
  const dispatch = useDispatch();

  function init() {
    dispatch(makeShopActiveItem(null))
    data.forEach((element, index) => {
      const dateNow = new Date()
      if (element.date && (dateNow.getTime() - element.date > element.riseTime)) {
        dispatch(setPlant({index: index, plant: element.namePlant}));
      }

      if (element.date && (dateNow.getTime() - element.date < element.riseTime)) {
        console.log(2);

        setTimeout(() => {
          dispatch(setPlant({index: index, plant: element.namePlant}));
      }, dateNow.getTime() - element.date);
      }
    });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => init(), []);

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
      <Shop />
    </div>

  );
}


export default React.memo(App);
