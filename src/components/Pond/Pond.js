import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { incrementMoney } from '../../redux/store/store'
import './Pond.css'
import floats from '../../img/float.mp3'

const floatSound = new Audio(floats);
floatSound.preload = 'metadata';

const Pond = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.counter.dataGarden);
    const money = useSelector(state => state.counter.money);
    const sound = useSelector(state => state.counter.sound);
    const lvl = data.length / 5 - 1;
    const fihingPrice = lvl * lvl * 150 ;
    const [speech, setSpeech] = useState(`Закинуть удочку - ${fihingPrice}$`);
    const [float, setFloat] = useState('');
    const rodRef = useRef();
    const randomChance = 0.55;

    function rodHendler() {
        if (float !== '') return;
        if (money - fihingPrice < 5) {
            setSpeech('У тебя мало монет :(');
            return;
        }
        sound && floatSound.play();
        rodRef.current.classList.add('rod-start');
        dispatch(incrementMoney(- fihingPrice));
        setFloat('pond__float');
        setSpeech('Готово! Теперь ждемс до минутки');
        setTimeout(() => {
            rodRef.current?.classList.remove('rod-start');
            setFloat('');
            if (Math.random() < randomChance) {
                const fishSale = fihingPrice * 7 * Math.random();
                setSpeech(`Ура! Ты поймал на ${fishSale.toFixed(0)}$`);
                dispatch(incrementMoney(fishSale));
            } else {
                setSpeech(`Упс! Рыбка сорвалась :(`);
            }
        }, 60000 * Math.random());
    }

    return (
        <div className="pond__wrapper">
            <div className='pond'>
                <div className="pond__water"></div>
                <div className="pond__rod" ref={rodRef} onClick={rodHendler}></div>
                {float === '' ? '' : <div className="pond__waves"></div>}                
                <div className={float}></div>
            </div>
            <div className='pond__cat'>
                <div className="cat__speech">{speech}</div>
            </div>
        </div >);
}

export default Pond;