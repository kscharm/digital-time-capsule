import React, { Component } from 'react';
import './style.css';
import '../generic.css'
import OurButton from '../../OurButton';
import axios from 'axios';
import uuidv4 from 'uuid/v4'

export default class AddQuote extends Component {
    // constructor(props) {
    //     super(props);
    // }

    state = {
    };

    editUser = () => {
        console.log('I should Add a user from the list');
    }
    removeUser = () => {
        console.log('I should remove a user from the list');
    }

    closeEditUser = () => {
        this.props.handleShowEditUser(false);
    }


  render() {
    return (
    <div className={ `addType editUser` }>
      <div className={ `addTypeBack editUserBack` }/>
        <div className={ `addTypeCard editUserCard` }>
            <div className={ `actionButtons actionButtonsEdit` }>
                <OurButton
                    buttonText='Add'
                    buttonAction={() => {this.editUser()}}
                    buttonType='primary'
                />
                <OurButton
                    buttonText='Remove'
                    buttonAction={() => {this.removeUser()}}
                    buttonType='primary'
                />
                <OurButton
                    buttonText='Cancel'
                    buttonAction={() => {this.closeEditUser()}}
                    buttonType='secondary'
                />
            </div>
        </div>
    </div>
    );
  };
}