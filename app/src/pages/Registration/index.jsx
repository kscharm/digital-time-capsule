import React, { Component } from 'react';
import ReactLink from '../../components/ReactLink';
import Background from '../../images/cork.jpg';
import './style.css';

export default class Registration extends Component {
  // constructor(props) {
  //   super(props);
  // }

  login() {
    console.log('hello');
  }

  render() {
    console.log('hello');
    return (
        <div className='bgDiv' style={{background: `url(${Background})`, backgroundSize: 'cover'}} >
          <div className='welcomeMessage' >
            <span className='mainMessage'> Welcome! </span>
            <span className='subMessage'> Go Jackets! </span>
          </div>
          <div className='register'>
            <ReactLink 
                to={{
                pathname: '/currentCapsule',
                state: { prev: true },
                }}
                linkText='REGISTER'
            />
          </div>
        </div>
        
    );
  };
}