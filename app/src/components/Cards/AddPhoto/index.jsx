import React, { Component } from 'react';
import './style.css';
import '../generic.css'
import '../../OurButton';
import addPhotoBase from '../../../images/addPhoto.png'
import OurButton from '../../OurButton';
import axios from 'axios';

import DropzoneComponent from 'react-dropzone-component';
import '../../../../node_modules/react-dropzone-component/styles/filepicker.css';
import '../../../../node_modules/dropzone/dist/min/dropzone.min.css';

export default class AddPhoto extends Component {
//   constructor(props) {
//     super(props);
//   }

  state = {
    filePop: false,
    file: "",
    fileName: ""
  }

  savePhoto = () => {
    if (this.state.file != '') {
        console.log(this.state);
        axios.post('http://localhost:3001/photo', {
            photo: this.state.file,
            title: this.state.fileName,
            username: "kenny",
            mediaId: "abc123",
            capsules: ["myCapsule"],
            caption: "hello",
            settings: {
                privacy: "public"
            },
            metadata: {
                x: 0,
                y: 0
            }
        })
        .then((res) => {
            console.log(res.data);
            this.closeAddPhoto();
        })
        .catch((err) => {
           alert('Error saving music: ', err.message);
        });
    } else {
        console.log(this.state);
        alert('Please select a song first');
    }
      this.closeAddPhoto();
  }
  closeAddPhoto = () => {
    this.props.handleShowAddPhoto(false);
  }

  render() {
    const componentConfig = {
        iconFiletypes: ['.jpg', '.png', '.gif'],
        allowedFiletypes: ['.jpg', '.png', '.gif'],
        showFiletypeIcon: true,
        postUrl: '/uploadHandler',
    };
    const djsConfig = {
        maxFiles: 1,
        addRemoveLinks: true,
    };
    const eventHandlers = {
        init: (dropzone) => { this.dropzone = dropzone; },
        maxfilesexceeded: (file) => { this.dropzone.removeFile(file) },
        addedfile: (file) => {
            console.log(file.type);
            if (file.type === 'image/jpeg') {
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
            <div className='photo'>
                <div className="dropzone">
                <DropzoneComponent
                    config={componentConfig}
                    djsConfig={djsConfig}
                    eventHandlers={eventHandlers}
                />
                </div>
            </div>
            <span className='sectionLabels'> Add Caption: </span>
            <input className='caption' placeholder='Caption...' style={{marginBottom: '1em'}}/>
            <span className='sectionLabels'> Choose Frame: </span>
            <div>
                <img className="frameImg" src={addPhotoBase} alt="" />
                <img className="frameImg" src={addPhotoBase} alt="" />
                <img className="frameImg" src={addPhotoBase} alt="" />
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