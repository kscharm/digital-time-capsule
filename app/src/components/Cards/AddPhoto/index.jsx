import React, { Component } from 'react';
import './style.css';
import '../../OurButton';
import addPhotoBase from '../../../images/addPhoto.png'
import OurButton from '../../OurButton';

import ImageUploader from 'react-images-upload';

export default class AddPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [addPhotoBase] };
    this.onDrop = this.onDrop.bind(this);
    console.log(this.state.pictures);
  }

  state = {
    filePop: false,
  }

  handleFilePop = (pop) => {
    this.setState({filePop: pop});
  }

  closeAddPhoto = () => {
    this.props.handleShowAddPhoto(false);
  }

  onDrop(picture) {
    console.log(this.state.pictures);
    this.setState({
        pictures: this.state.pictures = picture,
    });
    console.log(this.state.pictures);
}

  render() {
      const FileExplorer = (/*props*/) => {
        return (
            <div>
              <ImageUploader
                withIcon={true}
                buttonText='Choose file'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
            </div>
        );
      }
    return (
    <div className='addPhoto'>
        <div className='addPhotoBack'/>
        <div className='addPhotoCard'>
            {/* <span className='sectionLabels'> Add Photo: </span> */}
            <div className='photo'>
                {/* <img className="photoImg" src={this.state.pictures} alt=""/> */}
                <div>
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose file'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
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
                {/* <div className="fileButton" style={{paddingLeft: '37%', paddingRight: '37%'}}>
                    <OurButton
                        buttonText='Upload File'
                        buttonAction={() => {this.handleFilePop(!this.state.filePop)}}
                        buttonType='primary'
                    />
                </div> */}
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
        <div className='filePop'  style={this.state.filePop ? {display: 'block', position: 'absolute'} : {display: 'none'}}>
            {this.state.filePop ? <FileExplorer/> : null}
        </div>
    </div>
    );
  };
}