import React, { Component } from 'react';
import './style.css';
import '../generic.css'
import '../../OurButton';
import frame1 from '../../../images/frame1.jpg';
import frame2 from '../../../images/frame2.jpg';
import frame3 from '../../../images/frame3.jpg'
import OurButton from '../../OurButton';
import axios from 'axios';
import uuidv4 from 'uuid/v4';

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
    selected_A: false,
    selected_B: false,
    selected_C: false,
  }

  savePhoto = () => {
    if (this.state.file !== '') {
        axios.post('http://localhost:3001/addPhoto', {
            _id: uuidv4(),
            photo: this.state.file,
            frame: this.state.frame,
            title: this.state.fileName,
            username: this.props.user,
            capsules: [this.props.capsule],
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
            alert('Error saving photo: ' + err.response.data);
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
      this.changeColor(frame);
      console.log(frame);
  }

  changeColor(frame) {
      if (frame === 'basicFrame') {
        this.setState(this.setState({selected_A: !this.state.selected_A}));
        this.setState(this.setState({selected_B: false}));
        this.setState(this.setState({selected_C: false}));
      } else if (frame === 'polarFrame') {
        this.setState(this.setState({selected_B: !this.state.selected_B}));
        this.setState(this.setState({selected_A: false}));
        this.setState(this.setState({selected_C: false}));
      } else if (frame === 'blackFrame') {
        this.setState(this.setState({selected_C: !this.state.selected_C}));
        this.setState(this.setState({selected_B: false}));
        this.setState(this.setState({selected_A: false}));
      }
  }

  render() {

    let frame_class_A = this.state.selected_A ? "selected" : "notSelected";
    let frame_class_B = this.state.selected_B ? "selected" : "notSelected";
    let frame_class_C = this.state.selected_C ? "selected" : "notSelected";

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
            if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif') {
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
        <div className={ `addTypeCard addPhotoCard` } style={{backgroundColor: this.props.userSiteColor}}>
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
                <img className={frame_class_A} src={frame1} alt="" border="5" onClick={() => this.updateFrame('basicFrame')}/>
                <img className={frame_class_B} src={frame2} alt="" border="5" onClick={() => this.updateFrame('polarFrame')}/>
                <img className={frame_class_C} src={frame3} alt="" border="5" onClick={() => this.updateFrame('blackFrame')}/>
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