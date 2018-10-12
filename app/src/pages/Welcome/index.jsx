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
    axios.get('http://localhost:3001/validateUser?username=' + this.state.user)
      .then((res) => {
        const user = res.data;
        bcrypt.compare(this.state.pass, user.password)
          .then((res) => {
            window.location='/currentCapsule';
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
              <ul>
                <li>
                    <label for="user"> Username</label>
                    <input type="text" id='user' name="user" maxlength="100" onChange={evt => this.updateUsername(evt)}/>
                </li>
                <li>
                  <label for="pass"> Password</label>
                  <input type="password" id='pass' name="pass" maxlength="100" onChange={evt => this.updatePass(evt)}/>
                </li>
              </ul>
              <Login/>
              <p className="message">Not registered? <a href="/registration">Create an account</a></p>
            </form>
          </div>
        </div>
        
    );
  };
}