import React, { Component } from 'react';
import AddButton from '../../components/AddButton';
import DeleteButton from '../../components/DeleteButton';
import Background from '../../images/cork.jpg';
import './style.css';
import {
  FaCamera,
  FaMusic,
  FaFont,
  FaQuoteLeft,
  FaUser,
} from 'react-icons/fa';
import NavBar from '../../components/NavBar';
import AddPhoto from '../../components/Cards/AddPhoto';
import AddText from '../../components/Cards/AddText';
import AddQuote from '../../components/Cards/AddQuote';
import AddMusic from '../../components/Cards/AddMusic';
import EditUser from '../../components/Cards/EditUser';
import OurButton from '../../components/OurButton';

import MusicPlayer from '../../components/MusicPlayer';
import PhotoDisplay from '../../components/PhotoDisplay';
import TextDisplay from '../../components/TextDisplay';
import QuoteDisplay from '../../components/QuoteDisplay';

import axios from 'axios';

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
    showDelete: false,
    thisCapsuleID: '',
    isOwner: false,
    isContributer: false,
    contributorList: [],
    showEditUser: false,
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
  handleShowEditUser = (show) => {
    this.setState({showEditUser: show});
  }
  handleShowDelete = (show) => {
    this.setState({showDelete: show});
  }

  handleAddMusic = (music) => {
    // Update personal capsule to have the new music that was added.
    const musicWithNew = this.state.musicList.concat(music);
    this.setState({musicList: musicWithNew});
  }
  handleDeleteMusic = (music) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${music.title}?`);
    if (confirmed) {
      const index = this.state.musicList.indexOf(music);
      if (index > -1) {
        axios.post('http://localhost:3001/deleteMusic', {
          musicId: music._id,
          capsuleId: this.props.capsule
        })
        .then((res) => {
          let musicWithOut = this.state.musicList;
          musicWithOut.splice(index, 1);
          this.setState({musicList: musicWithOut});
        })
        .catch((err) => {
            alert('Error deleting music: ' + err.message);
        });
      } else {
        console.log('Error deleting music: this music does not exist.');
      }
    } else {
      console.log('Music was not deleted.');
    }
  }
  handleUpdateMusic = (x, y, music) => {
    axios.post('http://localhost:3001/updateMusic', {
      _id: music._id,
      metadata: {
          x,
          y
      }
    })
    .then((res) => {
        console.log('Update successful!');
    })
    .catch((err) => {
      alert('Error updating music: ' + err.message);
    });
  }
  handleAddPhoto = (photo) => {
    // Update personal capsule to have the new photo that was added.
    const photoWithNew = this.state.photoList.concat(photo);
    this.setState({photoList: photoWithNew});
  }
  handleDeletePhoto = (photo) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${photo.title}?`);
    if (confirmed) {
      const index = this.state.photoList.indexOf(photo);
      if (index > -1) {
        axios.post('http://localhost:3001/deletePhoto', {
          photoId: photo._id,
          capsuleId: this.props.capsule
        })
        .then((res) => {
          let photoWithOut = this.state.photoList;
          photoWithOut.splice(index, 1);
          this.setState({photoList: photoWithOut});
        })
        .catch((err) => {
            alert('Error deleting photo: ' + err.message);
        });
      } else {
        console.log('Error deleting photo: this photo does not exist.');
      }
    } else {
      console.log('Photo was not deleted.');
    }
  }
  handleUpdatePhoto = (x, y, photo) => {
    axios.post('http://localhost:3001/updatePhoto', {
      _id: photo._id,
      metadata: {
          x,
          y
      }
    })
    .then((res) => {
        console.log('Update successful!');
    })
    .catch((err) => {
      alert('Error updating photo: ' + err.message);
    });
  }
  handleAddText = (text) => {
    // Update personal capsule to have the new text that was added.
    const textWithNew = this.state.textList.concat(text);
    this.setState({textList: textWithNew});
  }
  handleDeleteText = (text) => {
    const confirmed = window.confirm(`Are you sure you want to delete this text?`);
    if (confirmed) {
      const index = this.state.textList.indexOf(text);
      if (index > -1) {
        axios.post('http://localhost:3001/deleteText', {
          textId: text._id,
          capsuleId: this.props.capsule
        })
        .then((res) => {
          let textWithOut = this.state.textList;
          textWithOut.splice(index, 1);
          this.setState({textList: textWithOut});
        })
        .catch((err) => {
            alert('Error deleting text: ' + err.message);
        });
      } else {
        console.log('Error deleting text: this text does not exist.');
      }
    } else {
      console.log('Text was not deleted.');
    }
  }
  handleUpdateText = (x, y, text) => {
    axios.post('http://localhost:3001/updateText', {
      _id: text._id,
      metadata: {
          x,
          y
      }
    })
    .then((res) => {
        console.log('Update successful!');
    })
    .catch((err) => {
      alert('Error updating text: ' + err.message);
    });
  }
  handleAddQuote = (quote) => {
    // Update personal capsule to have the new text that was added.
    const quoteWithNew = this.state.quoteList.concat(quote);
    this.setState({quoteList: quoteWithNew});
  }
  handleDeleteQuote = (quote) => {
    const confirmed = window.confirm(`Are you sure you want to delete this quote?`);
    if (confirmed) {
      const index = this.state.quoteList.indexOf(quote);
      if (index > -1) {
        axios.post('http://localhost:3001/deleteText', {
          quoteId: quote._id,
          capsuleId: this.props.capsule
        })
        .then((res) => {
          let quoteWithOut = this.state.quoteList;
          quoteWithOut.splice(index, 1);
          this.setState({quoteList: quoteWithOut});
        })
        .catch((err) => {
            alert('Error deleting text: ' + err.message);
        });
      } else {
        console.log('Error deleting quote: this quote does not exist.');
      }
    } else {
      console.log('Quote was not deleted.');
    }
  }
  handleUpdateQuote = (x, y, quote) => {
    axios.post('http://localhost:3001/updateText', {
      _id: quote._id,
      metadata: {
          x,
          y
      }
    })
    .then((res) => {
        console.log('Update successful!');
    })
    .catch((err) => {
      alert('Error updating quote: ' + err.message);
    });
  }

  getAllMedia = (capsule) => {
    axios.get('http://localhost:3001/getMedia?_id=' + this.props.capsule)
      .then((res) => {
        // Add each type to their respective arrays
        console.log(res);
        this.setState({quoteList: res.data.quotes});
        this.setState({photoList: res.data.photos});
        this.setState({textList: res.data.text});
        this.setState({musicList: res.data.music});
      })
      .catch((err) => {
          alert('Error getting media: ' + err.message);
      });
  }
  checkCapsuleOwner = (capsuleId, id) => {
    axios.get('http://localhost:3001/capsuleOwner?capsule=' + capsuleId)
      .then((res) => {
        // Add each type to their respective arrays
        console.log(res.data);
        if (res.data === id) {
          this.setState({isOwner: true});
        }
      })
      .catch((err) => {
          alert('Error getting media: ' + err.message);
      });
  }
  checkCapsuleContributer = (capsuleId, user) => {
    axios.get('http://localhost:3001/capsuleContributors?capsule=' + capsuleId)
      .then((res) => {
        // Add each type to their respective arrays
        console.log(res.data);
        this.setState({contributorList: res.data});
        for (let i = 0; i < res.data.length; i ++) {
          if (res.data[i] === user) {
            this.setState({isContributer: true});
            break;
          }
        }
      })
      .catch((err) => {
          alert('Error getting media: ' + err.message);
      });
  }
  handleAddUser = (user) => {
    const contribWithNew = this.state.contributorList.concat(user);
    this.setState({contributorList: contribWithNew});
  }
  handleDeleteUser = (user) => {
    const index = this.state.contributorList.indexOf(user);
    let contribWithOut = this.state.contributorList;
    contribWithOut.splice(index, 1);
    this.setState({contributorList: contribWithOut});
  }
  requestCapsuleAccess = () => {
    console.log('Capsule:' + this.props.capsule);
    axios.post('http://localhost:3001/requestAccess', {
            capsuleId: this.props.capsule,
            username: this.props.user
        })
        .then((res) => {
            console.log(res.data);
            alert('Your request was sent!');
        })
        .catch((err) => {
            alert('Error requesting access to time capsule: ' + err.message);
        });
  }
  componentDidMount = () => {
    this.getAllMedia(this.props.capsule);
    this.checkCapsuleOwner(this.props.capsule,this.props.userID);
    this.checkCapsuleContributer(this.props.capsule,this.props.user);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.capsule !== this.props.capsule) {
      this.getAllMedia(this.props.capsule);
      this.checkCapsuleOwner(this.props.capsule,this.props.userID);
      this.checkCapsuleContributer(this.props.capsule,this.props.user);
    }
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
          } else if (option==='Edit Users') {
            icon = <FaUser/>
            onClicks = () => {
              this.handleShowEditUser(!this.state.showEditUser);
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
                      caption={photo.caption}
                      frame={photo.frame}
                      title={photo.title}
                      photo={photo.photo}
                      style={{display:'inline-block'}}
                      key={photo.photo}
                      photoObj={photo}
                      handleDeletePhoto={this.handleDeletePhoto}
                      showDelete={this.state.showDelete}
                      handleUpdatePhoto={this.handleUpdatePhoto}
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
                    music={music}
                    handleDeleteMusic={this.handleDeleteMusic}
                    showDelete={this.state.showDelete}
                    handleUpdateMusic={this.handleUpdateMusic}
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
                      frame={text.frame}
                      handleDeleteText={this.handleDeleteText}
                      textObj={text}
                      showDelete={this.state.showDelete}
                      handleUpdateText={this.handleUpdateText}
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
                      handleDeleteQuote={this.handleDeleteQuote}
                      quoteObj={quote}
                      showDelete={this.state.showDelete}
                      handleUpdateQuote={this.handleUpdateQuote}
                  />
              )
            })}
            </div>
          {this.state.isContributer ? 
            <div className='addButton'>
              <AddButton
                buttonAction={() => { this.handlePop(!this.state.addPop) }}
                buttonType='add'
              />
              <div className='addPop'  style={this.state.addPop ? {display: 'block'} : {display: 'none'}}>
                {(this.state.addPop && this.state.isContributer) ? <Add options={['Photo', 'Text', 'Quote', 'Music', 'Edit Users']} /> : null }
                {(this.state.addPop && !this.state.isOwner) ? <Add options={['Photo', 'Text', 'Quote', 'Music']} /> : null }
              </div>
            </div>
            :
            null
          }
          {this.state.isContributer ?
            <div className='deleteButton'>
              <DeleteButton
                buttonAction={() => { this.handleShowDelete(!this.state.showDelete) }}
                buttonType='delete'
              />
            </div>
            :
            <div className='requestAdd'>
              <OurButton
                  buttonAction={() => { this.requestCapsuleAccess() }}
                  buttonType='primary'
                  buttonText='Join Capsule'
              />
            </div>
          }
        </div>
        <NavBar handlePop={this.handlePop} addPop={this.state.addPop} getSearch={this.props.getSearch}
                user={this.props.user} capsule={this.props.usercapsule}
                changeCapsuleID={this.props.changeCapsuleID} inCapsule={true}
                userID={this.props.userID}/>
        {this.state.showAddPhoto ? <AddPhoto 
                                      handleShowAddPhoto={this.handleShowAddPhoto}
                                      handleAddPhoto={this.handleAddPhoto}
                                      user={this.props.user}
                                      capsule={this.props.capsule}/> : null}
        {this.state.showAddText ? <AddText 
                                      handleShowAddText={this.handleShowAddText}
                                      handleAddText={this.handleAddText}
                                      user={this.props.user}
                                      capsule={this.props.capsule}/> : null}
        {this.state.showAddQuote ? <AddQuote
                                      handleShowAddQuote={this.handleShowAddQuote}
                                      handleAddQuote={this.handleAddQuote}
                                      user={this.props.user}
                                      capsule={this.props.capsule}/> : null}
        {this.state.showAddMusic ? <AddMusic 
                                      handleShowAddMusic={this.handleShowAddMusic}
                                      handleAddMusic={this.handleAddMusic}
                                      user={this.props.user}
                                      capsule={this.props.capsule}/> : null}
        {this.state.showEditUser ? <EditUser 
                                      handleShowEditUser={this.handleShowEditUser}
                                      user={this.props.user}
                                      contributorList={this.state.contributorList}
                                      capsule={this.props.capsule}
                                      handleAddUser={this.handleAddUser}
                                      handleDeleteUser={this.handleDeleteUser}/> : null}
      </div>
    );
  };
}