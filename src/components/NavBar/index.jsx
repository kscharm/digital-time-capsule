import React, { Component } from 'react';
import './style.css';
import Search from '../Search'
import { FaHome, FaCloudUploadAlt, FaUserCircle, FaBars } from 'react-icons/fa';

const OurButtons = (props) => {
  return (
      <button onClick={props.buttonAction} className={ `our-btn-default our-btn-${props.buttonType}` }>{props.buttonText}</button>
  );
};

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    showDropDown: false,
  }

  handleLoading = (isLoading) => {
    this.setState({isLoading: isLoading});
  }

  dropMenu = () => {
    console.log('hello');
    this.setState({showDropDown: true});
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
                <div className='dropDown-content'>
                  {this.state.showDropDown ? <OurButtons/> : null}
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  };
}