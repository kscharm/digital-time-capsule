import React, { Component } from 'react';
import Background from '../../images/cork.jpg';
import './style.css';
import { withRouter } from 'react-router-dom';

export default class WelcomePage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    toCapsule: false,
    user: '',
    pass: '',
  }

  login = (historys) => {
    //check if valid login
    const valid = true;
    //change path to capsule
    if (valid) {
      //window.sessionStorage.token;
      historys.push('/currentCapsule');
      console.log(this.context);
    }
    console.log('hello');
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