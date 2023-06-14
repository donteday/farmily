import './ShopItem.css';
import { makeShopActiveItem } from '../../../redux/store/store'
import { useDispatch } from 'react-redux'

const ShopItem = ({ item, index }) => {
    const dispatch = useDispatch();
    function makeActiveItem() {
        dispatch(makeShopActiveItem(item));
    }
    return (
        <>
            <input className='shop__input' type="radio" id={index} name='shop' />
            <label className='shop__item' htmlFor={index} onClick={makeActiveItem}>
                
                <span className='shop__item-info'>
                    {`${item.purchasePrice}$/`}
                    {`${item.sellingPrice}$/`}
                    {`${item.riseTime/1000}s`}</span>
                <div className={item.name}></div>
            </label>
        </>
    );
}

export default ShopItem;