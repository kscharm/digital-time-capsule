import React, { Component } from 'react';
import Background from '../../images/cork.jpg';
import './style.css';
import AddButton from '../../components/AddButton';

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

  getUserCapsules = (user) => {
    console.log("I should get the capsules for " + user);
  }
  componentDidMount = () => {
    //console.log(this.props);
    this.getUserCapsules(this.props.username);
  }
  render() {

    return (
      <div className='bgDiv' style={{background: `url(${Background})`, overflow:'auto'}} >
        <div>
          <div className={ `bkgOverlay` }/>
          <div className={ `capsuless` }>
            <NavBar handlePop={this.handlePop} addPop={this.state.addPop} getSearch={this.props.getSearch}
                    user={this.props.username} capsule={this.props.usercapsule}/>
            <div className='addButton'>
              <AddButton
                buttonAction={() => { console.log("i dhouls open the add modal")}}
                buttonType='add'
              />
            </div>
            <h2 style={{margin: '7% 0 0 3%'}}>My Capsules</h2>
            <div>
              <img src={toBeCapsule} alt="placeholder" style={{zoom: '50%', padding: '20px 30px 0px 20px'}}></img>
              <img src={toBeCapsule} alt="placeholder" style={{zoom: '50%', padding: '20px 30px 0px 20px'}}></img>
              <img src={toBeCapsule} alt="placeholder" style={{zoom: '50%', padding: '20px 30px 0px 20px'}}></img>
            </div>
          </div>
        </div>
      </div>
    );
  };
}