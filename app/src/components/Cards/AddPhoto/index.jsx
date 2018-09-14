import React, { Component } from 'react';
import './style.css';
import '../../OurButton';
import addPhotoBase from '../../../images/addPhoto.png'
import OurButton from '../../OurButton';

import DropzoneComponent from 'react-dropzone-component';
import '../../../../node_modules/react-dropzone-component/styles/filepicker.css';
import '../../../../node_modules/dropzone/dist/min/dropzone.min.css';

export default class AddPhoto extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    filePop: false,
    files: [],
  }

  closeAddPhoto = () => {
    this.props.handleShowAddPhoto(false);
  }

  render() {
    const componentConfig = {
        iconFiletypes: ['.jpg', '.png', '.gif'],
        showFiletypeIcon: true,
        postUrl: '/uploadHandler',
        addRemoveLinks: true
    };

    return (
    <div className='addPhoto'>
        <div className='addPhotoBack'/>
        <div className='addPhotoCard'>
            <div className='photo'>
                <div className="dropzone">
                <DropzoneComponent
                    config={componentConfig}
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
            <div className='actionButtons'>
                <OurButton
                    buttonText='Add'
                    buttonAction={() => {this.closeAddPhoto}}
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