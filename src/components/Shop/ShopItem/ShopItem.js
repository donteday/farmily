import { useRef } from 'react';
import { makeShopActiveItem } from '../../../redux/store/store'
import { useDispatch, useSelector } from 'react-redux'
import box from '../../../img/box.mp3'

const boxSound = new Audio(box);
boxSound.preload = 'metadata';

const ShopItem = ({ item, index }) => {
    const dispatch = useDispatch();
    const inputRef = useRef();
    const activeItem = useSelector(state => state.counter.shopActiveItem);
    const lvl = useSelector(state => state.counter.dataGarden).length / 5 - 1;

    function makeActiveItem() {
        boxSound.play();
        if (index >= lvl) {
            dispatch(makeShopActiveItem(null));
            return;
        }
        dispatch(makeShopActiveItem(item));
    }


    if (!activeItem && inputRef.current) {
        inputRef.current.checked = false;
    }
    return (
        <>
            <input className='shop__input' type="radio" id={index} name='shop' ref={inputRef} />
            <label className='shop__item' htmlFor={index} onClick={makeActiveItem}>
                <div className={`${item.name} images`}></div>
                <div className='item__box'></div>
                {index >= lvl ?
                    <div className='shop__item-alert'>{`${index + 1} lvl`}</div> :
                    <div></div>
                }
            </label>
        </>
    );
}

export default ShopItem;