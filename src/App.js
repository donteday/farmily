import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setPlant, makeShopActiveItem, incrementMoney } from './redux/store/store';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Garden from './components/Garden/Garden';
import Barn from './components/Barn/Barn';
import Pond from './components/Pond/Pond';
import BottomPanel from './components/BottomPanel/BottomPanel';
// import ModalWindow from './components/ModalWindow/ModalWindow';
import FriendsWindow from './components/FriendsWindow/FriendsWindow';
import Snowfall from './components/Snowfall/Snowfall';
import FriendGarden from './components/FriendGarden/FriendGarden';
import { fetchUserData } from './redux/store/store';
import axios from 'axios';

let moneyInterval;

function App() {
  const viewNow = useSelector(state => state.counter.view);
  const data = useSelector(state => state.counter.dataGarden);
  const dataBarn = useSelector(state => state.counter.dataBarn);
  const shopContainerRef = useRef();
  const dispatch = useDispatch();
  const [friendsWindowView, setFriendsWindowView] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState(null);
  const loading = useSelector(state => state.counter.loading);
  console.log('load', loading);

  useEffect(() => {
    dispatch(makeShopActiveItem(null))
    const intervalId = setInterval(() => {
      dispatch(fetchUserData());
    }, 1000); // 1000 мс = 1 

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, [dispatch]);

  const chatId = 205235580;

  useEffect(() => {
    if (!loading && data.length > 0) {
      sendPlantData(chatId, data);
    }
  }, [data, chatId, loading]);



  async function sendPlantData(chatId, dataGarden) {
    try {
      const response = await axios.put(`/api/updateGarden/${chatId}`, {
        dataGarden
      });
      console.log('отправил данные на сервак', dataGarden);

      if (response.status !== 200) {
        throw new Error('Ошибка при отправке данных на сервер: ' + response.statusText);
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    }
  }

  const init = useCallback(() => {
    console.log('инициализация', data);
    data.forEach((element, index) => {
      const dateNow = new Date();
      console.log('get time', dateNow.getTime());
      console.log('element date', element.date);

      if (element.date && (dateNow.getTime() - element.date > element.riseTime)) {
        dispatch(setPlant({ index: index, plant: element.namePlant }));
      }
      if (element.date && (dateNow.getTime() - element.date < element.riseTime)) {
        setTimeout(() => {
          dispatch(setPlant({ index: index, plant: element.namePlant }));
        }, element.riseTime - (dateNow.getTime() - element.date));
      }
    });
  }, [data, dispatch]);

  // Эффект для инициализации, когда data загружены
  useEffect(() => {
    if (!loading && data.length > 0) {
      init();
    }
  }, [data, init, loading]);


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

  function isView(view) {
    console.log('drug', selectedFriend);

    switch (view) {
      case 'garden':
        return selectedFriend ? <FriendGarden friend={selectedFriend} setSelectedFriend={setSelectedFriend} /> : <Garden />;
      case 'barn':
        return <Barn />;
      case 'pond':
        return <Pond />;
      default:
        return null;
    }
  }

  function friendsWindowViewHandler() {
    setFriendsWindowView(!friendsWindowView);
  }

  return (
    <div className='app'>
      <Snowfall />

      <Header shopContainerRef={shopContainerRef} />
      {isView(viewNow)}
      {
        viewNow === 'pond' ? '' : <Shop shopContainerRef={shopContainerRef} />
      }
      <BottomPanel friendsWindowViewHandler={friendsWindowViewHandler} />
      {friendsWindowView && <FriendsWindow setSelectedFriend={setSelectedFriend} friendsWindowViewHandler={friendsWindowViewHandler} />}
    </div>

  );
}


export default React.memo(App);
