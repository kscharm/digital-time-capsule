import React, { Component } from 'react';
import OurButton from '../../OurButton';
import Select from '../../Select';

import DropzoneComponent from 'react-dropzone-component';
import '../../../../node_modules/react-dropzone-component/styles/filepicker.css';
import '../../../../node_modules/dropzone/dist/min/dropzone.min.css';

import './style.css';
import '../generic.css'

import axios from 'axios'
import uuidv4 from 'uuid/v4'

export default class AddMusic extends Component {
//   constructor(props) {
//     super(props);
//   }

  state = {
    filePop: false,
    file: "",
    fileGenre: "",
    fileName: "",
  }

  saveMusic = () => {
    // Save music to database
    if (this.state.file !== "") {
        axios.post('http://localhost:3001/music', {
            _id: uuidv4(),
            music: this.state.file,
            title: this.state.fileName,
            username: "kenny",
            capsules: ["myCapsule"],
            genre: this.state.fileGenre,
            settings: {
                privacy: "public"
            },
            metadata: {
                x: 1,
                y: 1
            }
        })
        .then((res) => {
            this.closeAddMusic();
            this.props.handleAddMusic(res.data);
        })
        .catch((err) => {
           alert('Error saving music: ' + err.message);
        });
    } else {
        alert('Please select a song first');
    }
  }

  closeAddMusic = () => {
    this.props.handleShowAddMusic(false);
  }

  updateFileGenre = (evt) => {
      this.setState({fileGenre: evt.target.value})
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
        uploadMultiple: false,
    };
    const eventHandlers = {
        init: (dropzone) => { this.dropzone = dropzone; },
        maxfilesexceeded: (file) => { this.dropzone.removeFile(file); },
        addedfile: (file) => {
            if (file.type === 'audio/mp3') {
                this.setState({ fileName: file.name });
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    this.setState({file: reader.result});
                }
            } else {
                this.dropzone.removeFile(file);
            }
        },
        removedfile: (file) => { this.setState({file: ""}) },
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
            <span className='sectionLabels'> Genre: </span>
            <input 
                value={this.state.fileGenre}
                className='caption'
                placeholder='Genre...'
                style={{marginBottom: '1em'}}
                onChange={evt => this.updateFileGenre(evt)}
            />
            <span className='sectionLabels'> Playlist: </span>
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