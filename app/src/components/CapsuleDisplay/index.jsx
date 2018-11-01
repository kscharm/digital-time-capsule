import React, { Component } from 'react';
import './style.css';
import {
    FaTrash
} from 'react-icons/fa';

export default class CapsuleDisplay extends Component {
    // constructor(props) {
    //   super(props)
    // }

    render () {
        const DeleteButton = () => {
            return (
            <button
                onClick={() => {console.log('We click a delete.')}}
                className='deleteButton'
            >
                <FaTrash className='deleteIcon' size={20}/>
            </button>
            )}
        return (
            <div className='capsuleDisplayGroup'>
            <div className='capsulePiny'></div>
            <div className={`capsuleDisplay`} onClick={() => {this.props.sendToCapusle(this.props.id)}}>
                {/* <div className='capsulePin'></div> */}
                <div className="title-content">
                    <h3>{this.props.title}</h3>
                    <hr />
                    <div className="intro">{this.props.id}</div>
                </div>
                <div className="card-info">{this.props.description}</div>
                {this.props.showDelete ? <DeleteButton/> : null}
            </div>
            </div>
        );
    }
}