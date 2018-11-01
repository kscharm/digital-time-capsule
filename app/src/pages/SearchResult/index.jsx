import React, { Component } from 'react';
import Background from '../../images/cork.jpg';
import './style.css';

import toBeCapsule from '../../images/addPhoto.png'

import NavBar from '../../components/NavBar';
import axios from 'axios';

import UserDisplay from '../../components/UserDisplay';
// import AddButton from '../../components/AddButton';

export default class SearchResult extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    addPop: false, 
    userMatches: [],
  }

  handlePop = (pop) => {
    this.setState({addPop: pop});
  }
  getSearchResults = (term) => {
    axios.get('http://localhost:3001/searchUsers?query=' + term)
      .then((res1) => {
        axios.get('http://localhost:3001/searchCapsules?query=' + term
          + '&user=' + this.props.username)
          .then((res2) => {
            console.log('User matches: ' + res1.data);
            console.log('Capsule matches: ' + res2.data);
            this.setState({userMatches: res1.data});
            console.log(this.state.userMatches);
          })
          .catch((err) => {
            console.log('Error searching for: ' + term);
          });
      })
      .catch((err) => {
          console.log('Error searching for: ' + term);
      });
  }
  componentDidUpdate(prevProps) {
    if (this.props.term !== prevProps.term) {
      this.getSearchResults(this.props.term);
    }
  }
  componentDidMount = () => {
    //console.log(this.props);
    this.getSearchResults(this.props.term);
  }
  render() {

    const title1 = "Capsules";
    const title2 = "Users";
    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    return (
      <div className='bgDiv' style={{background: `url(${Background})`, overflow:'auto'}} >
      <div>
          <div className={ `bkgOverlay` }/>
          <div className={ `capsuless` }>
            <NavBar handlePop={this.handlePop} addPop={this.state.addPop} getSearch={this.props.getSearch} 
                    user={this.props.username} capsule={this.props.usercapsule}
                    inSearch={true} changeCapsuleID={this.props.changeCapsuleID}/>
            <div className='addButton'>
              </div>
              <div className={`notepaper-title`} style={{maxWidth: "160px"}}>
                <p className={`text-title`}>{title1}</p>
              </div>
              {/* <h2 style={{margin: '7% 0 0 3%'}}>Search Results...</h2> */}
              <div>
                <img src={toBeCapsule} alt='placeholder' style={{zoom: '50%', padding: '20px 30px 0px 20px'}}></img>
                <img src={toBeCapsule} alt='placeholder' style={{zoom: '50%', padding: '20px 30px 0px 20px'}}></img>
                <img src={toBeCapsule} alt='placeholder' style={{zoom: '50%', padding: '20px 30px 0px 20px'}}></img>
              </div>
              <div className={`notepaper-title`} style={{maxWidth: "130px"}}>
                <p className={`text-title`}>{title2}</p>
              </div>
              <div className='usersBlock' style={{width: w}}>
              {this.state.userMatches.map((user) => {
                return (
                  <UserDisplay //giving the unique key error and I'm not sure why
                      title={user}
                      // id={capsule._id}
                      // description={capsule.description}
                      style={{display:'inline-block'}}
                      key={user}
                      // capsuleObj={capsule}
                      showDelete={this.state.showDelete}
                  />
              )
            })}
            </div>
            </div>
        </div>
      </div>
    );
  };
}