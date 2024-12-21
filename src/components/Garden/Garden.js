import { useSelector, useDispatch } from 'react-redux'
import Bed from "../Bed/Bed";
import { io } from 'socket.io-client';
import { debounce } from 'lodash';
import { setPlant, makeShopActiveItem, incrementMoney, setUserData, setLoading } from './../../redux/store/store';
import React, { useEffect, useRef, useState, useCallback } from 'react';


let moneyInterval;

const Garden = ({friend}) => {
  console.log('friend', friend);
  const data = [];
  if (friend) {
    data = friend.dataGarden;
  } else {
    data = useSelector(state => state.counter.dataGarden);
  };
  const dispatch = useDispatch();

  const loading = useSelector(state => state.counter.loading);
  const dataBarn = useSelector(state => state.counter.dataBarn);
  const [socket, setSocket] = useState(null);
  const [isUserUpdate, setIsUserUpdate] = useState(false);
  const prevDataRef = useRef(data);
  const tg = window.Telegram.WebApp.initDataUnsafe;
  const chatId = `${tg.user.id}` ; // Это лучше хранить в конфиге или получать динамически

  useEffect(() => {
    const newSocket = io('https://mypocketfarm.ru:5000', { query: { chatId } });
    setSocket(newSocket);
    newSocket.on('userData', (userData) => {
      console.log('userData', userData);
      
      // eslint-disable-next-line
      if (userData.userData !== null && JSON.stringify(userData.userData) !== JSON.stringify(data)) {
        dispatch(setUserData(userData.userData));
      } 
      dispatch(setLoading(false));

    });
    dispatch(makeShopActiveItem(null));
    return () => newSocket.disconnect();
    // eslint-disable-next-line
  }, [dispatch, chatId]);

  const updateData = useCallback((data) => {
    console.log('socket', socket);
    console.log('loading', loading);
    console.log('data', data);
    
    
    
    if (socket && !loading) {
      console.log('pitaus');
      console.log('isuser', isUserUpdate);
      
      
      if (isUserUpdate && (JSON.stringify(prevDataRef.current) !== JSON.stringify(data))) {
        console.log('Отправляю обновленные данные', data);
        socket.emit('updateData', chatId, data);
        prevDataRef.current = data;
        setIsUserUpdate(false);
      }
    }
  }, [socket, loading, chatId, isUserUpdate]);
  // eslint-disable-next-line
  const debouncedUpdateData = useCallback(
    debounce(updateData, 500),
    [updateData]
  );

  useEffect(() => {
    if (socket) {
      socket.emit('getUserData', chatId);
    }
  }, [socket, chatId]);

  useEffect(() => {
    debouncedUpdateData(data);
  }, [data, debouncedUpdateData]);

  const init = useCallback(() => {
    data.forEach((element, index) => {
      const dateNow = new Date();
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


  return (
    <>
      <div className='garden'>
        {
          data.map((bed, index) =>
            <Bed
              key={index}
              index={index}
              bed={bed}
              setIsUserUpdate={setIsUserUpdate}
              friend={friend}
            />)
        }
      </div>
      {/* <div className='tractor'></div> */}
    </>

  );
}

export default Garden;