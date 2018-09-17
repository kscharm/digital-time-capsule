import React from 'react';
import './style.css';

const Select = (props) => {
  let choices = props.options;
  let optionItems = choices.map((choice) =>
    <option className='select-selected' key={choice}>{choice}</option>
  );
  return (
    <div className='select-style'>
    <select defaultValue=''>
      <option selected disabled >{props.choose}</option>
      {optionItems}
    </select>
    </div>
  );
};

export default Select;