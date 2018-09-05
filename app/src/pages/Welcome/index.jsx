import React, { Component } from 'react';
import ReactLink from '../../components/ReactLink';
import Background from '../../images/cork.jpg';
import './style.css';

export default class WelcomePage extends Component {
  constructor(props) {
    super(props);
  }

  login() {
    console.log('hello');
  }

  render() {
    return (
        <div className='bgDiv' style={{background: `url(${Background})`, backgroundSize: 'cover'}} >
          <div className='welcomeMessage' >
            <span className='mainMessage'> Welcome! </span>
            <span className='subMessage'> Go Jackets! </span>
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