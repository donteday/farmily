import React from 'react';
import { shopData } from '../../data/shopData'
import './Shop.css'
import ShopItem from './ShopItem/ShopItem';

const Shop = () => {
    return (
        <form className='shop'>
            {shopData.map((e,index) =>
            <ShopItem
            key={index}
            item={e}
            index={index}/>)}
        </form>
    );
}

export default Shop;