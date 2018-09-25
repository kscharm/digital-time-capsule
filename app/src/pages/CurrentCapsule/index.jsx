import React, { Component } from 'react';
import './style.css';

import CapsuleComponent from '../../components/CapsuleComponent';

export default class CurrentCapsule extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    currentCapsule: 'myCapsule',
    currentUser: 'kenny',
    currentMessage: '',
  }

  handleUpdateCapsule = (capsule) => {
    this.setState({currentCapsule: capsule});
  }
  handleUpdateUser = (user) => {
    this.setState({currentUser: user});
  }
  handleUpdateMessage = (message) => {
    this.setState({currentMessage: message});
  }
 
  render() {

    return (
      <div>
        <CapsuleComponent
          handleUpdateCapsule={this.handleUpdateCapsule}
          handleUpdateUser={this.handleUpdateUser}
          handleUpdateMessage={this.handleUpdateMessage}
          user={this.state.currentUser}
          capsule={this.state.currentCapsule}
          message={this.state.currentMessage}
        />
      </div>
    );
  };
}