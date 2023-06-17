import './Header.css'
import { useSelector, useDispatch } from 'react-redux'
import { barnEnter, makeShopActiveItem } from '../../redux/store/store'

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
        if (amount > 1000) return (amount/1000).toFixed(1) + 'k';
        return amount;
    }
    function tooggleView() {
        dispatch(barnEnter());
        dispatch(makeShopActiveItem(null))
    }
    return (
        <div className='header'>
            <div className="tractor"></div>
            <div className='header__stat'>
                <span>LVL {data.length / 5 - 1}</span>
                <span className='money'>{roundThousend(count)}</span>
                <span >{moneyPerSec}/sec</span>
            </div>
            <div className="barn__icon" onClick={tooggleView}></div>
        </div>
    );
}

export default Header;