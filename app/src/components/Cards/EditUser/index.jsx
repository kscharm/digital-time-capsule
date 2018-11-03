import React, { Component } from 'react';
import './style.css';
import '../generic.css'
import OurButton from '../../OurButton';
// import axios from 'axios';
// import uuidv4 from 'uuid/v4'

export default class AddQuote extends Component {
    // constructor(props) {
    //     super(props);
    // }

    state = {
        requestList: [],
    };

    editUser = () => {
        console.log('I should Add a user from the list');
    }
    removeUser = () => {
        console.log('I should remove a user from the list');
    }
    getRequests = () => {
        console.log("I should get the list of users who want access");
        this.setState({requestList: []});
    }

    closeEditUser = () => {
        this.props.handleShowEditUser(false);
    }
    componentDidMount = () => {
        this.getRequests();
    }

  render() {
    return (
    <div className={ `addType editUser` }>
      <div className={ `addTypeBack editUserBack` }/>
        <div className={ `addTypeCard editUserCard` }>
            <div className='requestList'>
                <span className='sectionLabels'> Request List: </span>
                {this.state.requestList.map((requestor) => {
                    return (
                    <div>
                    </div>
                )
                })}
            </div>
            <div className='userList'>
                <span className='sectionLabels'> User List: </span>
                {this.props.contributorList.map((contributor) => {
                    return (
                    <div>
                    </div>
                )
                })}
            </div>
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