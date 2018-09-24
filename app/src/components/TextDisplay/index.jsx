import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './style.css';

export default class TextDisplay extends Component {
    // constructor(props) {
    //   super(props)
    // }

    handleStart(e, ui){ e.stopPropagation(); } 

    render () {
        console.log("made it to the textdisplay");
        const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const actualText = this.props.text;
        return (
            <Draggable
              bounds= {{left:0, right:(w), top:0}}
              handle=".handle"
              defaultPosition={{x: 0, y: 100}}
              position={null}
              onStart={this.handleStart}
              onDrag={this.handleDrag}
              onStop={this.handleStop}
              >
              <div style={{ width: '256px', height: '356px'}} >
                <div className="handle">TEXT FRAMEEEEEEEEEEEEEEEEEE.</div>
                <p className="text" alt={this.props.title}>{actualText}</p>
              </div>
            </Draggable>
        );
    }
}