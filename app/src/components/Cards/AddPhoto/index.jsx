import React, { Component } from 'react';
import './style.css';
import '../../OurButton';
import { 
  FaImage,
} from 'react-icons/fa';
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
    <div className='addPhoto'>
        <div className='addPhotoBack'/>
        <div className='addPhotoCard'>
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
    );
  };
}