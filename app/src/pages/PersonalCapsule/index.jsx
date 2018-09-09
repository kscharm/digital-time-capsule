import React, { Component } from 'react';
import AddButton from '../../components/AddButton';
import Background from '../../images/cork.jpg';
import './style.css';
import {
  FaCamera,
  FaMusic,
  FaFont,
  FaQuoteLeft,
} from 'react-icons/fa';
import NavBar from '../../components/NavBar';

const Add = (props) => {
  let contents = [];
  let icon = '';
  if (props.options) {
    contents = props.options.map(option => {
      if (option==='Photo') {
        icon = <FaCamera/>
      } else if (option==='Text') {
        icon = <FaFont/>
      } else if (option==='Quote') {
        icon = <FaQuoteLeft/>
      } else if (option==='Music') {
        icon = <FaMusic/>
      }
      return (
        <div key={option}>
          <span className="menuItem" key={option}>{icon} {option}</span>
        </div>
      );
    });
  }

  return (
      <div>
        {contents}
      </div>
  );
}

export default class PersonalCapsule extends Component {
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
      <div id='capsulePage'>
        <div className='capsuleDiv' style={{background: `url(${Background})`, backgroundSize:'cover'}} >
          <div className='addButton'>
            <AddButton
              buttonAction={() => { this.handlePop(!this.state.addPop) }}
              buttonType='add'
            />
            <div className='addPop'  style={this.state.addPop ? {display: 'block'} : {display: 'none'}}>
              {this.state.addPop ? <Add options={['Photo', 'Text', 'Quote', 'Music']} /> : null }
            </div>
          </div>
        </div>
        <NavBar handlePop={this.handlePop} addPop={this.state.addPop} />
      </div>
    );
  };
}