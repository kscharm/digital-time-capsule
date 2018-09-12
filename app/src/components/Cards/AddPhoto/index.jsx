import React, { Component } from 'react';
import './style.css';
import '../../OurButton';
import addPhotoBase from '../../../images/addPhoto.png'
import OurButton from '../../OurButton';

import ImageDropZone from 'react-image-dropzone';

export default class AddPhoto extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    filePop: false,
  }

  closeAddPhoto = () => {
    this.props.handleShowAddPhoto(false);
  }

  render() {
    //   const pic = '../../../images/addPhoto.png'
      const imagePicked = image => console.log(image)
    //   const imageDefault = pic

    return (
    <div className='addPhoto'>
        <div className='addPhotoBack'/>
        <div className='addPhotoCard'>
            {/* <span className='sectionLabels'> Add Photo: </span> */}
            <div className='photo'>
                {/* <img className="photoImg" src={this.state.pictures} alt=""/> */}
                
                {/*the div dropzone is what causese the localhost error*/}
                <div className="dropzone">
                    <ImageDropZone
                        anySize
                        showButton
                        width={475}
                        height={300}
                        imageWidth={512}
                        imageHeight={512}
                        // imageDefault={imageDefault}
                        imagePicked={imagePicked}
                    />
                </div>
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