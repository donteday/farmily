import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { incrementMoney, plowed, bedAdd, setPlant } from '../../redux/store/store'
import './Bed.css'


const Bed = ({ index, bed }) => {
    const money = useSelector(state => state.counter.money);
    const data = useSelector(state => state.counter.data);
    const dispatch = useDispatch();
    const bedPrice = Math.round(index*index/4);
    function bedHandler() {
        if (!bed.plowed) {
            if (money - bedPrice > 0) {
                dispatch(plowed(index));
                dispatch(incrementMoney(-1 * Math.round(index*index/4)))
                if (data.filter((e) => !e.plowed).length <= 1) {
                    dispatch(bedAdd());
                }
            }
            return;
        }

        if ((money <= 0 && bed.plant === '') || bed.plant === 'seedling') return;
        if (bed.plant === '') {
            dispatch(incrementMoney(-5))
            dispatch(setPlant({index: index, plant:'seedling'}));
            setTimeout(() => {
                dispatch(setPlant({index: index, plant:'tomato'}));
            }, Math.round(Math.random() *10000))
        }
        if (bed.plant !== 'seedling' && bed.plant !== '') {
            dispatch(incrementMoney(10))
            dispatch(setPlant({index: index, plant:''}));
        }
    }

    // function mouseIn(e) {
    //     e.stopPropagation()
    //     if (e.buttons >= 1) plant();onMouseEnter={mouseIn}
    // }

    return (
        <div onClick={bedHandler} className={bed.plowed ? 'bed' : 'bed__empty'}>
            <div className={bed.plant}></div>
            <span className='bed__price'>{!bed.plowed ? `${Math.round(index*index/4)}$` : ''} </span>           
        </div>
    );
}

export default React.memo(Bed);

