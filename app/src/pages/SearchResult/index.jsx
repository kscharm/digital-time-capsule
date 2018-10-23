import React, { Component } from 'react';
import Background from '../../images/cork.jpg';
import './style.css';

import toBeCapsule from '../../images/addPhoto.png'

import NavBar from '../../components/NavBar';
// import AddButton from '../../components/AddButton';

export default class SearchResult extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    addPop: false, 
  }

  handlePop = (pop) => {
    this.setState({addPop: pop});
  }
  getSearchResults = (term) => {
    console.log("I should get the results for " + term);
  }
  componentDidMount = () => {
    //console.log(this.props);
    this.getSearchResults(this.props.term);
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
              </div>
              <h2 style={{margin: '7% 0 0 3%'}}>Search Results...</h2>
              <div>
                <img src={toBeCapsule} alt='placeholder' style={{zoom: '50%', padding: '20px 30px 0px 20px'}}></img>
                <img src={toBeCapsule} alt='placeholder' style={{zoom: '50%', padding: '20px 30px 0px 20px'}}></img>
                <img src={toBeCapsule} alt='placeholder' style={{zoom: '50%', padding: '20px 30px 0px 20px'}}></img>
              </div>
            </div>
        </div>
      </div>
    );
  };
}