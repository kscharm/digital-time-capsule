import React, { Component } from 'react';
import Background from '../../images/cork.jpg';
import './style.css';
import AddButton from '../../components/AddButton';
import toBeCapsule from '../../images/addPhoto.png';
import AddCapsule from '../../components/Cards/AddCapsule';

import NavBar from '../../components/NavBar';

export default class Registration extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    addPop: false,
    showAddCapsule: false,
  }

  handlePop = (pop) => {
    this.setState({addPop: pop});
  }

  handleCapsuleButtonClick = () => {
    console.log("CAPSULE BUTTON CLICKED");
  }
  handleShowAddCapsule = (show) => {
    this.setState({showAddCapsule: show});
}

  getUserCapsules = (user) => {
    console.log("I should get the capsules for " + user);
  }
  componentDidMount = () => {
    //console.log(this.props);
    this.getUserCapsules(this.props.username);
  }
  render() {

    const title1 = "My Capsules";

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
            <div className={`notepaper-title`} style={{maxWidth: "180px"}}>
                <p className={`text-title`}>{title1}</p>
              </div>
            <div>
              <img src={toBeCapsule} alt="placeholder" style={{zoom: '50%', padding: '20px 30px 0px 20px'}}></img>
              <img src={toBeCapsule} alt="placeholder" style={{zoom: '50%', padding: '20px 30px 0px 20px'}}></img>
              <img src={toBeCapsule} alt="placeholder" style={{zoom: '50%', padding: '20px 30px 0px 20px'}}></img>
            </div>
            {/* {this.state.showAddCapsule ? <AddCapsule
                                        handleShowAddCapsule={this.handleShowAddCapsule}
                                        handleAddCapsule={this.handleAddCapsule}
                                        user={this.props.user}/> : null} */}
          </div>
        </div>
      </div>
    );
  };
}