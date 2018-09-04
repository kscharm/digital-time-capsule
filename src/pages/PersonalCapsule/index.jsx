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
        <div>
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
  constructor(props) {
    super(props);
  }

  state = {
    addPop: false,
  }

  handlePop = () => {
    this.setState({addPop: !this.state.addPop});
  }

  render() {

    return (
      <div id='capsulePage'>
        <div className='capsuleDiv' style={{background: `url(${Background})`, backgroundSize:'cover'}} >
          <div className='addButton'>
            <AddButton
              buttonAction={() => { this.handlePop() }}
              buttonType='add'
            />
            <div className='addPop'>
              {this.state.addPop ? <Add options={['Photo', 'Text', 'Quote', 'Music']} /> : null }
            </div>
          </div>
        </div>
      </div>
    );
  };
}