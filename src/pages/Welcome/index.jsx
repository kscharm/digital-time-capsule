import React, { Component } from 'react';
import ReactLink from '../../components/ReactLink';

export default class WelcomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div id='welcomePage'>
            <ReactLink 
                to={{
                pathname: '/personalCapsule',
                state: { prev: true },
                }}
                linkText='WELCOME'
            />
        </div>
    );
  };
}