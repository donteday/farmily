import { useSelector, useDispatch } from 'react-redux'
import { plowedYard, incrementMoney, yardAdd, setPet } from '../../../redux/store/store';


const Pet = ({ index, yard }) => {
    const dispatch = useDispatch();
    const dataBarn = useSelector(state => state.counter.dataBarn);
    const money = useSelector(state => state.counter.money);
    const barnPrice = index * index * 1000 * dataBarn.length;
    const activeItem = useSelector(state => state.counter.shopActiveItem);
    function roundThousend(amount) {
        if (amount > 1000) return (amount / 1000).toFixed(1) + 'k';
        return amount;
    }
    function barnHandler() {
        if (!yard.plowed) {
            if (money - barnPrice >= 0) {
                dispatch(plowedYard(index));
                dispatch(incrementMoney(-1 * barnPrice));
                if (index === dataBarn.length - 1) {
                    dispatch(yardAdd());
                }
            }
            return;
        }
        if (money <= 0 && yard.pet === '') return;
        if (activeItem) {
            if (yard.pet === '' && money - activeItem.price >= 0) {
                dispatch(incrementMoney(- activeItem.price))
                dispatch(setPet({ index: index, pet: activeItem.name, money: activeItem.moneyPerSecond }));
                // dispatch(setSellPrice({ index: index, price: activeItem.sellingPrice }))
                // dispatch(setDatePlant({ index: index, namePlant: activeItem.name, riseTime: activeItem.riseTime, date: dateNow.getTime() }));

                // setTimeout(() => {
                //     dispatch(setPlant({ index: index, plant: activeItem.name }));
                // }, activeItem.riseTime);
            }
        }

    }
    return (<div>
        <div
            onClick={barnHandler}
            // onMouseEnter={mouseIn}

            className={yard.plowed ? 'barn__square' : 'barn__square-empty'}
        >
            <div className={`${yard.pet}`}></div>
            <span className='bed__price'>{!yard.plowed ? `${roundThousend(barnPrice)}$` : ''} </span>
        </div>
    </div>);
}

export default Pet;