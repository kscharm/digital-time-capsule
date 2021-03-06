import React, { Component } from 'react';
import './style.css';
import '../generic.css'
import OurButton from '../../OurButton';
import axios from 'axios';

export default class AddQuote extends Component {

    state = {
        requestList: ["FAKE BOHY"],
        showButtons: false,
    };

    editUser = (user) => {
        axios.post('http://localhost:3001/addContributor', {
            capsuleId: this.props.capsule,
            username: user
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
            alert('Error adding user to time capsule: ' +  err.response.data);
        });
    }
    removeUser = (user) => {
        const confirm = window.confirm(`Are you sure you want to remove ${user} from this time capsule?`)
        if (confirm) {
        axios.post('http://localhost:3001/removeContributor', {
            capsuleId: this.props.capsule,
            username: user
        })
        .then((res) => {
            console.log(res.data);
            this.props.handleDeleteUser(user);
        })
        .catch((err) => {
            alert('Error removing user from time capsule: ' + err.response.data);
        });
        }
    }
    removeRequestor = (user) => {
        const confirm = window.confirm(`Are you sure you want to remove ${user} from your capsule request list?`);
        if (confirm) {
            axios.post('http://localhost:3001/deleteCapsuleRequest', {
            capsuleId: this.props.capsule,
            username: user
            })
            .then((res) => {
                console.log(this.props.capsule);
                const index = this.state.requestList.indexOf(user);
                let listWithOut = this.state.requestList;
                listWithOut.splice(index, 1);
                this.setState({requestList: listWithOut});
                alert(`${user} has been removed from your request list.`);
            })
            .catch((err) => {
            alert('Error adding friend: ' + err.message);
            });
        }
    }
    getRequests = () => {
        axios.get('http://localhost:3001/getRequestAccess?capsuleId=' + this.props.capsule)
        .then((res) => {
            console.log(res.data);
            this.setState({requestList: res.data});
        })
        .catch((err) => {
            alert('Error getting access list for time capsule: ' +  err.response.data);
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
        <div className={ `addTypeCard editUserCard` } style={{backgroundColor: this.props.userSiteColor}}>
            <div className='listDiv'>
                <h3> Contributor Request List: </h3>
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
                            : <div className="spacerDiv"/>}
                            {this.state.showButtons ? 
                            <button 
                                className="delete"
                                onClick={()=> {this.removeRequestor(requestor)}}
                            >
                                Delete
                            </button>
                            : <div className="spacerDiv"/>}
                        </li>
                    )
                    })}
                </ul>
            </div>
            <div className='listDiv'>
                <h3> Contributor List: </h3>
                <ul className='listUL'>
                    {this.props.contributorList.map((contributor) => {
                        return (
                        <li>
                            <label>{contributor}</label>
                            {this.state.showButtons ? <div className="spacerDiv"/> : <div className="spacerDiv"/> }
                            {this.state.showButtons ?
                            <button 
                                className="delete" 
                                onClick={()=> {this.removeUser(contributor);}}>
                                    Delete
                            </button>
                            : <div className="spacerDiv"/>}
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