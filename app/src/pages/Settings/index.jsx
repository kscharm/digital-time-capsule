import React, { Component } from 'react';
import Background from '../../images/cork.jpg';
import './style.css';
import '../general.css';

import NavBar from '../../components/NavBar';


export default class Setting extends Component {
  state = {
    addPop: false,
  }
  
  componentDidMount = () => {
  }
  render() {
    console.log(this.state.user);

    return (
      <div className='bgDiv_general' style={{background: `url(${Background})`, overflow:'auto'}} >
      <div className='holderDiv'>
          <div className={ `bkgOverlay_general` }/>
          <div className={ `capsuless_general` }>
            <div className='addButton'>
              </div>
              <div className={`notepaper-title_general`} style={{maxWidth: "300px", width: "240px"}}>
                <p className={`text-title_general`}>Settings</p>
              </div>
              <div className='settings'>
                <p>Site Color</p>
                <p>Background Theme</p>
                <p>User Privacy</p>
              </div>
              <div className='usersBlock'>
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