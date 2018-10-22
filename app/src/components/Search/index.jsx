import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './style.css';

import {
  Link,
} from 'react-router-dom';

import { 
  FaSearch,
} from 'react-icons/fa';

export default class Search extends Component {
  state = {
    redirectToReferrer2: false,
  }

  handleKeyPress = (e) => {
    const keyCode = e.keyCode || e.which;
    if(e.key === 'Enter' || keyCode==='13') {
      console.log('Searching!');
      this.setState({redirectToReferrer2: true});
    }
  }

  render() {
    const { from } = { from: { pathname: '/searchresult' } }
    const { redirectToReferrer2 } = this.state;

    if (redirectToReferrer2) {
      return (
        <Redirect to={from} />
      )
    }
    return (
    <div className='search'>
        <div className='search'>
          <input type="text" placeholder="Search.." onKeyPress={this.handleKeyPress}/>
          {/* <Link to="/searchresult" style={{color: 'white'}}>
            <FaSearch className='searchIcon' onClick={() => {console.log("redirecting to search results");}}></FaSearch>
          </Link> */}
        </div>
    </div>
    );
  }
};