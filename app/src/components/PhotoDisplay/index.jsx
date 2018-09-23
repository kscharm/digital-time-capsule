import React, { Component } from 'react';
import './style.css';
import Draggable from 'react-draggable';
import addPhotoBase from '../../images/addPhoto.png'

export default class PhotoDisplay extends Component {
    // constructor(props) {
    //   super(props)
    // }

    urltoFile = (url, filename, mimeType) => {
        return (fetch(url)
            .then(function(res){return res.arrayBuffer();})
            .then(function(buf){return new File([buf], filename, {type:mimeType});})
        );
    }

    handleStart(e, ui){ e.stopPropagation(); } 

    // this.urltoFile('data:audio/mp3;base64,aGVsbG8gd29ybGQ=', this.props.song, 'audio/mp3')
    // .then((file) => {
    //     console.log('hello');
    //     console.log(file);
    //     console.log('goodbye');
    // })

    render () {
        const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        return (
            <Draggable
              bounds= {{left:0}}
              handle=".handle"
              defaultPosition={{x: 0, y: 100}}
              position={null}
              onStart={this.handleStart}
              onDrag={this.handleDrag}
              onStop={this.handleStop}
              >
              <div style={{ width: '256px', height: '356px'}} >
                <div className="handle">Imagine that this is the frame.</div>
                <img className="tempPhoto" src={addPhotoBase} alt="temp photo"></img>
              </div>
            </Draggable>
        );
    }
}