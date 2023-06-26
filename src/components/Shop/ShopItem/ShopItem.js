import { useRef } from 'react';
import { makeShopActiveItem } from '../../../redux/store/store'
import { useDispatch, useSelector } from 'react-redux'
import box from '../../../img/door.mp3'

const boxSound = new Audio(box);
boxSound.preload = 'metadata';

const ShopItem = ({ item, index, shopRef }) => {
    const dispatch = useDispatch();
    const inputRef = useRef();
    const activeItem = useSelector(state => state.counter.shopActiveItem);
    const sound = useSelector(state => state.counter.sound);
    const lvl = useSelector(state => state.counter.dataGarden).length / 5 - 1;


    function makeActiveItem() {
        if (window.innerWidth <= 540) {
            if (index >= 2) shopRef.current.scrollLeft = (index - 1) * 88;        }

        sound && boxSound.play();
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
        <div >
            <input className='shop__input' type="radio" id={index} name='shop' ref={inputRef} />
            <label className='shop__item' htmlFor={index} onClick={makeActiveItem}>
                <div className={`${item.name} images`} ></div>
                <div className='item__box' ></div>
                {index >= lvl ?
                    <div className='shop__item-alert'>{`Ур. ${index + 1}`}</div> :
                    <div></div>
                }
            </label>
        </div>
    );
}

export default ShopItem;