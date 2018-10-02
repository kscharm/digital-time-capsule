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

    render () {
        //const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const actualText = this.props.text;
        const author = this.props.author;
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
                    </blockquote>
                </div>
                <button
                    onClick={() => {this.props.handleDeleteQuote(this.props.quoteObj)}}
                    className='iconButtons'
                >
                    <FaTrash className='testIcon' size={40}/>
                </button>
            </div>
            </Draggable>
        );
    }
}