import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { incrementMoney } from '../../redux/money/moneySlice'
import './Bed.css'


const Bed = ({ index, bedCount, nonBedCount, setBedCount, setNonBedCount }) => {
    const [isPlant, setPlant] = useState('');
    const [bedState, setBedSate] = useState('bed__empty');
    let nonBed = bedCount - nonBedCount;

    
    useEffect(() => {
        if (index < nonBed) setBedSate('bed');
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const bedSquare = useRef();

    const money = useSelector(state => state.counter.value);
    const dispatch = useDispatch();

    function plant() {
        console.log(index, nonBed);
        if (bedState === 'bed__empty') {
            if (money - index * 10 > 0) {
                setBedSate('bed');
                setNonBedCount(nonBedCount - 1);
                dispatch(incrementMoney(-1 * index * 10))
                if (nonBedCount <= 1) {
                    setNonBedCount(5);
                    setBedCount(bedCount + 5);
                }
                console.log(bedCount, nonBedCount, nonBed);
            }
            return;
        }

        if ((money <= 0 && isPlant === '') || isPlant === 'seedling') return;
        if (isPlant === '') {
            dispatch(incrementMoney(-5))
            setPlant('seedling');
            setTimeout(() => {
                setPlant('tomato');
            }, Math.round(Math.random() *10000))
        }
        if (isPlant !== 'seedling' && isPlant !== '') {
            dispatch(incrementMoney(10))
            setPlant('');
        }
    }

    function mouseIn(e) {
        e.stopPropagation()
        if (e.buttons >= 1) plant();
    }

    return (
        <div onClick={plant} onMouseEnter={mouseIn} className={bedState}>
            <div className={isPlant} ref={bedSquare}></div>
            <span className='bed__price'>{bedState === 'bed__empty' ? `${index*10}$` : ''} </span>           
        </div>
    );
}

export default Bed;

