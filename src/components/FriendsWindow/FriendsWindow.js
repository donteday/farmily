import './FriendsWindow.css';
import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import axios from 'axios';
// const axios = require('axios');


const FriendsWindow = ({ setSelectedFriend, friendsWindowViewHandler }) => {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [resUsers, setResUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = () => {
      axios.get('/api/api/users')
        .then(function (response) {
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
  }, [users]);

  const filteredUsers = searchTerm.length >= 3
    ? resUsers.filter(user =>
      !checkFriend(user) && user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  const filteredFriends = searchTerm.length >= 3
    ? friends.filter(user =>
      user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : friends;

  function addFriend(user) {
    if (friends.some(friend => friend.id === user.id)) {
      return;
    }
    setFriends([...friends, user]);
  }

  function removeFriend(user) {
    setFriends(friends.filter(friend => friend.id !== user.id));
  }

  function checkFriend(user) {
    return friends.some(friend => friend.id === user.id);
  }

  function openFriendsWindow(user) {
    console.log('открываем');
    console.log(user);

    setSelectedFriend(user);
    friendsWindowViewHandler(false)
  }

  async function findUsers(findUserName, searchTerm) {
    setSearchTerm(findUserName);
    if (searchTerm.length >= 3) {
      try {
        const response = await axios.get(`/api/findUser?search=${searchTerm}`);
        setResUsers(response.data); // Предполагается, что сервер возвращает массив пользователей
      } catch (error) {
        console.error('Ошибка при получении пользователей:', error);
      } finally {
        setLoading(false);
      }
    }
  }

  function userList() {
    const allUsers = new Set([...filteredUsers, ...filteredFriends]);
    return [...allUsers].map(user => {
      // Динамическая загрузка изображения
      const userImgUrl = user.imgUrl ? require(`${user.imgUrl}`) : require(`../../img/icons/icon_friends.png`);

      return (
        <div key={user.id} className='friends_window-list__item'>
          <div className='friends_window-list__item-img' style={{ backgroundImage: `url(${userImgUrl})` }}>
            {user.lvl}
          </div>

          <div className='friends_window-list__item-name' onClick={() => openFriendsWindow(user)}>
            {user.userName}
          </div>
          {!checkFriend(user) ? (
            <button className='friends_window-list__item friends_window-btn_add' onClick={() => addFriend(user)}></button>
          ) : (
            <button className='friends_window-list__item friends_window-btn_del' onClick={() => removeFriend(user)}></button>
          )}
        </div>
      );
    });
  }

  return (
    <div className='friends_window'>
      <button className='friends_window-close' onClick={() => friendsWindowViewHandler()}></button>
      <div className='friends_window-title'>Друзья</div>
      {loading && <div>Загрузка</div>}
      {error && <div>Ошибка подключения</div>}

      <div className='friends_window-search'>
        <input
          type="text"
          placeholder="Введите имя"
          value={searchTerm}
          onChange={(e) => findUsers(e.target.value, searchTerm)}
          style={{ width: '100%', padding: '5px', marginTop: '10px' }}
        />

        <button
          onClick={() => setSearchTerm('')}
          style={{ marginTop: '10px', padding: '8px 16px', border: 'none', background: 'none' }}
        >
          Х
        </button>
      </div>
      <br />
      <div className='friends_window-list'>
        {userList()}
      </div>
    </div>
  );
};

export default FriendsWindow;