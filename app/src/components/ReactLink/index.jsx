import React from 'react';
import './style.css';
import Link from 'react-router-dom/Link';

const ReactLink = (props) => {
  return (
      <Link className={ `reactLink-default reactLink-${props.linkType}` } to={props.to} style={{backgroundColor: this.props.userSiteColor}}> {props.linkText} </Link>
  );
};

export default ReactLink;