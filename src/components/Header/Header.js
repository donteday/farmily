import './Header.css'
import { useSelector } from 'react-redux'

const Header = () => {
    const count = useSelector(state => state.counter.money)
    return ( 
        <div className='header'>
            <p className='money'>{count}</p>
        </div>
     );
}
 
export default Header;