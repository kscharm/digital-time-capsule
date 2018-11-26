import React, { Component } from 'react';
import './style.css';
import '../general.css';
import axios from 'axios';
import bcrypt from 'bcryptjs';

import NavBar from '../../components/NavBar';

import DropzoneComponent from 'react-dropzone-component';
import '../../../../node_modules/react-dropzone-component/styles/filepicker.css';
import '../../../../node_modules/dropzone/dist/min/dropzone.min.css';

export default class Profile extends Component {
  state = {
    addPop: false,
    userSiteColor: '',
    firstName: '',
    lastName: '',
    email: '',
    university: '',
    major: '',
    username: '',
    password: '',
    pass2: '',
    file: '',
    editing: false,
  }
  handleButtonClick = () => {
    if (this.state.editing) {
      this.setState({editing: false});
    } else {
      this.setState({editing: true});
    }
  }
  saveChanges = () => {
    // Generate password hash for safe storage
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.state.password, salt, (err, hash) => {
        this.setState({password: hash});
        const profile = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          university: this.state.university,
          major: this.state.major,
          password: this.state.password,
        };
        axios.post('http://localhost:3001/saveProfile', {
          username: this.state.username,
          profile
        })
          .then((res) => {
            console.log(res.data);
            this.handleButtonClick();
          })
          .catch((err) => {
              alert('Error saving profile: ' + err.response.data);
          });
      });
    });
    
  }
  updateFirst = (evt) => {
    this.setState({firstName: evt.target.value});
  }
  updateLast = (evt) => {
    this.setState({lastName: evt.target.value});
  }
  updateEmail = (evt) => {
    this.setState({email: evt.target.value});
  }
  updateUniversity = (evt) => {
    this.setState({university: evt.target.value});
  }
  updateMajor = (evt) => {
    this.setState({major: evt.target.value});
  }
  updateConfirmPass = (evt) => {
    this.setState({confirmPass: evt.target.value});
  }
  updateUsername = (evt) => {
    this.setState({username: evt.target.value});
  }
  updatePass = (evt) => {
    this.setState({password: evt.target.value});
  }
  getUserInfo(username) {
    axios.get('http://localhost:3001/getUserByUsername?username=' + username)
      .then((res) => {
        this.setState({firstName: res.data.firstName});
        this.setState({lastName: res.data.lastName});
        this.setState({email: res.data.email});
        this.setState({university: res.data.university});
        this.setState({major: res.data.major});
        this.setState({username: res.data.username});
        this.setState({password: res.data.password});
        this.setState({password: res.data.pass2});
      })
      .catch((err) => {
          alert('Error getting user data: ' + err.response.data);
      });
  }
  componentDidMount = () => {
    // Get all of the user information
    // Then use that information to fill in the sections below.
    this.getUserInfo(this.props.username);
    this.setState({userSiteColor: this.props.userSiteColor});
  }

  render() {
    const componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.gif'],
      allowedFiletypes: ['.jpg', '.png', '.gif'],
      showFiletypeIcon: true,
      postUrl: 'no-url',
    };
    const djsConfig = {
        maxFiles: 1,
        addRemoveLinks: true,
        autoProcessQueue: false,
        uploadMultiple: false,
    };
    const eventHandlers = {
        init: (dropzone) => { this.dropzone = dropzone; },
        maxfilesexceeded: (file) => { this.dropzone.removeFile(file) },
        addedfile: (file) => {
            if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif') {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    this.setState({file: reader.result});
                }
            } else {
                this.dropzone.removeFile(file);
            }
        },
        removedfile: (file) => { this.setState({file: ''}) }
    }
    
    const title1 = 'User Information';

    return (
      <div className='bgDiv_general' style={{background: `url(${this.props.userBackgroundImage})`, overflow:'auto'}} >
      <div className='holderDiv'>
          <div className={ `bkgOverlay_general` } style={{backgroundColor: this.state.userSiteColor}}/>
          <div className={ `capsuless_general` }>
              <div className={`notepaper-title_general`} style={{maxWidth: "300px", width: "240px"}}>
                <p className={`text-title_general`}>{title1}</p>
              </div>
              <div className='profile'>
              <div>
                {this.state.editing ? <h2>Edit Your User Information</h2> : <h2>Your User Information</h2>}
                {this.state.editing ? <div className="drop">
                <DropzoneComponent
                    config={componentConfig}
                    djsConfig={djsConfig}
                    eventHandlers={eventHandlers}
                />
                </div>
                : <img src={this.props.userPhoto} style={{backgroundColor: "black", marginLeft: "auto", marginRight: "auto", display: "block"}} />}
                <ul>
                  {this.state.editing ? 
                    <li className='viewLi'>
                    <label for="firstName">First Name</label>
                    <input type="text" value={this.state.firstName} id='firstName' name="firstName" maxLength="100" onChange={evt => this.updateFirst(evt)}/>
                    <span>Enter your first name</span>
                    </li> : 
                    <li className='viewLi'>
                      <label htmlFor="firstName"> First Name</label>
                      <p id='firstName' className='viewP' name="firstName">{this.state.firstName}</p>
                      <span className='viewSpan'>Your first name</span>
                    </li>
                  }
                  {this.state.editing ? 
                    <li className='viewLi'>
                    <label for="lastName">Last Name</label>
                    <input type="text" value={this.state.lastName} id='lastName' name="lastName" maxLength="100" onChange={evt => this.updateLast(evt)}/>
                    <span>Enter your last name</span>
                    </li> : 
                    <li className='viewLi'>
                      <label htmlFor="lastName"> Last Name</label>
                      <p id='lastName' className='viewP' name="lastName">{this.state.lastName}</p>
                      <span className='viewSpan'>Your last name</span>
                    </li>
                  }
                  {this.state.editing ? 
                    <li className='viewLi'>
                    <label for="email"> Email</label>
                    <input type="text" value={this.state.email} id='email' name="email" maxLength="100" onChange={evt => this.updateEmail(evt)}/>
                    <span>Enter your email</span>
                    </li> : 
                    <li className='viewLi'>
                      <label htmlFor="email"> Email</label>
                      <p id='email' className='viewP' name="email">{this.state.email}</p>
                      <span className='viewSpan'>Your email</span>
                    </li>
                  }
                  {this.state.editing ? 
                    <li className='viewLi'>
                    <label for="university"> University</label>
                    <input type="text" value={this.state.university} id='university' name="university" maxLength="100" onChange={evt => this.updateUniversity(evt)}/>
                    <span>Enter your university</span>
                    </li> : 
                    <li className='viewLi'>
                      <label htmlFor="university"> University</label>
                      <p id='university' className='viewP' name="university">{this.state.university}</p>
                      <span className='viewSpan'>Your university</span>
                    </li>
                  }
                  {this.state.editing ? 
                    <li className='viewLi'>
                    <label for="major"> Major</label>
                    <input type="text" value={this.state.major} id='major' name="major" maxLength="100" onChange={evt => this.updateMajor(evt)}/>
                    <span>Enter your major</span>
                    </li> : 
                    <li className='viewLi'>
                      <label htmlFor="major"> Major</label>
                      <p id='major' className='viewP' name="major">{this.state.major}</p>
                      <span className='viewSpan'>Your major</span>
                    </li>
                  }
                  {this.state.editing ? 
                    <li className='viewLi'>
                    <label for="username"> Username</label>
                    <input type="text" value={this.state.username} id='username' name="username" maxLength="100" onChange={evt => this.updateUsername(evt)}/>
                    <span>Enter your username</span>
                    </li> : 
                    <li className='viewLi'>
                      <label htmlFor="username"> Username</label>
                      <p id='username' className='viewP' name="username">{this.state.username}</p>
                      <span className='viewSpan'>Your username</span>
                    </li>
                  }
                  {this.state.editing ? 
                    <li className='viewLi'>
                    <label for="password"> Password</label>
                    <input type="text" value={this.state.password} id='password' name="password" maxLength="100" onChange={evt => this.updatePass(evt)}/>
                    <span>Enter your password</span>
                    </li> : 
                    <li className='viewLi'>
                      <label htmlFor="password"> Password</label>
                      <p id='password' className='viewP' name="password">...</p>
                      <span className='viewSpan'>Your password</span>
                    </li>
                  }
                  {this.state.editing ? 
                    <li className='viewLi'>
                    <label for="password2"> Confirm Password</label>
                    <input type="text" value={this.state.pass2} id='password2' name="password2" maxLength="100" onChange={evt => this.updateConfirmPass(evt)}/>
                    <span>Re-Enter your password</span>
                    </li>
                    : null
                  }
                </ul>
                {this.state.editing ?
                <p className='buttonsP'>
                <button className='btn' onClick={() => {this.saveChanges()}}>Save Changes</button>
                <button className='btn' onClick={() => {this.handleButtonClick()}}>Cancel</button>
                </p>
                :
                <p>
                <button onClick={() => {this.handleButtonClick()}}>Edit User Info</button>
                </p>
                }
                </div>
              </div>
              <div className='usersBlock'>
              </div>
              <NavBar handlePop={() => {console.log("nopes")}} addPop={false} getSearch={this.props.getSearch}
                    user={this.props.username} capsule={this.props.usercapsule}
                    changeCapsuleID={this.props.changeCapsuleID}
                    userID={this.props.userID} userSiteColor={this.state.userSiteColor}/>
            </div>
        </div>
      </div>
    );
  };
}