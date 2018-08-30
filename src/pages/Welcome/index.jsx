import React, { Component } from 'react';
import ReactLink from '../../components/ReactLink';
import Background from '../../images/cork.jpg';
import './style.css'

export default class WelcomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
        <div className='bgDiv' style={{background: `url(${Background})`}} >
          <div className='welcomeMessage' >
            <span className='mainMessage'> Welcome! </span>
            <span className='subMessage'> This is your hell, and mine. </span>
          </div>
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