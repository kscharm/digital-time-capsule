import React, { Component } from 'react';
import Background from '../../images/cork.jpg';
import './style.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import bcrypt from 'bcryptjs';

export default class Registration extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    toCapsule: false,
    _id: uuidv4(),
    firstName: '',
    lastName: '',
    email:'',
    university: '',
    major: '',
    username: '',
    password: '',
    confirmPass: '',
    capsules: []
  }

  register = () => {
    // Check if all fields are filled
    if (this.state.firstName === '' || this.state.lastName === '' || this.state.email === ''
      || this.state.username === '' || this.state.password === '' || this.state.confirmPass === '') {
      alert('You are missing one or more required fields.');
    // Check if passwords match
    } else if (this.state.password !== this.state.confirmPass) {
      alert('Your passwords do not match.');
    } else {
      // Generate password hash for safe storage
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.state.password, salt, (err, hash) => {
          this.setState({password: hash});
          // Copy the state
          const doc = this.state;
          // Delete unnecessary fields
          delete doc.toCapsule;
          // Add personal time capsule id to list of capsules
          doc.capsules.push(doc._id);
          axios.post('http://localhost:3001/registerUser', doc)
            .then((res) => {
                //change path to login
                window.location='/';
            })
            .catch((err) => {
               alert('Error saving user: ' + err.message);
            });
        });
      });
    }
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
    this.setState({username: evt.target.value})
  }
  updatePass = (evt) => {
    this.setState({password: evt.target.value})
  }

  render() {
    const Register = () => {
      return(
      <button
        onClick={() => {this.register()}}
      >
      Create My Account
      </button>
      );
    }
    return (
      <div className='bgDiv' style={{background: `url(${Background})`, overflow:'auto'}} >
        <div className='register'>
          <form>
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
              <Register/>
            </p>
          </form>
        </div>
      </div>
    );
  };
}