import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './style.css';

export default class TextDisplay extends Component {
    // constructor(props) {
    //   super(props)
    // }

    render () {
        //const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const actualText = this.props.text;
        console.log(this.props.frame);
        return (
            <Draggable
              bounds= {{left:0, top:0}}
              defaultPosition={{x: 0, y: 100}}
              position={null}
              onStart={this.handleStart}
              onDrag={this.handleDrag}
              onStop={this.handleStop}
              >
              <div className={`textSpace ${this.props.frame}`}>
                <p className={`text`}>{actualText}</p>
              </div>
            </Draggable>
        );
    }
}