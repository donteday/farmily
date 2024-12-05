import './FriendsWindow.css';
import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import axios from 'axios';
// const axios = require('axios');


const FriendsWindow = () => {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const testUsers = [
    {
      userName: 'dimon',
      id: 1,
      lvl: 1,
      fiels: ''
    },
    {
      userName: 'kakashka',
      id: 2,
      lvl: 1,
      fiels: ''
    },
    {
      userName: 'dimas',
      id: 3,
      lvl: 4,
      fiels: ''
    },
    {
      userName: 'dimonsdf',
      id: 4,
      lvl: 1,
      fiels: ''
    },
    {
      userName: 'kakashkasdf',
      id: 5,
      lvl: 1,
      fiels: ''
    },
    {
      userName: 'dimassdf',
      id: 6,
      lvl: 4,
      fiels: ''
    },
    {
      userName: 'dimonsdf',
      id: 7,
      lvl: 1,
      fiels: ''
    },
    {
      userName: 'kakashkadsf',
      id: 8,
      lvl: 1,
      fiels: ''
    },
    {
      userName: 'dimasdfs',
      id: 9,
      lvl: 4,
      fiels: ''
    },
    {
      userName: 'dimonfds',
      id: 11,
      lvl: 1,
      fiels: ''
    },
    {
      userName: 'kakashka123',
      id: 22,
      lvl: 1,
      fiels: ''
    },
    {
      userName: 'dimas123',
      id: 33,
      lvl: 4,
      fiels: ''
    },
  ]

  useEffect(() => {
    const fetchUsers = () => {
      axios.get('/api/api/users')
        .then(function (response) {
          // handle success
          console.log(users);

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
    ? testUsers.filter(user =>
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

  function userList() {
    const allUsers = new Set([...filteredFriends, ...filteredUsers]);
    return [...allUsers].map(user => (
      <div key={user.id} className='friends_window-list__item'>
        <div className='friends_window-list__item-name'>{user.lvl} {user.userName}</div>
        {!checkFriend(user) ? (
          <button className='friends_window-list__item friends_window-btn_add' onClick={() => addFriend(user)}>+</button>
        ) :
          <button className='friends_window-list__item friends_window-btn_del' onClick={() => removeFriend(user)}>x</button>
        }
      </div>
    ))
  }

  return (
    <div className='friends_window'>
      <div className='friends_window-title'>Друзья</div>
      {loading && <div>Загрузка</div>}
      {error && <div>Ошибка подключения</div>}

      <div className='friends_window-search'>
        <input
          type="text"
          placeholder="Введите имя"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '8px', marginTop: '10px' }}
        />

        <button
          onClick={() => setSearchTerm('')}
          style={{ marginTop: '10px', padding: '8px 16px' }}
        >
          Х
        </button>
      </div>
      <div className='friends_window-list'>
        {userList()}
      </div>



    </div>
  );
};

export default FriendsWindow;