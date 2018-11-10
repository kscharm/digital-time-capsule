import React, { Component } from 'react';
import Background from '../../images/cork.jpg';
import './style.css';

import NavBar from '../../components/NavBar';
import axios from 'axios';

import UserDisplay from '../../components/UserDisplay';


export default class Profile extends Component {
  state = {
    addPop: false,
  }

  handlePop = (pop) => {
    this.setState({addPop: pop});
  }
  
  componentDidMount = () => {
    // this.getUserFriends(this.props.username);
    // this.getSentRequests(this.props.username);
    // this.getReceivedRequests(this.props.username);
  }
  render() {
    const title1 = 'User Information';
    console.log(this.state.user);

    return (
      <div className='bgDiv' style={{background: `url(${Background})`, overflow:'auto'}} >
      <div>
          <div className={ `bkgOverlay` }/>
          <div className={ `capsuless` }>
            <div className='addButton'>
              </div>
              <div className={`notepaper-title`} style={{maxWidth: "300px", width: "240px"}}>
                <p className={`text-title`}>{title1}</p>
              </div>
              <div className='usersBlock'>
                {/* {this.state.userFriendsMatches.map((user) => {
                  return (
                    <UserDisplay
                        title={user.username}
                        id={user._id}
                        photo={user.photo}
                        style={{display:'inline-block'}}
                        key={user.username}
                        university={user.university}
                        showDelete={this.state.showDelete}
                        handleAcceptFriend={this.handleAcceptFriend}
                        handleDeleteFriend={this.handleDeleteFriend}
                        myUsername={this.props.username}
                        areFriends={true}
                        sentRequest={false}
                        recrequest={false}
                        searchPage={false}
                    />
                )
              })} */}
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