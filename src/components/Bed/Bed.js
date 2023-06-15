import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { incrementMoney, plowed, bedAdd, setPlant, setSellPrice, setDatePlant} from '../../redux/store/store'
import './Bed.css'


const Bed = ({ index, bed }) => {
    const money = useSelector(state => state.counter.money);
    const data = useSelector(state => state.counter.data);
    const activeItem = useSelector(state => state.counter.shopActiveItem);
    const dispatch = useDispatch();
    const bedPrice = Math.round(index * index * data.length);

    function roundThousend(amount) {
        if (amount > 1000) return (amount/1000).toFixed(1) + 'k';
        return amount;
    }

    function bedHandler() {
        if (!bed.plowed) {
            if (money - bedPrice >= 5) {
                dispatch(plowed(index));
                dispatch(incrementMoney(-1 * bedPrice));
                if (data.filter((e) => !e.plowed).length <= 1) {
                    dispatch(bedAdd());
                }
            }
            return;
        }

        if ((money <= 0 && bed.plant === '') || bed.plant === 'seedling') return;
        if (activeItem) {
            if (bed.plant === '' && money - activeItem.purchasePrice >= 0) {
                const dateNow = new Date();
                dispatch(incrementMoney(- activeItem.purchasePrice))
                dispatch(setPlant({ index: index, plant: 'seedling' }));
                dispatch(setSellPrice({ index: index, price: activeItem.sellingPrice }))
                dispatch(setDatePlant({ index: index, namePlant: activeItem.name, riseTime: activeItem.riseTime, date: dateNow.getTime() }));

                setTimeout(() => {
                    dispatch(setPlant({ index: index, plant: activeItem.name }));
                }, activeItem.riseTime);
            }
        }

        if (bed.plant !== 'seedling' && bed.plant !== '') {
            dispatch(incrementMoney(bed.sell))
            dispatch(setSellPrice({ index: index, price: 0 }))
            dispatch(setPlant({ index: index, plant: '' }));
            dispatch(setDatePlant({ index: index, namePlant: null, riseTime: null, date: null }));
        }
    }

    function mouseIn(e) {
        e.stopPropagation()
        if (e.buttons >= 1) bedHandler();
    }

    return (
        <div onClick={bedHandler} onMouseEnter={mouseIn} className={bed.plowed ? 'bed' : 'bed__empty'}>
            <div className={`${bed.plant}`}></div>
            <span className='bed__price'>{!bed.plowed ? `${roundThousend(bedPrice)}$` : ''} </span>
        </div>
    );
}

export default React.memo(Bed);

