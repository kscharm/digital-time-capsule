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
  if (props.options) {
    contents = props.options.map(option => (
      <span className="menuItem" key={option}>{option}</span>
    ));
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
  }

  dropMenu = () => {
    console.log('hello');
    this.setState({showMenu: !this.state.showMenu});
  }

  render() {
    return (
      <div>
        <div className='navBar'>
            <div className='search'>
                <Search />
            </div>
            <div className='icons'>
              <FaHome className='icon' onClick={() => { this.dropMenu('home')}} />
              <FaCloudUploadAlt className='icon' onClick={() => { this.dropMenu('cloud')}} />
              <FaUserCircle className='icon' onClick={() => { this.dropMenu('user')}} />
              <div className='dropDown'>
                <FaBars className='icon' onClick={() => {this.dropMenu('menu')}} />
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