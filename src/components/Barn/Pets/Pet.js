import { useSelector } from 'react-redux'


const Pet = ({index, pet}) => {
    const dataBarn = useSelector(state => state.counter.dataBarn);
    const barnPrice = index*index*1000*dataBarn.length;
    function roundThousend(amount) {
        if (amount > 1000) return (amount / 1000).toFixed(1) + 'k';
        return amount;
    }
    return ( <div>
                <div
            // onClick={bedHandler}
            // onMouseEnter={mouseIn}

            className={pet.plowed ? 'barn__square' : 'barn__square-empty'}
            >
            <div className={`${pet.pet}`}></div>
            <span className='bed__price'>{!pet.plowed ? `${roundThousend(barnPrice)}$` : ''} </span>
        </div>
    </div> );
}
 
export default Pet;