import React, { Component } from 'react';
import Background from '../../images/cork.jpg';
import './style.css';

import toBeCapsule from '../../images/addPhoto.png'

import NavBar from '../../components/NavBar';

export default class Registration extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    addPop: false, 
  }

  handlePop = (pop) => {
    this.setState({addPop: pop});
  }

  handleCapsuleButtonClick = () => {
    console.log("CAPSULE BUTTON CLICKED");
  }


  render() {

    return (
      <div className='bgDiv' style={{background: `url(${Background})`, overflow:'auto'}} >
      <NavBar handlePop={this.handlePop} addPop={this.state.addPop} />
      <div className='addButton'>
      <button type="button" className='addPop' onClick={this.handleCapsuleButtonClick}>Add Capsule</button>
            {/* <div className='addPop'  style={this.state.addPop ? {display: 'block'} : {display: 'none'}}>
              {this.state.addPop ? <Add options={['Add Capsule']} /> : null }
            </div> */}
        </div>
        <h2 style={{margin: '7% 0 0 3%'}}>My Capsules</h2>
        <div>
          <img src={toBeCapsule} alt="placeholder" style={{zoom: '50%', padding: '20px 30px 0px 20px'}}></img>
          <img src={toBeCapsule} alt="placeholder" style={{zoom: '50%', padding: '20px 30px 0px 20px'}}></img>
          <img src={toBeCapsule} alt="placeholder" style={{zoom: '50%', padding: '20px 30px 0px 20px'}}></img>
        </div>
      </div>
    );
  };
}