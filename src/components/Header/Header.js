import './Header.css'
import { useSelector } from 'react-redux'

const Header = () => {
    const count = useSelector(state => state.counter.value)
    return ( 
        <div className='header'>
            <p className='money'>{count}</p>
        </div>
     );
}
 
export default Header;