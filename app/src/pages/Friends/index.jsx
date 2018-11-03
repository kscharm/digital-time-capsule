import React, { Component } from 'react';
import Background from '../../images/cork.jpg';
import './style.css';

import toBeCapsule from '../../images/addPhoto.png'

import NavBar from '../../components/NavBar';
import axios from 'axios';

import UserDisplay from '../../components/UserDisplay';


export default class Friends extends Component {
  state = {
    addPop: false, 
    userFriendsMatches: [],
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
          alert('Error getting capsules: ' + err.message);
      });
  }
  componentDidMount = () => {
    this.getUserFriends(this.props.username);
  }
  render() {

    const title1 = 'Friends';

    return (
      <div className='bgDiv' style={{background: `url(${Background})`, overflow:'auto'}} >
      <div>
          <div className={ `bkgOverlay` }/>
          <div className={ `capsuless` }>
            <NavBar handlePop={this.handlePop} addPop={this.state.addPop} getSearch={this.props.getSearch}
                    user={this.props.username} capsule={this.props.usercapsule}
                    changeCapsuleID={this.props.changeCapsuleID}/>

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
                  />
              )
            })}
            </div>

            <div className='addButton'>
              </div>
              <div className={`notepaper-title`} style={{maxWidth: "150px"}}>
                <p className={`text-title`}>{title1}</p>
              </div>
              <div>
                <img src={toBeCapsule} alt='placeholder' style={{zoom: '50%', padding: '20px 30px 0px 20px'}}></img>
                <img src={toBeCapsule} alt='placeholder' style={{zoom: '50%', padding: '20px 30px 0px 20px'}}></img>
                <img src={toBeCapsule} alt='placeholder' style={{zoom: '50%', padding: '20px 30px 0px 20px'}}></img>
              </div>
            </div>
        </div>
      </div>
    );
  };
}