import React, { Component } from 'react';
import Background from '../../images/cork.jpg';
import './style.css';
import '../general.css';
import axios from 'axios';

import NavBar from '../../components/NavBar';


export default class Profile extends Component {
  state = {
    addPop: false,
  }
  saveChanges = () => {
    console.log("I should save the changes the user made");
  }
  componentDidMount = () => {
    // Get all of the user information
    // Then use that information to fill in the sections below.
    console.log("I should get all of the user info");
  }
  render() {
    const title1 = 'User Information';
    console.log(this.state.user);

    return (
      <div className='bgDiv_general' style={{background: `url(${Background})`, overflow:'auto'}} >
      <div className='holderDiv'>
          <div className={ `bkgOverlay_general` }/>
          <div className={ `capsuless_general` }>
              <div className={`notepaper-title_general`} style={{maxWidth: "300px", width: "240px"}}>
                <p className={`text-title_general`}>{title1}</p>
              </div>
              <div className='register'>
                <div>
                  <h2>User Information</h2>
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
                        <input type="text" id='email' name="email" maxLength="100" onChange={evt => this.updateEmail(evt)}/>
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
                  <button onClick={() => {this.saveChanges()}}>Save Changes</button>
                  </p>
                </div>
              </div>
              <div className='usersBlock'>
              </div>
              <NavBar handlePop={this.handlePop} addPop={this.state.addPop} getSearch={this.props.getSearch}
                    user={this.props.username} capsule={this.props.usercapsule}
                    changeCapsuleID={this.props.changeCapsuleID}
                    userID={this.props.userID}/>
            </div>
        </div>
      </div>
    );
  };
}