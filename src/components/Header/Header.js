import './Header.css'
import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeShopActiveItem, update} from '../../redux/store/store'
import door from '../../img/door.mp3'

const doorSound = new Audio(door);
doorSound.preload = 'metadata';

const Header = ({ shopContainerRef }) => {
    const data = useSelector(state => state.counter.dataGarden);
    const view = useSelector(state => state.counter.view);
    const dataBarn = useSelector(state => state.counter.dataBarn);
    const count = useSelector(state => state.counter.money)
    const sound = useSelector(state => state.counter.sound)
    const dispatch = useDispatch();
    const soundIcon = useRef();

    let moneyPerSec = 0;
    dataBarn.map(function (e) {
        if (e.moneyPerSecond) {
            moneyPerSec += e.moneyPerSecond;
        }
        return true;
    });

    function roundThousend(amount) {
        if (amount > 1000000) return (amount / 1000000).toFixed(1) + 'м';
        if (amount > 1000) return (amount / 1000).toFixed(1) + 'т';
        return amount.toFixed(0);
    }
    function barnEnter() {
        sound && doorSound.play();
        view === 'barn' ? dispatch(update({name: 'view', source: 'garden'})) : dispatch(update({name: 'view', source: 'barn'}));
        dispatch(makeShopActiveItem(null))
    }

    function pondEnter() {
        sound && doorSound.play();
        view === 'pond' ? dispatch(update({name: 'view', source: 'garden'})) : dispatch(update({name: 'view', source: 'pond'}));
        dispatch(makeShopActiveItem(null))
    }

    function menuOpen() {
        if (shopContainerRef.current !== null) shopContainerRef.current.style.display = 'flex';
    }

    function switchSound() {
        dispatch(update({name: 'sound', source: !sound}))
    }


    return (
        <div className='header'>
            <div className='header__stat'>
                <span>УР. {data.length / 5 - 1}</span>
                <span className='money'>{roundThousend(count)}</span>
                <span >{roundThousend(moneyPerSec)}$/сек</span>
                <button className='btn__menu' onClick={menuOpen}></button>
                <div className={sound ? "btn__sound" : "btn__sound no-active"} onClick={switchSound} ref={soundIcon}></div>
            </div>
            <div className="pond__icon" onClick={pondEnter}></div>
            <div className="tractor"></div>
            <div className="barn__icon" onClick={barnEnter}></div>
        </div>
    );
}

export default Header;