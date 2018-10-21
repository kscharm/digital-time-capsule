import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './style.css';
import {
    FaTrash
  } from 'react-icons/fa';

export default class QuoteDisplay extends Component {
    // constructor(props) {
    //   super(props)
    // }

    handleStop = (e) => {
        console.log(e);
        console.log(e.clientX);
        console.log(e.clientY);
        console.log(e.pageX);
        console.log(e.pageY);
        console.log(e.screenX);
        console.log(e.screenY);
        console.log("ive been stopped");
        this.props.handleUpdateQuote(e.clientX, e.clientY);
    }

    render () {
        //const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const actualText = this.props.text;
        const author = this.props.author;
        const DeleteButton = () => {
            return (
            <button
                onClick={() => {this.props.handleDeleteQuote(this.props.quoteObj)}}
                className='deleteButton'
            >
                <FaTrash className='deleteIcon' size={20}/>
            </button>
            )}
        return (
            <Draggable
              bounds= {{left:0, top:0}}
              defaultPosition={{x: 0, y: 100}}
              position={null}
              onStart={this.handleStart}
              onDrag={this.handleDrag}
              onStop={this.handleStop}
              >
              <div>
                <div className='raised'>
                    <blockquote>
                        {actualText}
                        <span class="author"><i>{author}</i></span>
                        {this.props.showDelete ? <DeleteButton/> : null}
                    </blockquote>
                </div>
            </div>
            </Draggable>
        );
    }
}