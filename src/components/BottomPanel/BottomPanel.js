import React from 'react';
import './BottomPanel.css';
import { useDispatch } from 'react-redux'
import { update } from '../../redux/store/store'

const BottomPanel = ({ friendsWindowViewHandler }) => {
    const bottomPanelList = [
        {
            name: 'home',
            handler: () => dispatch(update({ name: 'view', source: 'garden' }))
        },
        {
            name: 'barn',
            handler: () => dispatch(update({ name: 'view', source: 'barn' }))
        },
        {
            name: 'pond',
            handler: () => dispatch(update({ name: 'view', source: 'pond' }))
        },
        {
            name: 'top',
            handler: () => console.log()

        },
        {
            name: 'friends',
            handler: () => friendsWindowViewHandler()
        },
    ]

    const dispatch = useDispatch();

    return (

        <div className='bottom_panel'>
            {
                bottomPanelList.map((item, index) => {
                    const image = require(`../../img/icons/icon_${item.name}.png`);
                    return (
                        <div key={index} className='bottom_panel-icon'
                            style={{ backgroundImage: `url(${image})` }}
                            onClick={() => item.handler()}>
                        </div>
                    )
                }
                )
            }
        </div>
    );
};

export default BottomPanel;