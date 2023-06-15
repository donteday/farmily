import { useDispatch, useSelector } from 'react-redux'
import './Barn.css'
import Pet from './Pets/Pet';
import { incrementMoney } from '../../redux/store/store';

const Barn = () => {
    const dispatch = useDispatch();
    const dataBarn = useSelector(state => state.counter.dataBarn);
    setInterval(() => {
        dataBarn.map(function (e) {
            if (e.moneyPerSecond) dispatch(incrementMoney(e.moneyPerSecond));
            return true;
        }
        )
    }, 1000);
    return (
        <div className='barn'>
            {dataBarn.map((pet, index) =>
                <Pet key={index} pet={pet} index={index} />
            )}
        </div>
    );
}

export default Barn;