import React, { useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setPlant, makeShopActiveItem, incrementMoney } from './redux/store/store';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Garden from './components/Garden/Garden';
import Barn from './components/Barn/Barn';

let moneyInterval;

function App() {
  const barnEnter = useSelector(state => state.counter.barnIn);
  const data = useSelector(state => state.counter.dataGarden);
  const dataBarn = useSelector(state => state.counter.dataBarn);
  const shopContainerRef = useRef();
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
        }, element.riseTime - (dateNow.getTime() - element.date));
      }
    });

  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => init(), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    clearInterval(moneyInterval);
    moneyInterval = setInterval(() => {
      let count = 0;      
      dataBarn.map(function (e) {
        if (e.moneyPerSecond) {
          count += e.moneyPerSecond;
        };
        return true;
      });
      dispatch(incrementMoney(count))
    }, 1000);

  }, [dataBarn, dispatch]);


  return (
    <div>
      <Header shopContainerRef={shopContainerRef}/>
      {barnEnter ? <Barn /> : <Garden />}
      <Shop shopContainerRef={shopContainerRef}/>
    </div>

  );
}


export default React.memo(App);
