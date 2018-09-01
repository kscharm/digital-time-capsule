import React, { Component } from 'react';
import './style.css';
import Search from '../Search'
import { FaHome, FaCloudUploadAlt, FaUserCircle, FaBars } from 'react-icons/fa';

export default class NavBar extends Component {
  dropMenu = () => {
    console.log('hello');
  }

  render() {
    return (
      <div className='navBar'>
          <div className='search'>
              <Search />
          </div>
          <div className='icons'>
            <FaHome className='icon' onClick={this.dropMenu} />
            <FaCloudUploadAlt className='icon' onClick={this.dropMenu} />
            <FaUserCircle className='icon' onClick={this.dropMenu} />
            <FaBars className='icon' onClick={this.dropMenu} />
          </div>
      </div>
    );
  }
};