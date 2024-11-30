import './FriendsWindow.css';
import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import axios from 'axios';
// const axios = require('axios');


const FriendsWindow = () => {
  // const axios = require('axios');

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUsers = () => {
      // try {
      //   const response = await axios.get('http://90.156.156.62:5000/api/users');
      //   console.log('Запрос ', response);
      //   setUsers(response.data);
      // } catch (err) {
      //   setError(err.message);
      //   console.log('Ошибка ', err);
      // } finally {
      //   setLoading(false);
      // }
      axios.get('https://90.156.156.62:5000/api/users')
        .then(function (response) {
          // handle success
          console.log(response);
          
          setUsers(response.data);

        })
        .catch(function (error) {
          setError(error.message);
          console.log(error);
          
        })
        .finally(function () {
          setLoading(false);

        });
    };

    fetchUsers();
  }, []);


  return (
    <div className='friends_window'>
      <div className='friends_window-title'>Друзья</div>
      {loading && <div>Загрузка</div>}
      {error && <div>Ошибка подключения</div>}
      <div className='friends_window-list'>{users.map(user => (
        <div key={user.id} className='friends_window-list__item'>{user.userName}</div>
      ))} </div>
    </div>
  );
};

export default FriendsWindow;