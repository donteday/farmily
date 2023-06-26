import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { incrementMoney, plowed, bedAdd, setPlant, setSellPrice, setDatePlant } from '../../redux/store/store'
import pop from '../../img/pop.mp3';
import grass from '../../img/grass.mp3';
import shovel from '../../img/shovel.mp3';
import './Bed.css'

const popSound = new Audio(pop);
const grassSound = new Audio(grass);
const shovelSound = new Audio(shovel);
popSound.preload = 'metadata';
grassSound.preload = 'metadata';
shovelSound.preload = 'metadata';

const Bed = ({ index, bed }) => {
    const dispatch = useDispatch();
    const money = useSelector(state => state.counter.money);
    const data = useSelector(state => state.counter.dataGarden);
    const sound = useSelector(state => state.counter.sound)
    const activeItem = useSelector(state => state.counter.shopActiveItem);
    const bedPrice = Math.round(index * index * data.length * 1.2);

    const bedRef = useRef();

    function roundThousend(amount) {
        if (amount > 1000000) return (amount / 1000000).toFixed(1) + 'м';
        if (amount > 1000) return (amount / 1000).toFixed(1) + 'т';
        return amount.toFixed(0);
    }

    function bedHandler() {
        if (!bed.plowed) {
            if (money - bedPrice >= 5) {
                sound && shovelSound.play();
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
                sound && grassSound.play();
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
            sound && popSound.play();
            bedRef.current.classList.add('destroy');
            setTimeout(() => {
                dispatch(incrementMoney(bed.sell))
                dispatch(setSellPrice({ index: index, price: 0 }))
                dispatch(setPlant({ index: index, plant: '' }));
                dispatch(setDatePlant({ index: index, namePlant: null, riseTime: null, date: null }));
            }, 200)

        }
    }

    function mouseIn(e) {
        e.stopPropagation();
        if (e.buttons >= 1) {
            bedHandler();
        };
        if (e.type === 'touchmove') {
            let myLocation = e.touches[0];
            let realTarget = document.elementFromPoint(myLocation.clientX, myLocation.clientY);
            console.log(realTarget.index);
        }
    }

    return (
        <div
            onClick={bedHandler}
            onMouseEnter={mouseIn}

            className={bed.plowed ? 'bed' : 'bed__empty'}>
            <div className={`${bed.plant === 'seedling' ? bed.plant : bed.plant + ' wiggle'}`} ref={bedRef}></div>
            <span className='bed__price'>{!bed.plowed ? `${roundThousend(bedPrice)}$` : ''} </span>
        </div>
    );
}

export default React.memo(Bed);

