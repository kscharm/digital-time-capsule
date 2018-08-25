import React, { Component } from 'react';
import ReactLink from '../../components/ReactLink';
import './style.css'

export default class WelcomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className='welcomePage'>
          <div className='login'>
            <ReactLink 
                to={{
                pathname: '/personalCapsule',
                state: { prev: true },
                }}
                linkText='LOGIN'
            />
          </div>
        </div>
    );
  };
}