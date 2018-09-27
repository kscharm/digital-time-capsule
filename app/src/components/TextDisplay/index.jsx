import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './style.css';

export default class TextDisplay extends Component {
    // constructor(props) {
    //   super(props)
    // }

    render () {
        const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const actualText = this.props.text;
        return (
            <Draggable
              bounds= {{left:0, right:(w), top:0}}
              defaultPosition={{x: 0, y: 100}}
              position={null}
              onStart={this.handleStart}
              onDrag={this.handleDrag}
              onStop={this.handleStop}
              >
              <div className="textSpace">
                <p className="text">{actualText}</p>
              </div>
            </Draggable>
        );
    }
}