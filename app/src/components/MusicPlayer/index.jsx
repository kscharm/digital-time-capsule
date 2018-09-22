import React, { Component } from 'react';
import './style.css';
import Draggable from 'react-draggable';
import OurButton from '../OurButton';

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

    render () {
        const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        console.log(w);
        console.log(this.props.song);
        return (
                <Draggable
                bounds={{left: 0, top: -310, right: (w - 216)}}
                defaultPosition={{x: this.props.xPos, y: this.props.yPos}}
                position={null}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}
                >
                <div className='musicPlayer'>
                    <Sound
                        url={music}
                        playStatus={this.state.playStatus}
                        //playFromPosition={this.state.position}
                        onLoading={this.handleSongLoading}
                        onPlaying={this.handleSongPlaying}
                        onFinishedPlaying={this.handleSongFinishedPlaying}
                        />
                    <div>
                        {this.props.title}
                    </div>
                    <div>
                        {this.props.genre}
                    </div>
                    <div>
                    <OurButton
                        buttonText='Play'
                        buttonAction={() => {this.setState({playStatus: 'PLAYING'})}}
                        buttonType='primary'
                    />
                    <OurButton
                        buttonText='Pause'
                        buttonAction={() => {this.setState({playStatus: 'PAUSED'})}}
                        buttonType='secondary'
                    />
                    </div>
                </div>
                </Draggable>
        );
    }
}