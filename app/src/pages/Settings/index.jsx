import React, { Component } from 'react';
import Background from '../../images/cork.jpg';
import './style.css';
import '../general.css';

import NavBar from '../../components/NavBar';
import DropzoneComponent from 'react-dropzone-component';
import '../../../../node_modules/react-dropzone-component/styles/filepicker.css';
import '../../../../node_modules/dropzone/dist/min/dropzone.min.css';
import OurButton from '../../components/OurButton';
import { SketchPicker } from 'react-color';


export default class Setting extends Component {
  state = {
    addPop: false,
    file: '',
    siteColor: '',
    tempSiteColor: '',
  }
  revertColor = () => {
    console.log("I should revert the color to #003057");
  }
  revertBackground = () => {
    console.log("I should revert the background to the corkboard");
  }
  saveSettings = () => {
    console.log("I should save the settings");
  }
  getUserSettings = (username) => {
    console.log("I should get the user settings");
  }
  componentDidMount = () => {
    this.getUserSettings(this.props.username);
  }
  handleChangeComplete = (color) => {
    this.setState({ tempSiteColor: color.hex });
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
        removedfile: (file) => { this.setState({file: ""}) }
    }
    return (
      <div className='bgDiv_general' style={{background: `url(${Background})`, overflow:'auto'}} >
      <div className='holderDiv'>
          <div className={ `bkgOverlay_general` } style={{backgroundColor: this.props.userSiteColor}}/>
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
                    <SketchPicker
                        color={ this.state.background }
                        onChangeComplete={ this.handleChangeComplete }
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
                <div className={`postit_general`} style={{width: "240px"}}>
                  <p>Privacy</p>
                </div>
                <div className='settingsButton'>
                  <OurButton
                      buttonText='Save Changes'
                      buttonAction={() => {this.saveSettings()}}
                      buttonType='primary'
                  />
                </div>
              </div>
              <div className='usersBlock'>
              </div>
              <NavBar handlePop={() => {console.log("nopes")}} addPop={false} getSearch={this.props.getSearch}
                    user={this.props.username} capsule={this.props.usercapsule}
                    changeCapsuleID={this.props.changeCapsuleID}
                    userID={this.props.userID} userSiteColor={this.props.userSiteColor}/>
            </div>
        </div>
      </div>
    );
  };
}