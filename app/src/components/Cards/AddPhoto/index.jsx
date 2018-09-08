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
      <div>
        <div className='addPhoto'>
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