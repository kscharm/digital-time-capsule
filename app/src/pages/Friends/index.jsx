import React, { Component } from 'react';
import Background from '../../images/cork.jpg';
import './style.css';
import '../general.css';

import NavBar from '../../components/NavBar';
import axios from 'axios';

import UserDisplay from '../../components/UserDisplay';


export default class Friends extends Component {
  state = {
    addPop: false, 
    userFriendsMatches: [],
    userSentRequests: [],
    userReceivedRequests: []
  }

  handlePop = (pop) => {
    this.setState({addPop: pop});
  }
  getUserFriends = (username) => {
    axios.get('http://localhost:3001/getFriends?username=' + username)
      .then((res) => {
        this.setState({userFriendsMatches: res.data});
        console.log(res.data);
      })
      .catch((err) => {
          alert('Error getting friends: ' + err.response.data);
      });
  }

  getSentRequests = (username) => {
    axios.get('http://localhost:3001/getSentRequests?username=' + username)
      .then((res) => {
        this.setState({userSentRequests: res.data});
        console.log(res.data);
      })
      .catch((err) => {
          alert('Error getting sent friend requests: ' + err.response.data);
      });
  }

  getReceivedRequests = (username) => {
    axios.get('http://localhost:3001/getReceivedRequests?username=' + username)
      .then((res) => {
        this.setState({userReceivedRequests: res.data});
        console.log(res.data);
      })
      .catch((err) => {
          alert('Error getting received friend requests: ' + err.response.data);
      });
  }
  handleAcceptFriend = (friend) => {
    const friendsWithNew = this.state.userFriendsMatches.concat(friend);
    this.setState({userFriendsMatches: friendsWithNew});
    const index = this.state.userReceivedRequests.indexOf(friend);
    let friendWithOut = this.state.userReceivedRequests;
    friendWithOut.splice(index, 1);
    this.setState({userReceivedRequests: friendWithOut});
  }
  handleDeleteFriend = (friend) => {
    const index = this.state.userFriendsMatches.indexOf(friend);
    let friendWithOut = this.state.userFriendsMatches;
    friendWithOut.splice(index, 1);
    this.setState({userFriendsMatches: friendWithOut});
  }
  handleRemoveRequest = (friend) => {
    const index = this.state.userReceivedRequests.indexOf(friend);
    let friendWithOut = this.state.userReceivedRequests;
    friendWithOut.splice(index, 1);
    this.setState({userReceivedRequests: friendWithOut});
  }
  componentDidMount = () => {
    this.getUserFriends(this.props.username);
    this.getSentRequests(this.props.username);
    this.getReceivedRequests(this.props.username);
  }
  render() {
    const title1 = 'Friends';

    return (
      <div className='bgDiv_general' style={{background: `url(${Background})`, overflow:'auto'}} >
      <div className='holderDiv'>
          <div className={ `bkgOverlay_general` } style={{backgroundColor: this.props.userSiteColor}}/>
          <div className={ `capsuless_general` }>
            <div className='addButton'>
              </div>
              <div className={`notepaper-title_general`} style={{maxWidth: "300px", width: "150px"}}>
                <p className={`text-title_general`}>{title1}</p>
              </div>
              <div className='usersBlock'>
                {this.state.userFriendsMatches.map((user) => {
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
                        userSiteColor={this.props.userSiteColor}
                    />
                )
              })}
              </div>
              <div className={`notepaper-title_general`} style={{maxWidth: "300px", width: "260px"}}>
                <p className={`text-title_general`}>{'Sent Friend Requests'}</p>
              </div>
              <div className='usersBlock'>
                {this.state.userSentRequests.map((user) => {
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
                        areFriends={false}
                        sentRequest={true}
                        recrequest={false}
                        userSiteColor={this.props.userSiteColor}
                    />
                )
              })}
              </div>
              <div className={`notepaper-title_general`} style={{maxWidth: "300px"}}>
                <p className={`text-title_general`}>{'Received Friend Requests'}</p>
              </div>
              <div className='usersBlock'>
                {this.state.userReceivedRequests.map((user) => {
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
                        areFriends={false}
                        sentRequest={false}
                        recrequest={true}
                        searchPage={false}
                        handleRemoveRequest={this.handleRemoveRequest}
                        userSiteColor={this.props.userSiteColor}
                    />
                )
              })}
              </div>
              <NavBar handlePop={this.handlePop} addPop={this.state.addPop} getSearch={this.props.getSearch}
                    user={this.props.username} capsule={this.props.usercapsule}
                    changeCapsuleID={this.props.changeCapsuleID} userID={this.props.userID}
                    userSiteColor={this.props.userSiteColor}/>
            </div>
        </div>
      </div>
    );
  };
}