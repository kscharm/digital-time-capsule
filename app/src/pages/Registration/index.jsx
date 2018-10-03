import React, { Component } from 'react';
import Background from '../../images/cork.jpg';
import './style.css';

export default class Registration extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    toCapsule: false,
    firstName: '',
    lastName: '',
    email:'',
    university: '',
    major: '',
    user: '',
    pass: '',
    confirmPass: '',
  }

  login() {
    console.log('hello');
  }

  updateFirst = (evt) => {
    this.setState({firstName: evt.target.value})
  }
  updateLast = (evt) => {
    this.setState({lastName: evt.target.value})
  }
  updateEmail = (evt) => {
    this.setState({email: evt.target.value})
  }
  updateUniversity = (evt) => {
    this.setState({university: evt.target.value})
  }
  updateMajor = (evt) => {
    this.setState({major: evt.target.value})
  }
  updateConfirmPass = (evt) => {
    this.setState({confirmPass: evt.target.value})
  }
  updateUsername = (evt) => {
    this.setState({user: evt.target.value})
  }
  updatePass = (evt) => {
    this.setState({pass: evt.target.value})
  }

  render() {
    console.log('hello');
    return (
      <div className='bgDiv' style={{background: `url(${Background})`, overflow:'auto'}} >
        <div className='register'>
          <form action="#" method="post">
            <h2>Registration</h2>
            <p>
              <input placeholder='First Name' id="firstName" name="firstName" type="text" onChange={evt => this.updateFirst(evt)}/>
            </p>
            <p>
              <input placeholder='Last Name' id="lastName" name="lastName" type="text" onChange={evt => this.updateLast(evt)}/>
            </p>
            <p>
              <input placeholder='Email' id="Email" name="Email" type="text" onChange={evt => this.updateEmail(evt)}/>
            </p>
            <p>
              <input placeholder='University' id="university" name="university" type="text" onChange={evt => this.updateUniversity(evt)}/>
            </p>
            <p>
              <input placeholder='Major' id="major" name="major" type="text" onChange={evt => this.updateMajor(evt)}/>
            </p>
            <p>
              <input placeholder='Username' id="userId" name="userId" type="text" onChange={evt => this.updateUsername(evt)}/>
            </p>
            <p>
              <input placeholder='Password' id="password" name="password" type="password" onChange={evt => this.updatePass(evt)}/>
              {/* <span>Enter a password longer than 8 characters.</span> */}
            </p>
            <p>
              <input placeholder='Confirm Password' id="confirm_password" name="confirm_password" type="password" onChange={evt => this.updateConfirmPass(evt)}/>
              {/* <span>Your passwords do not match.</span> */}
            </p>
            <p>
              <input type="submit" value="Create My Account" id="submit"/>
            </p>
          </form>
        </div>
      </div>
    );
  };
}