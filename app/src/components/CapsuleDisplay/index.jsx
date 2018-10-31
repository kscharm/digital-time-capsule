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
                <p className='title'>This Bitch</p>
                <p className='description'>This is Bitch</p>
                {this.props.showDelete ? <DeleteButton/> : null}
            </div>
        );
    }
}