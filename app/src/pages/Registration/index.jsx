import React, { Component } from 'react';
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
        {/* <div className='welcomeMessage' >
          <span className='mainMessage'> Registration! </span>
          <span className='subMessage'> Input your information below! </span>
        </div> */}
        <div className='register'>
          <form action="#" method="post">
          <h2>Registration</h2>
              <p>
                <label for="firstName" class="floatLabel">First Name</label>
                <input id="firstName" name="firstName" type="text"></input>
              </p>
              <p>
                <label for="lastName" class="floatLabel">Last Name</label>
                <input id="lastName" name="lastName" type="text"></input>
              </p>
              <p>
                <label for="email" class="floatLabel">Email</label>
                <input id="Email" name="Email" type="text"></input>
              </p>
              <p>
                <label for="university" class="floatLabel">University</label>
                <input id="university" name="university" type="text"></input>
              </p>
              <p>
                <label for="major" class="floatLabel">Major</label>
                <input id="major" name="major" type="text"></input>
              </p>
              <p>
                <label for="userID" class="floatLabel">Username</label>
                <input id="userId" name="userId" type="text"></input>
              </p>
              <p>
                <label for="password" class="floatLabel">Password</label>
                <input id="password" name="password" type="password"></input>
                <span>Enter a password longer than 8 characters.</span>
              </p>
              <p>
                <label for="confirm_password" class="floatLabel">Confirm Password</label>
                <input id="confirm_password" name="confirm_password" type="password"></input>
                <span>Your passwords do not match.</span>
              </p>
              <p>
                <input type="submit" value="Create My Account" id="submit"></input>
              </p>
          </form>
        </div>
      </div>
    );
  };
}