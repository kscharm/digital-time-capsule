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


  render() {

    return (
      <div className='bgDiv' style={{background: `url(${Background})`, overflow:'auto'}} >
      <NavBar handlePop={this.handlePop} addPop={this.state.addPop} />
      <div className='addButton'>
            {/* <AddButton
              buttonAction={() => { this.handlePop(!this.state.addPop) }}
              buttonType='add'
            /> */}
        </div>
        <h2 style={{margin: '7% 0 0 3%'}}>Search Results...</h2>
        <div>
          <img src={toBeCapsule} alt='placeholder' style={{zoom: '50%', padding: '20px 30px 0px 20px'}}></img>
          <img src={toBeCapsule} alt='placeholder' style={{zoom: '50%', padding: '20px 30px 0px 20px'}}></img>
          <img src={toBeCapsule} alt='placeholder' style={{zoom: '50%', padding: '20px 30px 0px 20px'}}></img>
        </div>
      </div>
    );
  };
}