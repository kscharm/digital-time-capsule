import React, { Component } from 'react';
import './style.css';
import {FaPlus, FaMinus} from 'react-icons/fa';

export default class CapsuleDisplay extends Component {
    // constructor(props) {
    //   super(props)
    // }
    requestCapsuleAccess = () => {
        console.log('I should req access for user and capsule:');
        console.log(this.props.userID);
        console.log(this.props.id);
    }
    requestCapsuleRemoval = () => {
        console.log('I should req removal for user and capsule:');
        console.log(this.props.userID);
        console.log(this.props.id);
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
            <div className={`capsuleDisplay`} onClick={() => {this.props.sendToCapusle(this.props.id)}}>
                <div className="title-content">
                    <h3>{this.props.title}</h3>
                    <hr />
                    <div className="intro">{this.props.id}</div>
                </div>
                <div className="card-info">
                    <div>{this.props.description}</div>
                </div>
                <div>
                <AddButton/>
                <DeleteButton/>
                </div>
            </div>
            </div>
        );
    }
}