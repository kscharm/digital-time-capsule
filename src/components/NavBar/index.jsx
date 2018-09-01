import React from 'react';
import './style.css';
import Search from '../Search'
import { FaBeer } from 'react-icons/fa';

const NavBar = (props) => {
  return (
    <div className='navBar'>
        <div className='search'>
            <Search />
            <FaBeer/>
        </div>
    </div>
  );
};

export default NavBar;