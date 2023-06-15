import './Header.css'
import { useSelector } from 'react-redux'

const Header = () => {
    const data = useSelector(state => state.counter.data);
    const count = useSelector(state => state.counter.money)
    function roundThousend(amount) {
        if (amount > 1000) return (amount/1000).toFixed(1) + 'k';
        return amount;
    }
    return (
        <div className='header'>
            <div className="tractor"></div>
            <div className='header__stat'>
                <span>LVL {data.length / 5 - 1}</span>
                <span className='money'>{roundThousend(count)}</span>
            </div>
            <div className="barn">

            </div>

        </div>
    );
}

export default Header;