import React from 'react';
import Garden from './../Garden/Garden';
import './FriendGarden.css';


const FriendGarden = ({ friend, setSelectedFriend }) => {

    return (
        <div className='friend-garden'>
            <div className='friend-garden__header'>
                <h2 className='friend-garden__title'>{friend.userName}'s Garden</h2>
                <div className='friend-garden__header-btn__close' onClick={() => setSelectedFriend(null)}>х</div>
            </div>
            <Garden gardenData={friend.gardenData} /> {/* Передаем данные огорода друга */}
        </div>
    );
}

export default FriendGarden;