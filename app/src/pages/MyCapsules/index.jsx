import React, { Component } from 'react';
import Background from '../../images/cork.jpg';
import './style.css';
import '../general.css';
import AddButton from '../../components/AddButton';
import AddCapsule from '../../components/Cards/AddCapsule';
import CapsuleDisplay from '../../components/CapsuleDisplay';
import { Redirect } from 'react-router-dom';

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
    redirectToReferrer: false,
    changeTo: '',
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
  sendToCapusle = (id) => {
    this.props.changeCapsuleID(id);
    this.setState({changeTo: id});
    this.setState({redirectToReferrer: true});
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
          alert('Error getting capsules: ' + err.response.data);
        });
      })
      .catch((err) => {
          alert('Error getting capsules: ' + err.response.data);
      });
  }
  handleAddCapsule = (capsule) => {
    // Update my capsule to have the new capsule that was added.
    const capsuleWithNew = this.state.capsuleList.concat(capsule);
    this.setState({capsuleList: capsuleWithNew});
  }
  handleDeleteCapsule = (capsule) => {
    const index = this.state.capsuleList.indexOf(capsule);
    let capsuleWithOut = this.state.capsuleList;
    capsuleWithOut.splice(index, 1);
    this.setState({capsuleList: capsuleWithOut});
  }
  componentDidMount = () => {
    this.getUserCapsules(this.props.username);
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: `/currentCapsule/${this.props.user}/${this.state.changeTo}` } }

    if (this.state.redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }

    const title1 = "My Capsules";
    // const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    return (
      <div className='bgDiv_general' style={{background: `url(${Background})`, overflow:'auto'}} >
        <div className='holderDiv'>
          <div className={ `bkgOverlay_general` } style={{backgroundColor: this.props.userSiteColor}}/>
          <div className={ `capsuless_general` }>
            <div className={`notepaper-title_general`} style={{maxWidth: "180px"}}>
                <p className={`text-title_general`}>{title1}</p>
              </div>
            <div className='capsulesBlock'>
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
                      sendToCapusle={this.sendToCapusle}
                      userID={this.props.userID}
                      handleDeleteCapsule={this.handleDeleteCapsule}
                      user={this.props.username}
                      capsulePage={true}
                      userSiteColor={this.props.userSiteColor}
                  />
              )
            })}
            </div>
            <NavBar handlePop={this.handlePop} addPop={this.state.addPop} getSearch={this.props.getSearch}
                    user={this.props.username} capsule={this.props.usercapsule}
                    changeCapsuleID={this.props.changeCapsuleID}
                    userID={this.props.userID} userSiteColor={this.props.userSiteColor}/>
            <div className='addButton'>
              <AddButton
                buttonAction={() => {this.setState({showAddCapsule: true})}}
                buttonType='add'
                userSiteColor={this.props.userSiteColor}
              />
            </div>
            {this.state.showAddCapsule ? <AddCapsule
                                        handleShowAddCapsule={this.handleShowAddCapsule}
                                        handleAddCapsule={this.handleAddCapsule}
                                        userID={this.props.userID}
                                        user={this.props.username}
                                        userSiteColor={this.props.userSiteColor}/> : null}
          </div>
        </div>
      </div>
    );
  };
}