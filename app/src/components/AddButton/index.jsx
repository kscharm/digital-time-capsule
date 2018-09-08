import React from 'react';
import './style.css';
import {FaPlus} from 'react-icons/fa';

const AddButton = (props) => {
  return (
      <div className='add'>     
        <button onClick={props.buttonAction} className={ `our-btn-${props.buttonType}` }>
          <FaPlus className='addIcon' size={32}/>
        </button>
      </div>
  );
};

export default AddButton;