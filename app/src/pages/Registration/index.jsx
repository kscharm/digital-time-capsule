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
            <span className='mainMessage'> Registration! </span>
            <span className='subMessage'> Input your information below! </span>
          </div>
          <div className='register'>
            <div className="registrationForm">
              <form action={'/currentCapsule'} target="_self">
                <label>
                  First Name:
                  <input type="text" name="email" />
                </label>
                <div></div>
                <label>
                  Last Name:
                  <input type="text" name="email" />
                </label>
                <div></div>
                <label>
                  Major:
                  <input type="text" name="email" />
                </label>
                <div></div>
                <label>
                  Minor:
                  <input type="text" name="email" />
                </label>
                <div></div>
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
                  Confirm Password:
                  <input type="password" name="password" />
                </label>
                <div></div>
                <label>
                  <input type="submit" name="submit" action={'/currentCapsule'}></input>
                </label>
              </form>
            </div>
          </div>
        </div>
        
    );
  };
}