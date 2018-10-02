import React, { Component } from 'react';
import OurButton from '../../OurButton';
import Select from '../../Select';

import DropzoneComponent from 'react-dropzone-component';
import '../../../../node_modules/react-dropzone-component/styles/filepicker.css';
import '../../../../node_modules/dropzone/dist/min/dropzone.min.css';

import './style.css';
import '../generic.css'

import axios from 'axios'

export default class AddCapsule extends Component {
//   constructor(props) {
//     super(props);
//   }

  state = {
    capsuleName: '',
    ownerName: '',
  }

  saveCapsule = () => {
    console.log("this should save the capsuel");
    this.closeAddCapsule();
  }

  closeAddCapsule = () => {
    this.props.handleShowAddCapsule(false);
  }

  updateCapsuleName = (evt) => {
      this.setState({capsuleName: evt.target.value})
  }
  updateOwnerName = (evt) => {
    this.setState({ownerName: evt.target.value})
  }

  render() {
    return (
    <div className={ `addType addCapsule` }>
        <div className={ `addTypeBack addCapsuleBack` }/>
        <div className={ `addTypeCard addCapsuleCard` }>
            <span className='sectionLabels'> Capsule Name: </span>
            <input 
                value={this.state.capsuleName}
                className='caption'
                placeholder='Name...'
                style={{marginBottom: '1em'}}
                onChange={evt => this.updateCapsuleName(evt)}
            />
            <span className='sectionLabels'> Owner Name: </span>
            <input 
                value={this.state.ownerName}
                className='caption'
                placeholder='Name...'
                style={{marginBottom: '1em'}}
                onChange={evt => this.updateOwnerName(evt)}
            />
            <div className={ `actionButtons actionButtonsMusic` }>
                <OurButton
                    buttonText='Add'
                    buttonAction={() => {this.saveCapsule()}}
                    buttonType='primary'
                />
                <OurButton
                    buttonText='Cancel'
                    buttonAction={() => {this.closeAddCapsule()}}
                    buttonType='secondary'
                />
            </div>
        </div>
    </div>
    );
  };
}