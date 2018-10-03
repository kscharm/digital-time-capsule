import React, { Component } from 'react';
import Background from '../../images/cork.jpg';
import './style.css';

export default class WelcomePage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  login() {
    console.log('hello');
  }

  render() {
    return (
        <div className='bgDiv' style={{background: `url(${Background})`, backgroundSize: 'cover'}} >
          <div className='welcomeMessage'>
            <span className='mainMessage'> Welcome! </span>
            <span className='subMessage'> Go Jackets! </span>
          </div>
          <div className='login'>
            <div className='loginForm'>
              <form action={'/currentCapsule'} target="_self">
                <label>
                  Email:
                  <input type="text" name="email" />
                </label>
                <div></div>
                <label>
                  Password:
                  <input type="password" name="password" />
                </label>
                <div></div>
                <label>
                  <input type="submit" name="submit" action={'/currentCapsule'}></input>
                </label>
                <div></div>
                <div>
                  <a href={'/registration'}>Don't have an account? Click here!</a>
                </div>
              </form>
            </div>
          </div>
        </div>
        
    );
  };
}