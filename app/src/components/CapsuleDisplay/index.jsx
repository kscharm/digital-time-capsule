import React, { Component } from 'react';
import './style.css';
import {FaPlus, FaMinus} from 'react-icons/fa';
import axios from 'axios';

export default class CapsuleDisplay extends Component {
    // constructor(props) {
    //   super(props)
    // }
    state = {
        isOwner: false,
        isContributer: false,
    }
    requestCapsuleAccess = () => {
        // TODO: Need to change the vaules of capsuleId and userId?
        axios.post('http://localhost:3001/requestAccess', {
            capsuleId: this.props.id,
            username: this.props.user
        })
        .then((res) => {
            console.log(res.data);
            alert('Your request was sent!');
        })
        .catch((err) => {
            alert('Error requesting access to time capsule: ' + err.message);
        });
    }
    requestCapsuleRemoval = () => {  
        const confirmed = window.confirm(`Are you sure you want to delete this capsule?`) 
        if (confirmed) {
            axios.delete('http://localhost:3001/deleteCapsule?capsule=' + this.props.id)
            .then((res) => {
                console.log(res.data);
                this.props.handleDeleteCapsule(res.data);
                alert('Time capsule deleted.');
            })
            .catch((err) => {
                alert('Error deleting time capsule: ' + err.message);
            });
        }  else {
            alert('Your capsule was not deleted!');
        }
    }
    checkCapsuleOwner = (capsuleId, id) => {
        axios.get('http://localhost:3001/capsuleOwner?capsule=' + capsuleId)
          .then((res) => {
            // Add each type to their respective arrays
            if (res.data === id) {
              this.setState({isOwner: true});
            }
          })
          .catch((err) => {
              alert('Error getting media: ' + err.message);
          });
    }
    checkCapsuleContributer = (capsuleId, id) => {
    axios.get('http://localhost:3001/capsuleContributors?capsule=' + capsuleId)
        .then((res) => {
        // Add each type to their respective arrays
        console.log(res.data);
        for (let i = 0; i < res.data.length; i ++) {
            if (res.data[i] === id) {
            this.setState({isContributer: true});
            break;
            }
        }
        })
        .catch((err) => {
            alert('Error getting media: ' + err.message);
        });
    }
    componentDidMount = () => {
        this.checkCapsuleOwner(this.props.id,this.props.userID);
        this.checkCapsuleContributer(this.props.id,this.props.userID);
    }
    render () {
        const AddButton = () => {
            return (
            <button
                onClick={() => {this.requestCapsuleAccess()}}
                className='addButtons'
            >
                <FaPlus className='addIcons' size={20}/>
            </button>
            )}
        const DeleteButton = () => {
            return (
            <button
                onClick={() => {this.requestCapsuleRemoval()}}
                className='deleteButtons'
            >
                <FaMinus className='deleteIcons' size={20}/>
            </button>
            )}
        return (
            <div className='capsuleDisplayGroup'>
            <div className='capsulePiny'></div>
            <div className={`capsuleDisplay`}>
                <div className="title-content" onClick={() => {this.props.sendToCapusle(this.props.id)}}>
                    <h3>{this.props.title}</h3>
                    <hr />
                    <div className="intro">{this.props.id}</div>
                </div>
                <div className="card-info">
                    <div>{this.props.description}</div>
                </div>
                <div>
                {(this.state.isOwner || this.state.isContributer) ? null : <AddButton/>}
                {this.state.isOwner ? <DeleteButton/> : null}
                </div>
            </div>
            </div>
        );
    }
}