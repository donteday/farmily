import React, {useRef, useState} from 'react';
import { useSelector} from 'react-redux'
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Garden from './components/Garden/Garden';
import Barn from './components/Barn/Barn';
import Pond from './components/Pond/Pond';
import BottomPanel from './components/BottomPanel/BottomPanel';
import FriendsWindow from './components/FriendsWindow/FriendsWindow';
import Snowfall from './components/Snowfall/Snowfall';
import FriendGarden from './components/FriendGarden/FriendGarden';
// import { fetchUserData } from './redux/store/store';

var WebApp = window;

function App() {
  
  console.log(WebApp);
  
  const viewNow = useSelector(state => state.counter.view);

  const shopContainerRef = useRef();
  const [friendsWindowView, setFriendsWindowView] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);


  
  function isView(view) {
    switch (view) {
      case 'garden':
        return selectedFriend ? <FriendGarden friend={selectedFriend} setSelectedFriend={setSelectedFriend} /> : <Garden/>;
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