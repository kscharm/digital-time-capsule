import React from 'react';
import './style.css';
import logo from './images/gtLogo.png';

const BottomBar = (props) => {
  return (
    <div className='bottomBar'>
        <div className='logo'>
            <img src={logo} className='logoImage' />
            <span className='copyright' > © Georgia Institute of Technology </span>
        </div>
    </div>
  );
};

export default BottomBar;