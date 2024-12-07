import './FriendsWindow.css';
import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import axios from 'axios';
// const axios = require('axios');


const FriendsWindow = ({setSelectedFriend, friendsWindowViewHandler}) => {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const dataGardenExample = [
    {
      plowed: true,
      plant: '',
      sell: 0,
    },
    {
      plowed: true,
      plant: '',
      sell: 0,
    },
    {
      plowed: true,
      plant: '',
      sell: 0,
    },
    {
      plowed: true,
      plant: '',
      sell: 0,
    },
    {
      plowed: true,
      plant: '',
      sell: 0,
    },
    {
      plowed: false,
      plant: '',
      sell: 0,
    },
    {
      plowed: false,
      plant: '',
      sell: 0,
    },
    {
      plowed: false,
      plant: '',
      sell: 0,
    },
    {
      plowed: false,
      plant: '',
      sell: 0,
    },
    {
      plowed: false,
      plant: '',
      sell: 0,
    },
  
  ]
  const testUsers = [
    {
      userName: 'dimon',
      id: 1,
      lvl: 1,
      gardenData: dataGardenExample
    },
    {
      userName: 'kakashka',
      id: 2,
      lvl: 1,
      fiels: ''
    }, 
  ]

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

  function openFriendsWindow(user) {
    console.log('открываем');
    console.log(user);
    
    setSelectedFriend(user);
    friendsWindowViewHandler(false)
  }

  function userList() {
    const allUsers = new Set([...filteredUsers, ...filteredFriends]);
    return [...allUsers].map(user => (
      <div key={user.id} className='friends_window-list__item' >
        <div className='friends_window-list__item-name' onClick={() => openFriendsWindow(user)}>{user.lvl} {user.userName}</div>
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