import React from 'react';
import './BottomPanel.css';

const BottomPanel = ({friendsWindowViewHandler}) => {

    return (
        <div className='bottom_panel'>
            <div className='bottom_panel-icon' onClick={() => friendsWindowViewHandler()}></div>
        </div>
    );
};

export default BottomPanel;