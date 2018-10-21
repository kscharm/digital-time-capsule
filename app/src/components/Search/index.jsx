import React from 'react';
import './style.css';

import {
  Link,
} from 'react-router-dom';

import { 
  FaSearch,
} from 'react-icons/fa';

const Search = (props) => {

  return (
    <div className='search'>
        <div className='search'>
          <input type="text" placeholder="Search.."/>
          <Link to="/searchresult" style={{color: 'white'}}>
            <FaSearch className='searchIcon' onClick={() => {console.log("redirecting to search results");}}></FaSearch>
          </Link>
        </div>
    </div>
  );
};

export default Search;