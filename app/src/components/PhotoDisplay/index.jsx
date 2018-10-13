import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './style.css';
import {
    FaTrash
  } from 'react-icons/fa';

export default class PhotoDisplay extends Component {
    // constructor(props) {
    //   super(props)
    // }

    handleStart(e, ui){ e.stopPropagation(); } 

    render () {
        //const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return (
            <Draggable
              bounds= {{left:0, top:0}}
              handle='.handle2'
              defaultPosition={{x: 0, y: 100}}
              position={null}
              onStart={this.handleStart}
              onDrag={this.handleDrag}
              onStop={this.handleStop}
              >
              <div className="handle2" style={{ width: '256px', height: '356px'}} >
                <div className={`base ${this.props.frame}`}>
                    <img className="photo" src={this.props.photo} alt={this.props.title} />
                    <p className='caption'>{this.props.caption}</p>
                    <button
                        onClick={() => {this.props.handleDeletePhoto(this.props.photoObj)}}
                        className='deleteButton'
                    >
                        <FaTrash className='deleteIcon' size={40}/>
                    </button>
                </div>
              </div>
            </Draggable>
        );
    }
}