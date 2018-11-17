import React, { Component } from 'react';
import './style.css';
import '../general.css';

import NavBar from '../../components/NavBar';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import UserDisplay from '../../components/UserDisplay';
import CapsuleDisplay from '../../components/CapsuleDisplay';

export default class SearchResult extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    addPop: false, 
    userMatches: [],
    capsuleList: [],
  }

  handlePop = (pop) => {
    this.setState({addPop: pop});
  }
  sendToCapusle = (id) => {
    this.props.changeCapsuleID(id);
    this.setState({changeTo: id});
    this.setState({redirectToReferrer: true});
  }
  getSearchResults = (term) => {
    axios.get('http://localhost:3001/searchUsers?query=' + term)
      .then((res1) => {
        axios.get('http://localhost:3001/searchCapsules?query=' + term
          + '&user=' + this.props.username)
          .then((res2) => {
            console.log('User matches: ' + res1.data);
            console.log('Capsule matches: ' + res2.data);
            this.setState({userMatches: res1.data});
            this.setState({capsuleList: res2.data});
            // console.log(this.state.userMatches);
          })
          .catch((err) => {
            console.log('Error searching for: ' + term);
          });
      })
      .catch((err) => {
          console.log('Error searching for: ' + term);
      });
  }
  componentDidUpdate(prevProps) {
    if (this.props.term !== prevProps.term) {
      this.getSearchResults(this.props.term);
    }
  }
  componentDidMount = () => {
    //console.log(this.props);
    this.getSearchResults(this.props.term);
  }
  render() {

    const title1 = "Capsules";
    const title2 = "Users";
    // const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const { from } = this.props.location.state || { from: { pathname: `/currentCapsule/${this.props.user}/${this.state.changeTo}` } }

    if (this.state.redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }
    return (
      <div className='bgDiv_general' style={{background: `url(${this.props.userBackgroundImage})`, overflow:'auto'}} >
      <div className='holderDiv'>
          <div className={ `bkgOverlay_general` } style={{backgroundColor: this.props.userSiteColor}}/>
          <div className={ `capsuless_general` }>
            <div className='addButton'>
              </div>
              <div className={`notepaper-title_general`} style={{maxWidth: "160px"}}>
                <p className={`text-title_general`}>{title1}</p>
              </div>
              {/* <h2 style={{margin: '7% 0 0 3%'}}>Search Results...</h2> */}
              <div className='capsulesBlock'>
                {this.state.capsuleList.map((capsule) => {
                  return (
                    <CapsuleDisplay
                        title={capsule.title}
                        id={capsule._id}
                        description={capsule.description}
                        style={{display:'inline-block'}}
                        key={capsule._id}
                        capsuleObj={capsule}
                        showDelete={this.state.showDelete}
                        sendToCapusle={this.sendToCapusle}
                        userID={this.props.userID}
                        handleDeleteCapsule={() => {console.log('I do nothing.')}}
                        user={this.props.username}
                        capsulePage={false}
                        userSiteColor={this.props.userSiteColor}
                    />
                )
              })}
              </div>
              <div className={`notepaper-title_general`} style={{maxWidth: "130px"}}>
                <p className={`text-title_general`}>{title2}</p>
              </div>
              <div className='usersBlock'>
              {this.state.userMatches.map((user) => {
                let inFriends = false;
                if (user.friends.includes(this.props.username)) {
                  console.log("bitch gotem");
                  inFriends = true;
                } else {
                  console.log('nah son aint gotem');
                  inFriends = false;
                }
                return (
                  <UserDisplay //giving the unique key error and I'm not sure why
                      title={user.username}
                      id={user._id}
                      photo={user.photo}
                      style={{display:'inline-block'}}
                      key={user.username}
                      university={user.university}
                      showDelete={this.state.showDelete}
                      handleAcceptFriend={() => {console.log('I dont do anything');}}
                      handleDeleteFriend={() => {console.log('I dont do anything');}}
                      myUsername={this.props.username}
                      areFriends={inFriends}
                      sentRequest={false}
                      recrequest={false}
                      searchPage={true}
                      userSiteColor={this.props.userSiteColor}
                  />
              )
            })}
            </div>
            </div>
        <NavBar handlePop={this.handlePop} addPop={this.state.addPop} getSearch={this.props.getSearch} 
                    user={this.props.username} capsule={this.props.usercapsule}
                    inSearch={true} changeCapsuleID={this.props.changeCapsuleID}
                    userID={this.props.userID} userSiteColor={this.props.userSiteColor}/>
        </div>
      </div>
    );
  };
}