import React from 'react';
import './ModalWindow.css';

const ModalWindow = (props) => {
    const properties = props.children;
    // console.log(props.children);
    
    return (
        <div className='modal_window'>
            <div className='modal_window-title'>{properties.name}</div>
        </div>
    );
};

export default ModalWindow;