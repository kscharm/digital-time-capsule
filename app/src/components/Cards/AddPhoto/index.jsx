import React, { Component } from 'react';
import './style.css';
import '../generic.css'
import '../../OurButton';
import addPhotoBase from '../../../images/addPhoto.png'
import OurButton from '../../OurButton';
import axios from 'axios';
import uuidv4 from 'uuid/v4'

import DropzoneComponent from 'react-dropzone-component';
import '../../../../node_modules/react-dropzone-component/styles/filepicker.css';
import '../../../../node_modules/dropzone/dist/min/dropzone.min.css';

export default class AddPhoto extends Component {
//   constructor(props) {
//     super(props);
//   }

  state = {
    filePop: false,
    file: '',
    fileName: '',
    fileCaption: '',
    frame: '',
  }

  savePhoto = () => {
    if (this.state.file !== '') {
        axios.post('http://localhost:3001/addPhoto', {
            _id: uuidv4(),
            photo: this.state.file,
            frame: this.state.frame,
            title: this.state.fileName,
            username: 'kenny',
            capsules: ["myCapsule"],
            caption: this.state.fileCaption,
            settings: {
                privacy: "public"
            },
            metadata: {
                x: 0,
                y: 0
            }
        })
        .then((res) => {
            this.closeAddPhoto();
            this.props.handleAddPhoto(res.data);
        })
        .catch((err) => {
            alert('Error saving photo: ' + err.message);
        });
    } else {
        alert('Please select a photo first');
    }
      this.closeAddPhoto();
  }
  closeAddPhoto = () => {
    this.props.handleShowAddPhoto(false);
  }

  updateFileCaption = (evt) => {
    this.setState({fileCaption: evt.target.value});
  }
  updateFrame = (frame) => {
      this.setState({frame: frame});
      console.log(frame);
  }

  render() {
    const componentConfig = {
        iconFiletypes: ['.jpg', '.png', '.gif'],
        allowedFiletypes: ['.jpg', '.png', '.gif'],
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
        maxfilesexceeded: (file) => { this.dropzone.removeFile(file) },
        addedfile: (file) => {
            if (file.type === 'image/jpeg' || file.type === 'image/png') {
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
        removedfile: (file) => { this.setState({file: ""}) }
    }

    return (
    <div className={ `addType addPhoto` }>
        <div className={ `addTypeBack addPhotoBack` }/>
        <div className={ `addTypeCard addPhotoCard` }>
            {/* <span className='sectionLabels'> Add Photo: </span> */}
            <div className='photoThing'>
                <div className="dropzone">
                <DropzoneComponent
                    config={componentConfig}
                    djsConfig={djsConfig}
                    eventHandlers={eventHandlers}
                />
                </div>
            </div>
            <span className='sectionLabels'> Add Caption: </span>
            <input 
                className='caption'
                placeholder='Caption...' 
                style={{marginBottom: '1em'}}
                value={this.state.fileCaption}
                onChange={evt => this.updateFileCaption(evt)}
            />
            <span className='sectionLabels'> Choose Frame: </span>
            <div>
                <img className="frameImg" src={addPhotoBase} alt="" onClick={() => this.updateFrame('basicFrame')}/>
                <img className="frameImg" src={addPhotoBase} alt="" onClick={() => this.updateFrame('polarFrame')}/>
                <img className="frameImg" src={addPhotoBase} alt="" onClick={() => this.updateFrame('blackFrame')}/>
            </div>
            <div className={ `actionButtons actionButtonsPhoto` }>
                <OurButton
                    buttonText='Add'
                    buttonAction={() => {this.savePhoto()}}
                    buttonType='primary'
                />
                <OurButton
                    buttonText='Cancel'
                    buttonAction={() => {this.closeAddPhoto()}}
                    buttonType='secondary'
                />
            </div>
        </div>
    </div>
    );
  };
}