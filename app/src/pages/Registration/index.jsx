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

  register = (histories) => {
    // Check if all fields are filled
    if (this.state.firstName === '' || this.state.lastName === '' || this.state.email === ''
      || this.state.username === '' || this.state.password === '' || this.state.confirmPass === '') {
      alert('You are missing one or more required fields.');
    // Check if passwords match
    } else if (this.state.password !== this.state.confirmPass) {
      alert('Your passwords do not match.');
    // Check if email is valid
    } else if ( !(/(.+)@(.+){2,}\.(.+){2,}/.test(this.state.email)) ){
      alert('Invalid email address');
    }
    else {
      // Generate password hash for safe storage
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.state.password, salt, (err, hash) => {
          this.setState({password: hash});
          // Copy the state
          const doc = this.state;
          // Delete unnecessary fields
          delete doc.toCapsule;
          delete doc.confirmPass;
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
    const Register = withRouter(({ history }) => (
      <button
        onClick={() => {this.register(history)}}
      >
      Create My Account
      </button>
      ))
    return (
      <div className='bgDiv' style={{background: `url(${Background})`, overflow:'auto'}} >
        <div className='register'>
          <form>
            <h2>Registration</h2>
            <ul>
              <li>
                  <label for="firstName"> First Name</label>
                  <input type="text" id='firstName' name="firstName" maxLength="100" onChange={evt => this.updateFirst(evt)}/>
                  <span>Enter your first name</span>
              </li>
              <li>
                  <label for="lastName"> Last Name</label>
                  <input type="text" id='lastName' name="lastName" maxLength="100" onChange={evt => this.updateLast(evt)}/>
                  <span>Enter your last name</span>
              </li>
              <li>
                  <label for="email"> Email</label>
                  <input type="email" id='email' name="email" maxLength="100" onChange={evt => this.updateEmail(evt)}/>
                  <span>Enter your email</span>
              </li>
              <li>
                  <label for="university"> University</label>
                  <input type="text" id='university' name="university" maxLength="100" onChange={evt => this.updateUniversity(evt)}/>
                  <span>Enter your university</span>
              </li>
              <li>
                  <label for="major"> Major</label>
                  <input type="text" id='major' name="major" maxLength="100" onChange={evt => this.updateMajor(evt)}/>
                  <span>Enter your major</span>
              </li>
              <li>
                  <label for="username"> Username</label>
                  <input type="text" id='username' name="username" maxLength="100" onChange={evt => this.updateUsername(evt)}/>
                  <span>Enter your username</span>
              </li>
              <li>
                  <label for="pass1"> Password</label>
                  <input type="password" id='pass1' name="pass1" maxLength="100" onChange={evt => this.updatePass(evt)}/>
                  <span>Enter your password</span>
              </li>
              <li>
                  <label for="pass2"> Confirm Password</label>
                  <input type="password" id='pass2' name="pass2" maxLength="100" onChange={evt => this.updateConfirmPass(evt)}/>
                  <span>Confirm your password</span>
              </li>
            </ul>
            <p>
              <Register/>
            </p>
          </form>
        </div>
      </div>
    );
  };
}