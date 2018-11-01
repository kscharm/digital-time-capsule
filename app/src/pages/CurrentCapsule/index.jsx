import React, { Component } from 'react';
import './style.css';

import CapsuleComponent from '../../components/CapsuleComponent';

export default class CurrentCapsule extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    currentCapsule: '',
    currentUser: '',
    currentMessage: '',
  }

  handleUpdateCapsule = (capsule) => {
    this.setState({currentCapsule: capsule});
  }
  handleUpdateUser = (user) => {
    this.props.changeUsername(user);
  }
  handleUpdateMessage = (message) => {
    this.setState({currentMessage: message});
  }

  componentDidMount = () => {
    this.setState({currentUser: this.props.username});
    this.setState({currentCapsule: this.props.currentCapsuleID});
  }
 
  render() {
    return (
      <div>
        <CapsuleComponent
          handleUpdateCapsule={this.handleUpdateCapsule}
          handleUpdateUser={this.handleUpdateUser}
          handleUpdateMessage={this.handleUpdateMessage}
          user={this.props.username}
          capsule={this.props.currentCapsuleID}
          usercapsule={this.props.usercapsule}
          message={this.state.currentMessage}
          getSearch={this.props.getSearch}
          changeCapsuleID={this.props.changeCapsuleID}
        />
      </div>
    );
  };
}