import React, { Component } from 'react';
import './style.css';
import '../generic.css'
import OurButton from '../../OurButton';
import axios from 'axios';

export default class AddQuote extends Component {
    // constructor(props) {
    //     super(props);
    // }

    state = {
        requestList: [],
    };

    editUser = (user) => {
        // TODO: Need to change the vaules of capsuleId and userId
        axios.post('http://localhost:3001/addContributor', {
            capsuleId: this.props.id,
            userId: user
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            alert('Error adding user to time capsule: ' + err.message);
        });
    }
    removeUser = (user) => {
        console.log('I should remove a user from the list');
        // TODO: Need to change the vaules of capsuleId and userId
        axios.post('http://localhost:3001/removeContributor', {
            capsuleId: this.props.id,
            userId: user
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            alert('Error removing user from time capsule: ' + err.message);
        });
    }
    getRequests = () => {
        console.log(this.props);
        // TODO: Need to change the vaule of capsuleId in the GET request
        axios.get('http://localhost:3001/getRequestAccess?capsuleId=' + this.props.capsule)
        .then((res) => {
            console.log(res.data);
            this.setState({requestList: res.data});
        })
        .catch((err) => {
            alert('Error getting access list for time capsule: ' + err.message);
        });
        
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
                        <p>{requestor}</p>
                    </div>
                )
                })}
            </div>
            <div className='userList'>
                <span className='sectionLabels'> User List: </span>
                {this.props.contributorList.map((contributor) => {
                    return (
                    <div>
                        <p>{contributor}</p>
                    </div>
                )
                })}
            </div>
            <div className={ `actionButtons actionButtonsEdit` }>
                <OurButton
                    buttonText='Add'
                    buttonAction={() => {this.editUser('test')}}
                    buttonType='primary'
                />
                <OurButton
                    buttonText='Remove'
                    buttonAction={() => {this.removeUser('test')}}
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