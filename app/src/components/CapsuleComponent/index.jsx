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
import AddCapsule from '../../components/Cards/AddCapsule';

import MusicPlayer from '../../components/MusicPlayer';
import PhotoDisplay from '../../components/PhotoDisplay';
import TextDisplay from '../../components/TextDisplay';
import QuoteDisplay from '../../components/QuoteDisplay';
import OurButton from '../OurButton';

export default class CapsuleComponent extends Component {
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
    photoList: [],
    textList: [],
    quoteList: [],
    showAddCapsule: false,
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

  getAllMusic = () => {
    // Get and display the music for the user
    console.log('I will get all musics for ' + this.props.user);
    console.log('and for this capsule which is ' + this.props.capsule);
  }
  handleAddMusic = (music) => {
    // Update personal capsule to have the new music that was added.
    const musicWithNew = this.state.musicList.concat(music);
    this.setState({musicList: musicWithNew});
  }
  getAllPhotos = () => {
    // Get and display the photo for the user
    console.log('I will get all photos for ' + this.props.user);
    console.log('and for this capsule which is ' + this.props.capsule);
  }
  handleAddPhoto = (photo) => {
    // Update personal capsule to have the new photo that was added.
    const photoWithNew = this.state.photoList.concat(photo);
    this.setState({photoList: photoWithNew});
  }
  getAllText = (user) => {
    // Get and display the photo for the user
    console.log('I will get all text for ' + user);
  }
  handleAddText = (text) => {
    // Update personal capsule to have the new text that was added.
    const textWithNew = this.state.textList.concat(text);
    this.setState({textList: textWithNew});
  }
  getAllQuotes = (user) => {
    // Get and display the photo for the user
    console.log('I will get all text for ' + user);
  }
  handleAddQuote = (quote) => {
    // Update personal capsule to have the new text that was added.
    const quoteWithNew = this.state.quoteList.concat(quote);
    this.setState({quoteList: quoteWithNew});
  }

  handleShowAddCapsule = (show) => {
      this.setState({showAddCapsule: show});
  }
  handleAddCapsule = () => {
    console.log('handled add capsule');
  }

  componentDidMount() {
    // When the component has loaded for the first time
    // Show user data
    this.getAllMusic();
    this.getAllPhotos();
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
            }
          } else if (option==='Text') {
            icon = <FaFont/>
            onClicks = () => {
              this.handleShowAddText(!this.state.showAddText);
              this.handlePop(false);
            };
          } else if (option==='Quote') {
            icon = <FaQuoteLeft/>
            onClicks = () => {
              this.handleShowAddQuote(!this.state.showAddQuote);
              this.handlePop(false);
            };
          } else if (option==='Music') {
            icon = <FaMusic/>
            onClicks = () => {
              this.handleShowAddMusic(!this.state.showAddMusic);
              this.handlePop(false);
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
        <div className='capsuleDiv' style={{background: `url(${Background})`, overflow:'auto'}} >
            <div style={{height:'50px'}}/>
            <div style={{fontSize: '100px'}}> {this.props.message} </div>
            <div>
            {this.state.photoList.map((photo) => {
                return (
                  <PhotoDisplay
                      xPos={photo.metadata.x}
                      yPos={photo.metadata.y}
                      genre={photo.caption}
                      title={photo.title}
                      photo={photo.photo}
                      style={{display:'inline-block'}}
                      key={photo.photo}
                  />
              )
            })}
            {this.state.musicList.map((music) => {
              return (
                <MusicPlayer
                    xPos={music.metadata.x}
                    yPos={music.metadata.y}
                    genre={music.genre}
                    title={music.title}
                    song={music.music}
                    style={{display:'inline-block'}}
                    key={music.music}
                />
            )
            })}
            {this.state.textList.map((text) => {
                return (
                  <TextDisplay
                      xPos={text.metadata.x}
                      yPos={text.metadata.y}
                      text={text.text}
                      style={{display:'inline-block'}}
                      key={text.text}
                  />
              )
            })}
            {this.state.quoteList.map((quote) => {
                return (
                  <QuoteDisplay
                      xPos={quote.metadata.x}
                      yPos={quote.metadata.y}
                      author={quote.author}
                      text={quote.text}
                      style={{display:'inline-block'}}
                      key={quote.text}
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
          <div className='tempAddCapsule'>
            <OurButton
                buttonText='ADD CAPSULE'
                buttonAction={() => {this.handleShowAddCapsule(true)}}
                buttonType='secondary'
            />
          </div>
        </div>
        <NavBar handlePop={this.handlePop} addPop={this.state.addPop} />
        {this.state.showAddPhoto ? <AddPhoto 
                                      handleShowAddPhoto={this.handleShowAddPhoto}
                                      handleAddPhoto={this.handleAddPhoto}/> : null}
        {this.state.showAddText ? <AddText 
                                      handleShowAddText={this.handleShowAddText}
                                      handleAddText={this.handleAddText}/> : null}
        {this.state.showAddQuote ? <AddQuote
                                      handleShowAddQuote={this.handleShowAddQuote}
                                      handleAddQuote={this.handleAddQuote}/> : null}
        {this.state.showAddMusic ? <AddMusic 
                                      handleShowAddMusic={this.handleShowAddMusic}
                                      handleAddMusic={this.handleAddMusic}/> : null}
        {this.state.showAddCapsule ? <AddCapsule
                                        handleShowAddCapsule={this.handleShowAddCapsule}
                                        handleAddCapsule={this.handleAddCapsule}
                                        user={this.props.user}/> : null}
      </div>
    );
  };
}