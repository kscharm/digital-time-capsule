import React, { Component } from 'react';
import Background from '../../images/cork.jpg';
import './style.css';
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';

/* A REAL authentication function */
export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated=true;
    setTimeout(cb, 100);
  }
};

class Login extends React.Component {

  constructor() {
    super();
  }
  state = {
    redirectToReferrer: false,
    capsuleID: '',
    user: '',
    pass: '',
  }
  login = ()=>{
    axios.get('http://localhost:3001/validateUser?username=' + this.state.user)
      .then((res) => {
        const user = res.data;
        bcrypt.compare(this.state.pass, user.password)
          .then((res) => {
            fakeAuth.authenticate(() => {
              this.setState({ redirectToReferrer: true });
              this.setState({ capsuleID: user.capsules[0] });
            })
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
    const { from } = this.props.location.state || { from: { pathname: `/currentCapsule` } }
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }

    return (
        <div className='bgDiv' style={{background: `url(${Background})`, backgroundSize: 'cover'}} >
          <div className='login'>
            <div className="login-form">
              <div className='welcomeMessage'>
                <span className='mainMessage'> Welcome! </span>
                <span className='subMessage'> Go Jackets! </span>
              </div>
              <ul>
                <li>
                    <label htmlFor="user"> Username</label>
                    <input type="text" id='user' name="user" maxLength="100" onChange={evt => this.updateUsername(evt)}/>
                </li>
                <li>
                  <label htmlFor="pass"> Password</label>
                  <input type="password" id='pass' name="pass" maxLength="100" onChange={evt => this.updatePass(evt)}/>
                </li>
              </ul>
              <button onClick={this.login}>Login</button>
              <p className="message">Not registered? <a href="/registration">Create an account</a></p>
            </div>
          </div>
        </div>
    );
  }
}

export default Login