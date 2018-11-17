import React, { Component } from 'react';
import '../general.css';

import NavBar from '../../components/NavBar';
import DropzoneComponent from 'react-dropzone-component';
import '../../../../node_modules/react-dropzone-component/styles/filepicker.css';
import '../../../../node_modules/dropzone/dist/min/dropzone.min.css';
import OurButton from '../../components/OurButton';
import { SketchPicker } from 'react-color';
import './style.css';

import SpotifyWebApi from 'spotify-web-api-js';

export default class Setting extends Component {
  state = {
    addPop: false,
    file: '',
    siteColor: '',
    selectedOption: 'public',
    spotifyToken: "",
  }

  handleOptionChange = (changeEvent) => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  revertColor = () => {
    console.log("I should revert the color to #003057");
  }

  revertBackground = () => {
    console.log("I should revert the background to the corkboard");
  }

  saveSettings = () => {
    console.log("I should save the settings");
    this.props.changeUserSiteColor(this.state.siteColor);
    this.props.changeUserBackgroundImage(this.state.file);
  }

  getUserSettings = (username) => {
    console.log("I should get the user settings");
  }
  authorizeSpofity = () => {
    
  }

  componentDidMount = () => {
    this.getUserSettings(this.props.username);
    this.setState({siteColor: this.props.userSiteColor});
    this.setState({file: this.props.userBackgroundImage});
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userSiteColor !== this.state.userSiteColor) {
      this.setState({ siteColor: nextProps.userSiteColor });
    } 
  }
  handleChangeComplete = (color) => {
    this.setState({ siteColor: color.hex });
  }
  render() {
    console.log(this.state.user);
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
        removedfile: (file) => { this.setState({file: this.props.userBackgroundImage}) }
    }
    return (
      <div className='bgDiv_general' style={{background: `url(${this.state.file})`, overflow:'auto'}} >
      <div className='holderDiv'>
          <div className={ `bkgOverlay_general` } style={{backgroundColor: this.state.siteColor}}/>
          <div className={ `capsuless_general` }>
            <div className='addButton'>
              </div>
              <div className={`notepaper-title_general`} style={{maxWidth: "300px", width: "240px"}}>
                <p className={`text-title_general`}>Settings</p>
              </div>
              <div className='settings'>
                <div>
                  <div className={`postit_general`} style={{width: "240px"}}>
                    <p>Site Color</p>
                  </div>
                  <div className='colorPicker'>
                    {this.props.userSiteColor !== this.state.siteColor ?
                      <p className='helperText'>This is a preview, you must save and log out to see your changes sitewide.</p> : null}
                    <SketchPicker
                        color={ this.state.siteColor }
                        onChangeComplete={ this.handleChangeComplete }
                        style={{width: '24em'}}
                      />
                    <div className='resetButton'>
                      <OurButton
                        buttonText='Revert to Original'
                        buttonAction={() => {this.revertColor()}}
                        buttonType='secondary'
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className={`postit_general`} style={{width: "240px"}}>
                    <p>Background Image</p>
                  </div>
                  <div className='photoThing_general'>
                  {this.props.userBackgroundImage !== this.state.file ?
                      <p className='helperText'>This is a preview, you must save and log out to see your changes sitewide.</p> : null}
                    <div className="dropzone">
                    <DropzoneComponent
                        config={componentConfig}
                        djsConfig={djsConfig}
                        eventHandlers={eventHandlers}
                    />
                    </div>
                    <div className='resetButton'>
                      <OurButton
                        buttonText='Revert to Original'
                        buttonAction={() => {this.revertBackground()}}
                        buttonType='secondary'
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className={`postit_general`} style={{width: "240px"}}>
                    <p>Personal Capsule Privacy</p>
                  </div>
                  <form className='options'>
                    <div className="radio1">
                    <label>
                        <input type="radio" value="public" onChange={this.handleOptionChange} checked={this.state.selectedOption === 'public'} />
                        Public
                    </label>
                    </div>
                    <div className="radio2">
                    <label>
                        <input type="radio" value="private" onChange={this.handleOptionChange} checked={this.state.selectedOption === 'private'}/>
                        Private
                    </label>
                    </div>
                </form>
              </div>
                <div className='settingsButton'>
                  <OurButton
                      buttonText='Save Changes'
                      buttonAction={() => {this.saveSettings()}}
                      buttonType='primary'
                  />
                </div>
                <div className='spotifyButton'>
                  <OurButton
                      buttonText='Authorize Spofity'
                      buttonAction={() => {this.authorizeSpofity()}}
                      buttonType='primary'
                  />
                </div>
              </div>
              <div className='usersBlock'>
              </div>
              <NavBar handlePop={() => {console.log("nopes")}} addPop={false} getSearch={this.props.getSearch}
                    user={this.props.username} capsule={this.props.usercapsule}
                    changeCapsuleID={this.props.changeCapsuleID}
                    userID={this.props.userID} userSiteColor={this.state.siteColor}/>
            </div>
        </div>
      </div>
    );
  };
}