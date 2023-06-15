import './Header.css'
import { useSelector, useDispatch } from 'react-redux'
import { barnEnter } from '../../redux/store/store'

const Header = () => {
    const data = useSelector(state => state.counter.dataGarden);
    const count = useSelector(state => state.counter.money)
    const dispatch = useDispatch();

    function roundThousend(amount) {
        if (amount > 1000) return (amount/1000).toFixed(1) + 'k';
        return amount;
    }
    function tooggleView() {
        dispatch(barnEnter());
    }
    return (
        <div className='header'>
            <div className="tractor"></div>
            <div className='header__stat'>
                <span>LVL {data.length / 5 - 1}</span>
                <span className='money'>{roundThousend(count)}</span>
            </div>
            <div className="barn__icon" onClick={tooggleView}></div>
        </div>
    );
}

export default Header;