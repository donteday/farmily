import { useSelector } from 'react-redux'
import './Barn.css'
import Pet from './Pets/Pet';


const Barn = () => {
    const dataBarn = useSelector(state => state.counter.dataBarn);
    return (
        <div className='barn'>
            {dataBarn.map((pet, index) =>
                <Pet key={index} yard={pet} index={index} />
            )}
        </div>
    );
}

export default Barn;