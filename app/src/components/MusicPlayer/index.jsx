import React, { Component } from 'react';
import Draggable from 'react-draggable';
import {
    FaPlayCircle,
    FaPauseCircle,
    FaTrash
  } from 'react-icons/fa';
  import './style.css';
import Sound from 'react-sound';

export default class MusicPlayer extends Component {
    // constructor(props) {
    //   super(props)
    // }

    state = {
        playStatus: Sound.status.STOPPED,
        position: 0,
    }
    handleStart = (e, ui) => { e.stopPropagation(); } 
    handleStop = (e, data) => {
        //console.log(e);
        //console.log(data);
        const currentX= data.lastX + data.deltaX;
        const currentY= data.lastY + data.deltaY;
        this.props.handleUpdateMusic(currentX, currentY, this.props.music);
    }

    render () {
        console.log(this.props.xPos);
        console.log(this.props.yPos);
        //const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const DeleteButton = () => {
            return (
                <button
                        onClick={() => {this.props.handleDeleteMusic(this.props.music)}}
                        className='iconButtons'
                    >
                        <FaTrash className='testIcon' size={40}/>
                    </button>
            )}
        return (
                <Draggable
                bounds= {{left:0, top:0}}
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
                        debugMode={false}
                        useConsole={false}
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
                    {this.props.showDelete ? <DeleteButton/> : null}
                    </div>
                </div>
                </Draggable>
        );
    }
}