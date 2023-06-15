import { makeShopActiveItem } from '../../../redux/store/store'
import { useDispatch, useSelector } from 'react-redux'

const ShopItem = ({ item, index }) => {
    const dispatch = useDispatch();
    const lvl = useSelector(state => state.counter.dataGarden).length / 5 - 1;
    function makeActiveItem() {
        if (index >= lvl) return;
        dispatch(makeShopActiveItem(item));
    }
    return (
        <>
            <input className='shop__input' type="radio" id={index} name='shop' />
            <label className='shop__item' htmlFor={index} onClick={makeActiveItem}>
                
                <span className='shop__item-info'>
                    {`${item.purchasePrice}$/`}
                    {`${item.sellingPrice}$/`}
                    {`${item.riseTime/1000}s`}
                </span>
                {index >= lvl ?
                 <div className='shop__item-alert'>{`Нужен ${index+1} lvl`}</div> :
                 <div></div>          
                }
                <div className={item.name}></div>

            </label>
        </>
    );
}

export default ShopItem;