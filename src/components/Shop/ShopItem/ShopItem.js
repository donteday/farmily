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
                
                {/* <span>{item.name}</span> */}
                <div className={item.name}></div>
            </label>
        </>
    );
}

export default ShopItem;