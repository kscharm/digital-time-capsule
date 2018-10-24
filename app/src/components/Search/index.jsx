import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './style.css';

// import {
//   Link,
// } from 'react-router-dom';

// import { 
//   FaSearch,
// } from 'react-icons/fa';

export default class Search extends Component {
  state = {
    redirectToReferrer2: false,
    searchTerm: '',
  }

  handleKeyPress = (e) => {
    const keyCode = e.keyCode || e.which;
    if(e.key === 'Enter' || keyCode==='13') {
      console.log('Searching! for ' + this.state.searchTerm);
      if (this.state.searchTerm === '') {
        this.setState({searchTerm: '_'});
      }
      console.log('Searching! for ' + this.state.searchTerm);
      this.props.getSearch(this.state.searchTerm);
      this.setState({redirectToReferrer2: true});
    }
  }
  updateSearch = (evt) => {
    this.setState({searchTerm: evt.target.value});
  }

  componentDidMount = () => {
    console.log("componentDidMount, state: " + this.state.redirectToReferrer2);
    this.setState({redirectToReferrer2: false});    
  }

  render() {
    const { from } = { from: { pathname: `/searchresult/${this.state.searchTerm}` } }
    const { redirectToReferrer2 } = this.state;

    if (redirectToReferrer2) {
      // this.componentDidMount();
      // this.setState({redirectToReferrer2: false});
      //in capsule component, there's a func called componentDidMount that goes outside of render. set it to false in that function
      return (
        <Redirect to={from} />
        
      )
    }
    return (
    <div className='search'>
        <div className='search'>
          <input
            type="text"
            placeholder="Search.."
            onKeyPress={this.handleKeyPress}
            value={this.state.searchTerm}
            onChange={evt => this.updateSearch(evt)}
            />
        </div>
    </div>
    );
  }
};