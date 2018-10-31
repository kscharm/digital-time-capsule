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
                <div class='capsulePin'></div>
                <div class="title-content">
                    <h3>{this.props.title}</h3>
                    <hr />
                    <div class="intro">{this.props.id}</div>
                </div>
                <div class="card-info">{this.props.description}</div>
                {this.props.showDelete ? <DeleteButton/> : null}
            </div>
        );
    }
}