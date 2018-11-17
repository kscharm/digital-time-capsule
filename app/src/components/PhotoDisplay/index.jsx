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
    handleStart = (e, ui) => { e.stopPropagation(); } 
    handleStop = (e, data) => {
        const currentX= data.lastX + data.deltaX;
        const currentY= data.lastY + data.deltaY;
        this.props.handleUpdatePhoto(currentX, currentY, this.props.photoObj);
    }

    render () {
        const DeleteButton = () => {
            return (
            <button
                onClick={() => {this.props.handleDeletePhoto(this.props.photoObj)}}
                className='deleteButton'
            >
                <FaTrash className='deleteIcon' size={20}/>
            </button>
            )}
        //const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return (
            <Draggable
              bounds= {{left:0, top:0}}
              handle='.handle2'
              defaultPosition={{x: this.props.xPos, y: this.props.yPos}}
              position={null}
              onStart={this.handleStart}
              onDrag={this.handleDrag}
              onStop={this.handleStop}
              >
              <div className="handle2" >
              <div className='userPiny_photo'></div>
                <div className={`base ${this.props.frame}`}>
                    <img className="photo" src={this.props.photo} alt={this.props.title} />
                    <p className='caption'>{this.props.caption}</p>
                    {this.props.showDelete ? <DeleteButton/> : null}
                </div>
              </div>
            </Draggable>
        );
    }
}