import React, { Component } from 'react';
import './style.css';
import '../general.css';
import axios from 'axios';

import NavBar from '../../components/NavBar';

import DropzoneComponent from 'react-dropzone-component';
import '../../../node_modules/react-dropzone-component/styles/filepicker.css';
import '../../../node_modules/dropzone/dist/min/dropzone.min.css';

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
  }
  saveChanges = () => {
    console.log("I should save the changes the user made");
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
  getUserInfo(username) {
    axios.get('http://localhost:3001/getUserByUsername?username=' + username)
      .then((res) => {
        this.setState({firstname: res.data.firstName});
        this.setState({lastName: res.data.lastName});
        this.setState({email: res.data.email});
        this.setState({university: res.data.university});
        this.setState({major: res.data.major});
        this.setState({username: res.data.username});
        this.setState({password: res.data.password});
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

  handleButtonClick = () => {
    console.log("Editing: " + this.state.editing);
    if (this.state.editing) {
      this.setState({editing: false});
    } else {
      this.setState({editing: true});
    }
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
              this.setState({ fileName: file.name });
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                  this.setState({file: reader.result});
              }
          } else {
              this.dropzone.removeFile(file);
          }
      },
      removedfile: (file) => { this.setState({file: ""}) }
  }

    const DisplayUserInfo = () => {
      return (
      <div>
      <h2>Your User Information</h2>
      <img src={require('../../images/addPhoto.png')} style={{backgroundColor: "black", marginLeft: "auto", marginRight: "auto", display: "block"}} />
      <ul>
        <li className='viewLi'>
            <label htmlFor="firstName"> First Name</label>
            <p id='firstName' className='viewP' name="firstName">{this.state.firstname}</p>
            <span className='viewSpan'>Your first name</span>
        </li>
        <li className='viewLi'>
            <label htmlFor="lastName"> Last Name</label>
            <p id='lastName' className='viewP' name="lastName">{this.state.lastName}</p>
            <span className='viewSpan'>Your last name</span>
        </li>
        <li className='viewLi'>
            <label htmlFor="email"> Email</label>
            <p id='email' className='viewP' name="email">{this.state.email}</p>
            <span className='viewSpan'>Your email</span>
        </li>
        <li className='viewLi'>
            <label htmlFor="university"> University</label>
            <p id='university' className='viewP' name="university">{this.state.university}</p>
            <span className='viewSpan'>Your university</span>
        </li>
        <li className='viewLi'>
            <label htmlFor="major"> Major</label>
            <p id='major' className='viewP' name="major">{this.state.major}</p>
            <span className='viewSpan'>Your major</span>
        </li>
        <li className='viewLi'>
            <label htmlFor="username"> Username</label>
            <p id='username' className='viewP' name="username">{this.state.username}</p>
            <span className='viewSpan'>Your username</span>
        </li>
        <li className='viewLi'>
            <label htmlFor="pass1"> Password</label>
            <p id='pass1' className='viewP' name="pass1">...</p>
            <span className='viewSpan'>Your password</span>
        </li>
      </ul>
      <p>
      <button onClick={() => {this.handleButtonClick()}}>Edit User Info</button>
      </p>
      </div>);
    }
    
    const EditableUserInfo = () => {
      return (
      <div>
        <h2>Edit Your User Information</h2>
        <div className='photoDropZone'>
              <DropzoneComponent
                  config={componentConfig}
                  djsConfig={djsConfig}
                  eventHandlers={eventHandlers}
              />
            </div>
        <ul>
          {/*I would love to have placeholders in these, but for some reason, {this.state.firstname} will not appear when set as a placeholder :( */}
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
        <p className='buttonsP'>
        <button className='btn' onClick={() => {this.saveChanges()}}>Save Changes</button>
        <button className='btn' onClick={() => {this.handleButtonClick()}}>Cancel</button>
        </p>
        </div>);
    }
    
    const title1 = 'User Information';

    let UserInfo;

    if (this.state.editing) {
      UserInfo = <EditableUserInfo/>;
    } else {
      UserInfo = <DisplayUserInfo />;
    }

    return (
      <div className='bgDiv_general' style={{background: `url(${this.props.userBackgroundImage})`, overflow:'auto'}} >
      <div className='holderDiv'>
          <div className={ `bkgOverlay_general` } style={{backgroundColor: this.state.userSiteColor}}/>
          <div className={ `capsuless_general` }>
              <div className={`notepaper-title_general`} style={{maxWidth: "300px", width: "240px"}}>
                <p className={`text-title_general`}>{title1}</p>
              </div>
              <div className='register'>
                {UserInfo}
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