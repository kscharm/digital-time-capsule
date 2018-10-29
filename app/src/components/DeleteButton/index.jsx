import React from 'react';
import './style.css';
import {FaTrash} from 'react-icons/fa';

const AddButton = (props) => {
  return (
      <div className='delete2'>     
        <button onClick={props.buttonAction} className={ `our-btn-${props.buttonType}` }>
          <FaTrash className='deleteIcon2' size={25}/>
        </button>
      </div>
  );
};

export default AddButton;