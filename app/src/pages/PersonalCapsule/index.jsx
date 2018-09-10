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
import AddPhoto from '../../components/Cards/AddPhoto';
import AddText from '../../components/Cards/AddText';

export default class PersonalCapsule extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    addPop: false,
    showAddPhoto: false,
    showAddText: false,
  }

  handlePop = (pop) => {
    this.setState({addPop: pop});
  }
  handleShowAddPhoto = (show) => {
    this.setState({showAddPhoto: show});
  }
  handleShowAddText = (show) => {
    this.setState({showAddText: show});
  }

  render() {

    const Add = (props) => {
      let contents = [];
      let icon = '';
      let onClicks = () => {};
      if (props.options) {
        contents = props.options.map(option => {
          if (option==='Photo') {
            icon = <FaCamera/>
            onClicks = () => {
              this.handleShowAddPhoto(!this.state.showAddPhoto);
              this.handlePop(false);
              console.log('ADDING PHOTO!!!!');
            }
          } else if (option==='Text') {
            icon = <FaFont/>
            onClicks = () => {
              this.handleShowAddText(!this.state.showAddText);
              this.handlePop(false);
              console.log('mom else');
            };
          } else if (option==='Quote') {
            icon = <FaQuoteLeft/>
            onClicks = () => {console.log('your else')};
          } else if (option==='Music') {
            icon = <FaMusic/>
            onClicks = () => {console.log('dumb else')};
          }
          return (
            <div key={option}>
              <span onClick={onClicks} className="menuItem" key={option}>{icon} {option}</span>
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
        {this.state.showAddPhoto ? <AddPhoto handleShowAddPhoto={this.handleShowAddPhoto}/> : null}
        {this.state.showAddText ? <AddText handleShowAddText={this.handleShowAddText}/> : null}
      </div>
    );
  };
}