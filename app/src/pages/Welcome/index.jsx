import React, { Component } from 'react';
import Background from '../../images/cork.jpg';
import './style.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';

export default class WelcomePage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    toCapsule: false,
    user: '',
    pass: '',
  }

  login = (histories) => {
    console.log('Getting user');
    axios.get('http://localhost:3001/validateUser?username=' + this.state.user)
      .then((res) => {
        const user = res.data;
        bcrypt.compare(this.state.pass, user.password)
          .then((res) => {
            histories.push('/currentCapsule');
          })
          .catch((err) => {
            alert('Invalid username and password combination');
          });
        })
      .catch((err) => {
          alert('Error validating user: ' + err.message);
      });
  }

  updateUsername = (evt) => {
    this.setState({user: evt.target.value})
  }
  updatePass = (evt) => {
    this.setState({pass: evt.target.value})
  }

  render() {
    const Login = withRouter(({ history }) => (
      <button
        onClick={() => {this.login(history)}}
      >
        Login
      </button>
    ))
    return (
        <div className='bgDiv' style={{background: `url(${Background})`, backgroundSize: 'cover'}} >
          <div className='login'>
            <form className="login-form" target="_self">
              <div className='welcomeMessage'>
                <span className='mainMessage'> Welcome! </span>
                <span className='subMessage'> Go Jackets! </span>
              </div>
              <input type="text" placeholder="username" onChange={evt => this.updateUsername(evt)}/>
              <input type="password" placeholder="password" onChange={evt => this.updatePass(evt)}/>
              <Login/>
              <p className="message">Not registered? <a href="/registration">Create an account</a></p>
            </form>
          </div>
        </div>
        
    );
  };
}