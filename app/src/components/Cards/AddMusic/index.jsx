import React, { Component } from 'react';
import './style.css';
import '../generic.css'
import '../../OurButton';
import OurButton from '../../OurButton';
import Select from '../../Select';

import DropzoneComponent from 'react-dropzone-component';
import '../../../../node_modules/react-dropzone-component/styles/filepicker.css';
import '../../../../node_modules/dropzone/dist/min/dropzone.min.css';

import axios from 'axios'

export default class AddMusic extends Component {
//   constructor(props) {
//     super(props);
//   }

  state = {
    filePop: false,
    files: [],
  }

  saveMusic = () => {
    // Save music to database
    if (this.state.files.length !== 0) {
        axios.post('http://localhost:3001/music', {
            musicFiles: this.state.files,
            username: "kenny",
            mediaId: "abc123",
            capsules: ["myCapsule"],
            title: "bestSongEver",
            settings: {
                privacy: "public"
            },
            metadata: {
                x: null,
                y: null
            }
        })
        .then((res) => {
            // Close window
            this.closeAddMusic();
        })
        .catch((err) => {
            console.log('Error saving music: ', err.message);
        });
    } else {
        console.log('Please select a song first');
    }
  }

  closeAddMusic = () => {
    this.props.handleShowAddMusic(false);
  }

  render() {
    const componentConfig = {
        iconFiletypes: ['.mp3'],
        allowedFiletypes: ['.mp3'],
        showFiletypeIcon: true,
        postUrl: 'no-url',
    };
    const djsConfig = {
        maxFiles: 1,
        addRemoveLinks: true,
        autoProcessQueue: false,
    };
    const eventHandlers = {
        init: (dropzone) => { this.dropzone = dropzone; },
        maxfilesexceeded: (file) => { this.dropzone.removeFile(file); },
        addedfile: (file) => { this.state.files.push(file.upload); },
        removedfile: (file) => { this.state.files.shift(); }
    };

    return (
    <div className={ `addType addMusic` }>
        <div className={ `addTypeBack addMusicBack` }/>
        <div className={ `addTypeCard addMusicCard` }>
            {/* <span className='sectionLabels'> Add Photo: </span> */}
            <div className='music'>
                <div className="dropzone">
                    <DropzoneComponent
                        config={componentConfig}
                        djsConfig={djsConfig}
                        eventHandlers={eventHandlers}
                    />
                </div>
            </div>
            <span className='sectionLabels'> Music Title: </span>
            <input className='caption' placeholder='Title...' style={{marginBottom: '1em'}}/>
            <span className='sectionLabels'> Choose Playlist: </span>
            <Select choose={'Choose Playlist'} options={['Playlist 1', 'Playlist 2']} />
            <div className={ `actionButtons actionButtonsMusic` }>
                <OurButton
                    buttonText='Add'
                    buttonAction={() => {this.saveMusic()}}
                    buttonType='primary'
                />
                <OurButton
                    buttonText='Cancel'
                    buttonAction={() => {this.closeAddMusic()}}
                    buttonType='secondary'
                />
            </div>
        </div>
    </div>
    );
  };
}