import React, { Component } from 'react';
import Background from '../../images/cork.jpg';
import './style.css';

import NavBar from '../../components/NavBar';
import axios from 'axios';

import UserDisplay from '../../components/UserDisplay';


export default class Friends extends Component {
  state = {
    addPop: false, 
    userFriendsMatches: [],
    userPendingFriends: [],
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
          alert('Error getting friends: ' + err.message);
      });
  }

  getPending = (username) => {
    axios.get('http://localhost:3001/getPendingRequests?username=' + username)
      .then((res) => {
        this.setState({userPendingFriends: res.data});
        console.log(res.data);
      })
      .catch((err) => {
          alert('Error getting pending friends: ' + err.message);
      });
    
  }
  handleAcceptFriend = (friend) => {
    axios.post('http://localhost:3001/acceptFriend', {
      myUsername: this.props.username,
      friendUsername: friend
    })
      .then((res) => {
        const friendsWithNew = this.state.userFriendsMatches.concat(friend);
        this.setState({userFriendsMatches: friendsWithNew});
        console.log(res.data);
      })
      .catch((err) => {
          alert('Error accepting friend request: ' + err.message);
      });
  }
  handleDeleteFriend = (friend) => {
    axios.post('http://localhost:3001/deleteFriend', {
      myUsername: this.props.username,
      friendUsername: friend
    })
      .then((res) => {
        const index = this.state.userFriendsMatches.indexOf(friend);
        let friendWithOut = this.state.userFriendsMatches;
        friendWithOut.splice(index, 1);
        this.setState({userFriendsMatches: friendWithOut});
      })
      .catch((err) => {
          alert('Error deleting friend: ' + err.message);
      });
  }
  componentDidMount = () => {
    this.getUserFriends(this.props.username);
    this.getPending(this.props.username);
  }
  render() {
    const title1 = 'Friends';

    return (
      <div className='bgDiv' style={{background: `url(${Background})`, overflow:'auto'}} >
      <div>
          <div className={ `bkgOverlay` }/>
          <div className={ `capsuless` }>
            <div className='addButton'>
              </div>
              <div className={`notepaper-title`} style={{maxWidth: "300px"}}>
                <p className={`text-title`}>{title1}</p>
              </div>
              <div className='usersBlock'>
                {this.state.userFriendsMatches.map((user) => {
                  return (
                    <UserDisplay //giving the unique key error and I'm not sure why
                        title={user.username}
                        id={user._id}
                        photo={user.photo}
                        style={{display:'inline-block'}}
                        key={user.username}
                        university={user.university}
                        showDelete={this.state.showDelete}
                        handleAcceptFriend={this.handleAcceptFriend}
                        handleDeleteFriend={this.handleDeleteFriend}
                    />
                )
              })}
              </div>
              <div className={`notepaper-title`} style={{maxWidth: "300px"}}>
                <p className={`text-title`}>{'Pending Friend Requests'}</p>
              </div>
              <div className='usersBlock'>
                {this.state.userPendingFriends.map((user) => {
                  return (
                    <UserDisplay //giving the unique key error and I'm not sure why
                        title={user.username}
                        id={user._id}
                        photo={user.photo}
                        style={{display:'inline-block'}}
                        key={user.username}
                        university={user.university}
                        showDelete={this.state.showDelete}
                        handleAcceptFriend={this.handleAcceptFriend}
                        handleDeleteFriend={this.handleDeleteFriend}
                    />
                )
              })}
              </div>
              <NavBar handlePop={this.handlePop} addPop={this.state.addPop} getSearch={this.props.getSearch}
                    user={this.props.username} capsule={this.props.usercapsule}
                    changeCapsuleID={this.props.changeCapsuleID}/>
            </div>
        </div>
      </div>
    );
  };
}