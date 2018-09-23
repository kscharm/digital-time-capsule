import React, { Component } from 'react';
import './style.css';
import Draggable from 'react-draggable';
import OurButton from '../OurButton';
import {
    FaPlayCircle,
    FaPauseCircle
  } from 'react-icons/fa';

import music from '../../music/test_music.mp3'
import Sound from 'react-sound';

export default class MusicPlayer extends Component {
    // constructor(props) {
    //   super(props)
    // }

    state = {
        playStatus: Sound.status.STOPPED,
        position: 0,
    }

    urltoFile = (url, filename, mimeType) => {
        return (fetch(url)
            .then(function(res){return res.arrayBuffer();})
            .then(function(buf){return new File([buf], filename, {type:mimeType});})
        );
    }

    render () {
        const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return (
                <Draggable
                bounds= {{left:0}}
                defaultPosition={{x: this.props.xPos, y: this.props.yPos}}
                position={null}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}
                >
                <div className='musicPlayer'>
                    <Sound
                        url={this.props.song}
                        playStatus={this.state.playStatus}
                        //playFromPosition={this.state.position}
                        onLoading={this.handleSongLoading}
                        onPlaying={this.handleSongPlaying}
                        onFinishedPlaying={this.handleSongFinishedPlaying}
                        />
                    <div className='musicTitle'>
                        {this.props.title}
                    </div>
                    <div className='musicGenre'>
                        Genre: {this.props.genre}
                    </div>
                    <div className='musicControls'>
                    <button 
                        onClick={() => {this.setState({playStatus: 'PLAYING'})}}
                        className='iconButtons'
                    >
                        <FaPlayCircle className='testIcon' size={40}/>
                    </button>
                    <button
                        onClick={() => {this.setState({playStatus: 'PAUSED'})}}
                        className='iconButtons'
                    >
                        <FaPauseCircle className='testIcon' size={40}/>
                    </button>
                    {/* <OurButton
                        buttonText={<FaPlayCircle className='addIcon' size={32}/>}
                        buttonAction={() => {this.setState({playStatus: 'PLAYING'})}}
                        buttonType='primary'
                    /> */}
                    {/* <OurButton
                        buttonText={<FaPauseCircle className='addIcon' size={32}/>}
                        buttonAction={() => {this.setState({playStatus: 'PAUSED'})}}
                        buttonType='secondary'
                    /> */}
                    </div>
                </div>
                </Draggable>
        );
    }
}