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
import AddQuote from '../../components/Cards/AddQuote';
import AddMusic from '../../components/Cards/AddMusic';

import Draggable from 'react-draggable';
import addPhotoBase from '../../images/addPhoto.png'

import '../../components/MusicPlayer';
import MusicPlayer from '../../components/MusicPlayer';

export default class PersonalCapsule extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    addPop: false,
    showAddPhoto: false,
    showAddText: false,
    showAddQuote: false,
    showAddMusic: false,
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
  handleShowAddQuote = (show) => {
    this.setState({showAddQuote: show});
  }
  handleShowAddMusic = (show) => {
    this.setState({showAddMusic: show});
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
            onClicks = () => {
              this.handleShowAddQuote(!this.state.showAddQuote);
              this.handlePop(false);
              console.log('your else');
            };
          } else if (option==='Music') {
            icon = <FaMusic/>
            onClicks = () => {
              this.handleShowAddMusic(!this.state.showAddMusic);
              this.handlePop(false);
              console.log('dumb else')
            };
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
          <div className='photoSpace' style={{top: '50px', bottom: '5px', position: 'absolute', width: '100%'}}>
            <Draggable
              bounds="parent"
              handle=".handle"
              defaultPosition={{x: 0, y: 100}}
              position={null}
              onStart={this.handleStart}
              onDrag={this.handleDrag}
              onStop={this.handleStop}
              >
              <div style={{display: 'inline-block'}}>
                <div className="handle">Imagine that this is the frame.</div>
                <img className="tempPhoto" src={addPhotoBase} alt="temp photo"></img>
              </div>
            </Draggable>
            <div className='musicPlayers' style={{display: 'inline-block'}}>
              <MusicPlayer/>
            </div>
          </div>

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
        {this.state.showAddQuote ? <AddQuote handleShowAddQuote={this.handleShowAddQuote}/> : null}
        {this.state.showAddMusic ? <AddMusic handleShowAddMusic={this.handleShowAddMusic}/> : null}
      </div>
    );
  };
}