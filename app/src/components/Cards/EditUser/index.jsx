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
        requestList: ["FAKE BOHY"],
        showButtons: false,
    };

    editUser = (user) => {
        // TODO: Need to change the vaules of capsuleId and userId
        axios.post('http://localhost:3001/addContributor', {
            capsuleId: this.props.id,
            userId: user
        })
        .then((res) => {
            console.log(res.data);
            const index = this.state.requestList.indexOf(user);
            let listWithOut = this.state.requestList;
            listWithOut.splice(index, 1);
            this.setState({requestList: listWithOut});
            this.props.handleAddUser(user);
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
            this.props.handleDeleteUser(user);
        })
        .catch((err) => {
            alert('Error removing user from time capsule: ' + err.message);
        });
    }
    removeRequestor = (user) => {
        console.log('I should remove the user from the request list');
        const index = this.state.requestList.indexOf(user);
        let listWithOut = this.state.requestList;
        listWithOut.splice(index, 1);
        this.setState({requestList: listWithOut});
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
        //this.getRequests();
    }

  render() {
    return (
    <div className={ `addType editUser` }>
      <div className={ `addTypeBack editUserBack` }/>
        <div className={ `addTypeCard editUserCard` }>
            <div className='listDiv'>
                <h3> Request List: </h3>
                <ul className='listUL'>
                    {this.state.requestList.map((requestor) => {
                        return (
                        <li>
                            <label>{requestor}</label>
                            {this.state.showButtons ? 
                            <button 
                                className="add"
                                onClick={()=> {this.editUser(requestor)}}
                            >
                                Add
                            </button>
                            : null}
                            {this.state.showButtons ? 
                            <button 
                                className="delete"
                                onClick={()=> {this.removeRequestor(requestor)}}
                            >
                                Delete
                            </button>
                            : null}
                        </li>
                    )
                    })}
                </ul>
            </div>
            <div className='listDiv'>
                <h3> User List: </h3>
                <ul className='listUL'>
                    {this.props.contributorList.map((contributor) => {
                        return (
                        <li>
                            <label>{contributor}</label>
                            {this.state.showButtons ? <button className="delete"/> : null }
                            {this.state.showButtons ?
                            <button 
                                className="delete" 
                                onClick={()=> {this.removeUser(contributor);}}>
                                    Delete
                            </button>
                            : null}
                        </li>
                    )
                    })}
                </ul>
            </div>
            <div className={ `actionButtons actionButtonsEdit` }>
                <OurButton
                    buttonText='Edit'
                    buttonAction={() => {this.setState({showButtons: !this.state.showButtons});}}
                    buttonType='primary'
                />
                <OurButton
                    buttonText='Close'
                    buttonAction={() => {this.closeEditUser()}}
                    buttonType='secondary'
                />
            </div>
        </div>
    </div>
    );
  };
}