import React from 'react';
import './style.css';

const OurButton = (props) => {
  return (
      <button onClick={props.buttonAction} className={ `our-btn-default our-btn-${props.buttonType}` }>{props.buttonText}</button>
  );
};

export default OurButton;
