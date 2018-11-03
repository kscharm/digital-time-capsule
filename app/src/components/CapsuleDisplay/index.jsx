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
        console.log('I should req access for user and capsule:');
        console.log(this.props.userID);
        console.log(this.props.id);
        console.log(this.props.capsuleOwner);
        console.log(this.props.capsuleContributer);
    }
    requestCapsuleRemoval = () => {
        console.log('I should req removal for user and capsule:');
        console.log(this.props.userID);
        console.log(this.props.id);
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
                {this.state.isOwner ? null : <DeleteButton/>}
                </div>
            </div>
            </div>
        );
    }
}