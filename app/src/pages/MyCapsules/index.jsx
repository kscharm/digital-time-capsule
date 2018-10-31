import React, { Component } from 'react';
import Background from '../../images/cork.jpg';
import './style.css';
import AddButton from '../../components/AddButton';
import toBeCapsule from '../../images/addPhoto.png';
import AddCapsule from '../../components/Cards/AddCapsule';
import CapsuleDisplay from '../../components/CapsuleDisplay';

import NavBar from '../../components/NavBar';
import axios from 'axios';

export default class Registration extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    addPop: false,
    showAddCapsule: false,
    capsuleList: [],
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

  getUserCapsules = (username) => {
    axios.get('http://localhost:3001/getCapsules?username=' + username)
      .then((res1) => {
        axios.post('http://localhost:3001/getCapsulesById', {
          capsuleIds: res1.data
        })
        .then((res2) => {
          // Array of time capsule objects
          console.log(res2.data);
          this.setState({capsuleList: res2.data});
        })
        .catch((err) => {
          alert('Error getting capsules: ' + err.message);
        });
      })
      .catch((err) => {
          alert('Error getting capsules: ' + err.message);
      });
  }
  componentDidMount = () => {
    this.getUserCapsules(this.props.username);
  }
  render() {

    const title1 = "My Capsules";
    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    return (
      <div className='bgDiv' style={{background: `url(${Background})`, overflow:'auto'}} >
        <div>
          <div className={ `bkgOverlay` }/>
          <div className={ `capsuless` }>
            <NavBar handlePop={this.handlePop} addPop={this.state.addPop} getSearch={this.props.getSearch}
                    user={this.props.username} capsule={this.props.usercapsule}/>
            <div className='addButton'>
              <AddButton
                buttonAction={() => {this.setState({showAddCapsule: true})}}
                buttonType='add'
              />
            </div>
            <div className={`notepaper-title`} style={{maxWidth: "180px"}}>
                <p className={`text-title`}>{title1}</p>
              </div>
            <div className='capsulesBlock' style={{width: w}}>
              {this.state.capsuleList.map((capsule) => {
                return (
                  <CapsuleDisplay
                      title={capsule.title}
                      id={capsule._id}
                      description={capsule.description}
                      style={{display:'inline-block'}}
                      key={capsule._id}
                      capsuleObj={capsule}
                      showDelete={this.state.showDelete}
                  />
              )
            })}
            </div>
            {this.state.showAddCapsule ? <AddCapsule
                                        handleShowAddCapsule={this.handleShowAddCapsule}
                                        handleAddCapsule={this.handleAddCapsule}
                                        userID={this.props.userID}
                                        user={this.props.username}/> : null}
          </div>
        </div>
      </div>
    );
  };
}