import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './style.css';
import {
    FaTrash
  } from 'react-icons/fa';

export default class TextDisplay extends Component {
    // constructor(props) {
    //   super(props)
    // }

    handleStop = (e) => {
        console.log(e);
        console.log(e.clientX);
        console.log(e.pageY);
        console.log(e.screenX);
        console.log(e.screenY);
        console.log("ive been stopped");
        this.props.handleUpdateText(e.clientX, e.clientY, this.props.textObj);
    }

    render () {
        //const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const actualText = this.props.text;
        const DeleteButton = () => {
            return (
                <button
                onClick={() => {this.props.handleDeleteText(this.props.textObj)}}
                className='deleteButton'
            >
                <FaTrash className='deleteIcon' size={20}/>
            </button>
            )}
        return (
            <Draggable
              bounds= {{left:0, top:0}}
              defaultPosition={{x: this.props.xPos, y: this.props.yPos}}
              position={null}
              onStart={this.handleStart}
              onDrag={this.handleDrag}
              onStop={this.handleStop}
              >
              <div className={`textSpace ${this.props.frame}`}>
                <p className={`text`}>{actualText}</p>
                {this.props.showDelete ? <DeleteButton/> : null}
              </div>
            </Draggable>
        );
    }
}