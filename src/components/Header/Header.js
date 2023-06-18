import './Header.css'
import { useSelector, useDispatch } from 'react-redux'
import { barnEnter, makeShopActiveItem } from '../../redux/store/store'
import door from '../../img/door.mp3'

const doorSound = new Audio(door);
doorSound.preload = 'metadata';

const Header = () => {
    const data = useSelector(state => state.counter.dataGarden);
    const dataBarn = useSelector(state => state.counter.dataBarn);
    const count = useSelector(state => state.counter.money)
    const dispatch = useDispatch();

    let moneyPerSec = 0;      
    dataBarn.map(function (e) {
      if (e.moneyPerSecond) {
        moneyPerSec += e.moneyPerSecond;
      }
      return true;
    });

    function roundThousend(amount) {
        if (amount > 1000000) return (amount/1000000).toFixed(1) + 'm';
        if (amount > 1000) return (amount/1000).toFixed(1) + 'k';
        return amount;
    }
    function tooggleView() {
        doorSound.play();
        dispatch(barnEnter());
        dispatch(makeShopActiveItem(null))
    }
    return (
        <div className='header'>
            <div className="tractor"></div>
            <div className='header__stat'>
                <span>УР. {data.length / 5 - 1}</span>
                <span className='money'>{roundThousend(count)}</span>
                <span >{moneyPerSec}/сек</span>
            </div>
            <div className="barn__icon" onClick={tooggleView}></div>
        </div>
    );
}

export default Header;