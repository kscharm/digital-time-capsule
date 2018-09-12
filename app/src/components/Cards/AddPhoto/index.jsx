import React, { Component } from 'react';
import './style.css';
import '../generic.css'
import '../../OurButton';
import addPhotoBase from '../../../images/addPhoto.png'
import OurButton from '../../OurButton';

export default class AddPhoto extends Component {
  constructor(props) {
    super(props);
  }

  closeAddPhoto = () => {
    this.props.handleShowAddPhoto(false);
  }

  render() {
    return (
    <div className={ `addType addPhoto` }>
        <div className={ `addTypeBack addPhotoBack` }/>
        <div className={ `addTypeCard addPhotoCard` }>
            {/* <span className='sectionLabels'> Add Photo: </span> */}
            <div className='photo'>
                <img className="photoImg" src={addPhotoBase} alt="" />
            </div>
            <div className='info'>
                <div>
                    Click the icon to open file explorer,
                </div>
                <div>
                    or drag a photo to add.
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
                    buttonAction={() => {this.closeAddPhoto()}}
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