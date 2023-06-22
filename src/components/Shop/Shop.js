import React, { useRef } from 'react';
import { shopData } from '../../data/shopData'
import './Shop.css'
import ShopItem from './ShopItem/ShopItem';
import { useSelector } from 'react-redux';

const Shop = ({shopContainerRef}) => {
    const view = useSelector(state => state.counter.view);
    const activeItem = useSelector(state => state.counter.shopActiveItem);
    let shopRef = useRef();

    function roundMinutes(amount) {
        if (amount >= 3600) return (amount / 3600) + 'ч';
        if (amount >= 60) return (amount / 60) + 'm';
        return amount + 's';
    }

    function roundThousend(amount) {
        if (amount >= 1000000) return (amount / 1000000).toFixed(1) + 'm';
        if (amount >= 1000) return (amount / 1000).toFixed(1) + 'k';
        return amount;
    }

    function closeMenu() {
        shopContainerRef.current.style.display = 'none';
    }

    return (
        <div className='shop__container' ref={shopContainerRef}>
            {
                view === 'garden' ?
                    <div className='shop__item-active'>
                        {activeItem ?
                            (<>
                                <div>К: {roundThousend(activeItem?.purchasePrice)}$</div>
                                <div>П: {roundThousend(activeItem?.sellingPrice)}$</div>
                                <div>В: {roundMinutes(activeItem?.riseTime / 1000)}</div>
                            </>)
                            : ''} </div>
                    : <div className='shop__item-active'>
                        {activeItem ?
                            (<>
                                <div>Цена: {roundThousend(activeItem?.price)}$</div>
                                <div>Доход: {activeItem.moneyPerSecond}$/сек</div>
                            </>)
                            : ''} </div>
            }

            <div className="shop__menu">
                <button className='btn__close' onClick={closeMenu}>x</button>
            </div>

            <div className="shop__wrapper" ref={shopRef}>
                <div className='shop'>
                    {
                        view === 'barn' ?
                            shopData.pets.map((e, index) =>
                                <ShopItem
                                    key={index}
                                    item={e}
                                    index={index}
                                    shopRef={shopRef} />)
                            : shopData.plants.map((e, index) =>
                                <ShopItem
                                    key={index}
                                    item={e}
                                    index={index}
                                    shopRef={shopRef}
                                />)
                    }

                </div>

            </div>
        </div>

    );
}

export default React.memo(Shop);