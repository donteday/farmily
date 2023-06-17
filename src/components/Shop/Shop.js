import React from 'react';
import { shopData } from '../../data/shopData'
import './Shop.css'
import ShopItem from './ShopItem/ShopItem';
import { useSelector } from 'react-redux';

const Shop = () => {
    const barnEnter = useSelector(state => state.counter.barnIn);

    return (
        <div className="shop__wrapper">
            <div className='shop'>
                {
                    barnEnter ?
                        shopData.pets.map((e, index) =>
                            <ShopItem
                                key={index}
                                item={e}
                                index={index} />)
                        : shopData.plants.map((e, index) =>
                            <ShopItem
                                key={index}
                                item={e}
                                index={index} />)
                }

            </div>
        </div>
    );
}

export default React.memo(Shop);