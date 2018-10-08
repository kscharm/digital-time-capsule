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
      window.location='/currentCapsule';
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