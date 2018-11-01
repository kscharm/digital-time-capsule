import React, { Component } from 'react';
import './style.css';
import Search from '../Search'
import { 
  FaHome,
  FaCloudUploadAlt,
  FaUserCircle,
  FaBars,
  FaUsers,
  FaCog,
  FaMusic,
  FaArchive,
  FaSignOutAlt,
} from 'react-icons/fa';

import {
  Link,
  Redirect,
} from 'react-router-dom';

const Menu = (props) => {
  let contents = [];
  let icon = '';
  let clicks = () => {};
  let toPage = '#';
  if (props.options) {
    contents = props.options.map(option => {
      if (option==='Settings') {
        icon = <FaCog/>
      } else if (option==='Capsules') {
        icon = <FaArchive/>
        clicks = () => {
            console.log('TO MY CAPSULES');
        }
        toPage = `/myCapsules/${props.user}`;
      } else if (option==='Playlists') {
        icon = <FaMusic/>
      } else if (option==='Friends') {
        icon = <FaUsers/>
        clicks = () => {
          console.log('TO MY FRIENDS');
        }
        toPage = `/myFriends/${props.user}`;
      } else if (option==='Logout') {
        icon = <FaSignOutAlt/>
        clicks = () => {
          console.log('IM LOGGING OUT');
        }
        toPage = '/';
      }
      return (
        <div key={option}>
          <Link to={toPage} style={{color: 'white', textDecoration: 'none'}}>
            <span className="menuItem" key={option} onClick={clicks} >
              {icon} {option}
            </span>
          </Link>
        </div>
      );
    });
  }

  return (
      <div>
        {contents}
      </div>
  );
};

export default class NavBar extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    showMenu: false,
    homeClicked: false,
    userClicked:false,
    menuClicked:false,
    addPop: false,
    redirectToReferrer: false,
    goHomeBut: '',
  }

  goHome = () => {
    this.props.changeCapsuleID(this.props.capsule);
    // if (this.props.inCapsule) {
    //   console.log('in capsule');
    //   this.setState({goHomeBut: this.props.capsule});
    // } else {
    //   console.log('not in capsule');
    //   this.setState({redirectToReferrer: true});
    // }
    // this.setState({redirectToReferrer: true});
  }

  componentWillReceiveProps (newProps) {
    if (newProps.hasOwnProperty('addPop')) {
      this.setState({addPop: newProps.addPop});
    }
  }

  dropMenu = (icon) => {
    if (icon==='home') {
      this.setState({homeClicked: true, userClicked: false, menuClicked: false});
      this.setState({showMenu: false});
      this.props.handlePop(false);
    } else if (icon==='user') {
      this.setState({homeClicked: false, userClicked: true, menuClicked: false});
      this.setState({showMenu: false});
    } else if (icon==='menu') {
      this.setState({homeClicked: false, userClicked: false, menuClicked: true});
      this.setState({showMenu: !this.state.showMenu});
    }
  }

  render() {
    const { from } = { from: { pathname: `/currentCapsule/${this.props.user}/${this.props.capsule}` } }

    if (this.state.redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }
    return (
      <div>
        <div className='navBar'>
            <div className='search'>
                <Search getSearch={this.props.getSearch} inSearch={this.props.inSearch}/>
            </div>
            <div className='icons'>
              <Link to={`/currentCapsule/${this.props.user}/${this.props.capsule}`} style={{color: 'white'}}>
                <FaHome className='icon' onClick={() => {this.goHome() ; this.dropMenu('home');}} style={this.state.homeClicked ? {opacity: 1} : {opacity: .75}} />
              </Link>
              <FaCloudUploadAlt className='icon' onClick={() => { this.dropMenu('cloud')}} />
              <FaUserCircle className='icon' onClick={() => { this.dropMenu('user')}} style={this.state.userClicked ? {opacity: 1} : {opacity: .75}} />
              <div className='dropDown'>
                <FaBars className='icon' onClick={() => {this.dropMenu('menu')}} style={this.state.menuClicked ? {opacity: 1} : {opacity: .75}}/>
                <div className='dropDown-content' style={this.state.showMenu ? {display: 'block'} : {display: 'none'}} >
                  {this.state.showMenu ? <Menu user={this.props.user} options={['Settings', 'Capsules', 'Playlists', 'Friends', 'Logout']} /> : null }
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  };
}