import React from 'react';
import { shopData } from '../../data/shopData'
import './Shop.css'
import ShopItem from './ShopItem/ShopItem';
import { useSelector } from 'react-redux';

const Shop = () => {
    const barnEnter = useSelector(state => state.counter.barnIn);
    const activeItem = useSelector(state => state.counter.shopActiveItem);
    function roundMinutes(amount) {
        if (amount >= 60) return (amount/60) + 'm';
        return amount + 's';
    }
    function roundThousend(amount) {
        if (amount > 1000) return (amount/1000).toFixed(1) + 'k';
        return amount;
    }
    return (
        <>
        {
            !barnEnter ? 
            <span className='shop__item-active'>
            {activeItem ?
            (<>
            <div>Buy: {roundThousend(activeItem?.purchasePrice)}$</div>
            <div>Sell: {roundThousend(activeItem?.sellingPrice)}$</div>
            <div>Time: {roundMinutes(activeItem?.riseTime/1000)}</div>
            </>)
        : ''} </span>
            : <span className='shop__item-active'>
            {activeItem ?
            (<>
            <div>Buy: {activeItem?.price}$</div>
            <div>Money in sec: {activeItem?.moneyPerSecond}$</div>
            </>)
        : ''} </span>
        }

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
        </>

    );
}

export default React.memo(Shop);