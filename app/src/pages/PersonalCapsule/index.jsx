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
    musicList: [],
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

  getAllMusic = (user) => {
    // Get and display the music for the user
    console.log('I will get all musics for ' + user);
  }

  handleAddMusic = (music) => {
    // Update personal capsule to have the new music that was added.
    console.log('I will handle your ' + music);
    const musicWithNew = this.state.musicList.concat(music);
    this.setState({musicList: musicWithNew});
  }

  componentDidMount() {
    const user = 'kenny'
    // When the component has loaded for the first time
    // Show user data
    this.getAllMusic(user);
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

    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    console.log(w);
    return (
      <div id='capsulePage'>
        <div className='capsuleDiv' style={{background: `url(${Background})`, overflow:'auto'}} >
            <Draggable
              bounds= {{left: 0, top: 50, right: (w - 256)}}
              handle=".handle"
              defaultPosition={{x: 0, y: 100}}
              position={null}
              onStart={this.handleStart}
              onDrag={this.handleDrag}
              onStop={this.handleStop}
              >
              <div style={{ width: '256px', height: '356px'}} >
                <div className="handle">Imagine that this is the frame.</div>
                <img className="tempPhoto" src={addPhotoBase} alt="temp photo"></img>
              </div>
            </Draggable>
            <div className='musicPlayers' style={{display:'inline-block'}}>
              <MusicPlayer xPos={0} yPos={0} />
              {this.state.musicList.map((music) => {
                return (
                    <MusicPlayer
                        xPos={music.metadata.x}
                        yPos={music.metadata.y}
                        genre={music.genre}
                        title={music.title}
                        song={music.music}
                    />
                )
            })}
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
        {this.state.showAddMusic ? <AddMusic 
                                      handleShowAddMusic={this.handleShowAddMusic}
                                      handleAddMusic={this.handleAddMusic}/> : null}
      </div>
    );
  };
}