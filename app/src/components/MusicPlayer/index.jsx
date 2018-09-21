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
        // soundState: {
            playStatus: Sound.status.STOPPED,
            position: 300
        // }
    }

    render () {
        return (
            <div className="musicPlayer">
                <Draggable
                bounds="parent"
                handle=".handle"
                defaultPosition={{x: 0, y: 0}}
                position={null}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}
                >
                <div style={{display: 'inline-block'}}>
                    <Sound
                        url={music}
                        playStatus={this.state.playStatus}
                        playFromPosition={this.state.position}
                        onLoading={this.handleSongLoading}
                        onPlaying={this.handleSongPlaying}
                        onFinishedPlaying={this.handleSongFinishedPlaying}
                        />
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
            </div>
        );
    }
}