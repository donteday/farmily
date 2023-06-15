import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setPlant, makeShopActiveItem, incrementMoney } from './redux/store/store';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Garden from './components/Garden/Garden';
import Barn from './components/Barn/Barn';



function App() {
  const barnEnter = useSelector(state => state.counter.barnIn);
  const data = useSelector(state => state.counter.dataGarden);
  const dataBarn = useSelector(state => state.counter.dataBarn);
  const dispatch = useDispatch();

  function init() {
    dispatch(makeShopActiveItem(null))
    data.forEach((element, index) => {
      const dateNow = new Date()
      if (element.date && (dateNow.getTime() - element.date > element.riseTime)) {
        dispatch(setPlant({ index: index, plant: element.namePlant }));
      }

      if (element.date && (dateNow.getTime() - element.date < element.riseTime)) {

        setTimeout(() => {
          dispatch(setPlant({ index: index, plant: element.namePlant }));
        }, dateNow.getTime() - element.date);
      }
    });
    setInterval(() => {
      dataBarn.map(function (e) {
          if (e.moneyPerSecond) dispatch(incrementMoney(e.moneyPerSecond));
          return true;
      }
      )
  }, 1000);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => init(), []);


  return (
    <div>
      <Header />
      {barnEnter ? <Barn /> : <Garden />}
      <Shop />
    </div>

  );
}


export default React.memo(App);
