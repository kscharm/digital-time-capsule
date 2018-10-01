import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './style.css';

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
              handle=".handle"
              defaultPosition={{x: 0, y: 100}}
              position={null}
              onStart={this.handleStart}
              onDrag={this.handleDrag}
              onStop={this.handleStop}
              >
              <div style={{ width: '256px', height: '356px'}} >
                <div className="handle">Imagine that this is the frame.</div>
                <img className="photo" src={this.props.photo} alt={this.props.title} />
              </div>
            </Draggable>
        );
    }
}