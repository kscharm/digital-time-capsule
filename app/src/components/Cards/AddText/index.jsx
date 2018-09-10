import React, { Component } from 'react';
import './style.css';
import '../../OurButton';
import addPhotoBase from '../../../images/addPhoto.png'
import OurButton from '../../OurButton';

export default class AddText extends Component {
  constructor(props) {
    super(props);
  }

  closeAddText = () => {
    this.props.handleShowAddText(false);
  }

  render() {
    return (
    <div className='addText'>
        <div className='addTextBack'/>
        <div className='addTextCard'>
            {/* <span className='sectionLabels'> Add Photo: </span> */}
            <div className='actionButtons'>
                <OurButton
                    buttonText='Add'
                    buttonAction={() => {this.closeAddText()}}
                    buttonType='primary'
                />
                <OurButton
                    buttonText='Cancel'
                    buttonAction={() => {this.closeAddText()}}
                    buttonType='secondary'
                />
            </div>
        </div>
    </div>
    );
  };
}