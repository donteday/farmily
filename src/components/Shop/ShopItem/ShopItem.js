import { useRef } from 'react';
import { makeShopActiveItem } from '../../../redux/store/store'
import { useDispatch, useSelector } from 'react-redux'

const ShopItem = ({ item, index }) => {
    const dispatch = useDispatch();
    const inputRef = useRef();
    const activeItem = useSelector(state => state.counter.shopActiveItem);
    const barnEnter = useSelector(state => state.counter.barnIn);
    const lvl = useSelector(state => state.counter.dataGarden).length / 5 - 1;

    function makeActiveItem() {
        if (index >= lvl) {
            dispatch(makeShopActiveItem(null));
            return; }
        dispatch(makeShopActiveItem(item));
    }
    function roundThousend(amount) {
        if (amount > 1000) return (amount/1000).toFixed(1) + 'k';
        return amount;
    }
    function roundMinutes(amount) {
        if (amount >= 60) return (amount/60) + 'm';
        return amount + 's';
    }
    if (!activeItem && inputRef.current) {
        inputRef.current.checked = false;
    }
    return (
        <>
            <input className='shop__input' type="radio" id={index} name='shop' ref={inputRef}/>
            <label className='shop__item' htmlFor={index} onClick={makeActiveItem}>              

                <span className='shop__item-info'>
                    {
                        barnEnter ? 
                        `${roundThousend(item.price)}$/${item.moneyPerSecond}$/s`
                        :
                        `${roundThousend(item.purchasePrice)}$/
                        ${roundThousend(item.sellingPrice)}$/
                        ${roundMinutes(item.riseTime/1000)}`
                    }

                </span>


                <div className={`${item.name} images`}></div>
                <div className='item__box'></div>
                {index >= lvl ?
                 <div className='shop__item-alert'>{`${index+1} lvl`}</div> :
                 <div></div>          
                }
            </label>
        </>
    );
}

export default ShopItem;