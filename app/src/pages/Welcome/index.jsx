import React, { Component } from 'react';
import Background from '../../images/cork.jpg';
import './style.css';

export default class WelcomePage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    toCapsule: false,
    user: '',
    pass: '',
  }

  login() {
    //check if valid login
    const valid = true;
    //change path to capsule
    if (valid) {
      this.props.history.push('/currentCapsule');
      console.log('/currentCapsule');
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
    return (
        <div className='bgDiv' style={{background: `url(${Background})`, backgroundSize: 'cover'}} >
          <div className='login'>
            <form className="login-form" onSubmit={this.login} target="_self">
              <div className='welcomeMessage'>
                <span className='mainMessage'> Welcome! </span>
                <span className='subMessage'> Go Jackets! </span>
              </div>
              <input type="text" placeholder="username" onChange={evt => this.updateUsername(evt)}/>
              <input type="password" placeholder="password" onChange={evt => this.updatePass(evt)}/>
              <button>login</button>
              <p className="message">Not registered? <a href="/registration">Create an account</a></p>
            </form>
          </div>
        </div>
        
    );
  };
}