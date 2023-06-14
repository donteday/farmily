import './Header.css'
import { useSelector } from 'react-redux'

const Header = () => {
    const data = useSelector(state => state.counter.data);
    const count = useSelector(state => state.counter.money)
    return (
        <div className='header'>
            <span>LVL {data.length / 5 - 1}</span>
            <span className='money'>{count}</span>
        </div>
    );
}

export default Header;