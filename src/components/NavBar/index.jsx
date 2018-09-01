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
  FaArchive
} from 'react-icons/fa';

const Menu = (props) => {
  let contents = [];
  let icon = '';
  if (props.options) {
    contents = props.options.map(option => {
      if (option==='Settings') {
        icon = <FaCog/>
      } else if (option==='Capsules') {
        icon = <FaArchive/>
      } else if (option==='Playlists') {
        icon = <FaMusic/>
      } else if (option==='Friends') {
        icon = <FaUsers/>
      }
      return (
        <div>
          <span className="menuItem" key={option}>{icon} {option}</span>
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
  constructor(props) {
    super(props);
  }

  state = {
    showMenu: false,
    homeClicked: false,
    userClicked:false,
    menuClicked:false,
  }

  dropMenu = (icon) => {
    console.log('hello');
    if (icon==='home') {
      this.setState({homeClicked: true, userClicked: false, menuClicked: false});
      this.setState({showMenu: false});
    } else if (icon==='user') {
      this.setState({homeClicked: false, userClicked: true, menuClicked: false});
      this.setState({showMenu: false});
    } else if (icon==='menu') {
      this.setState({homeClicked: false, userClicked: false, menuClicked: true});
      this.setState({showMenu: !this.state.showMenu});
    }
  }

  render() {
    return (
      <div>
        <div className='navBar'>
            <div className='search'>
                <Search />
            </div>
            <div className='icons'>
              <FaHome className='icon' onClick={() => { this.dropMenu('home')}} style={this.state.homeClicked ? {opacity: 1} : {opacity: .75}} />
              <FaCloudUploadAlt className='icon' onClick={() => { this.dropMenu('cloud')}} />
              <FaUserCircle className='icon' onClick={() => { this.dropMenu('user')}} style={this.state.userClicked ? {opacity: 1} : {opacity: .75}} />
              <div className='dropDown'>
                <FaBars className='icon' onClick={() => {this.dropMenu('menu')}} style={this.state.menuClicked ? {opacity: 1} : {opacity: .75}}/>
                <div className='dropDown-content' style={this.state.showMenu ? {display: 'block'} : {display: 'none'}} >
                  {this.state.showMenu ? <Menu options={['Settings', 'Capsules', 'Playlists', 'Friends']} /> : null }
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  };
}