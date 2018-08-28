import React from 'react';
import './style.css';
import Link from 'react-router-dom/Link';

const ReactLink = (props) => {
  return (
      <Link className='reactLink' to={props.to} > {props.linkText} </Link>
  );
};

export default ReactLink;