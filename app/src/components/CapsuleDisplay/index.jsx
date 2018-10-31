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
            <div className={`capsuleDisplay`}>
                <div class="title-content">
                    <h3>SPRING FEVER</h3>
                    <hr />
                    <div class="intro">Yllamco laboris nisi ut aliquip ex ea commodo.</div>
                </div>
                <div class="card-info">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim. 
                </div>
                <p className='title'>This Bitch</p>
                <p className='description'>This is Bitch</p>
                {this.props.showDelete ? <DeleteButton/> : null}
                <div class="gradient-overlay"></div>
                <div class="color-overlay"></div>
            </div>
        );
    }
}