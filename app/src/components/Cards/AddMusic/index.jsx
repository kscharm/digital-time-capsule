import React, { Component } from 'react';
import './style.css';
import '../generic.css'
import '../../OurButton';
import OurButton from '../../OurButton';
import Select from '../../Select';

import DropzoneComponent from 'react-dropzone-component';
import '../../../../node_modules/react-dropzone-component/styles/filepicker.css';
import '../../../../node_modules/dropzone/dist/min/dropzone.min.css';

export default class AddMusic extends Component {
//   constructor(props) {
//     super(props);
//   }

  state = {
    filePop: false,
    files: [],
  }

  closeAddMusic = () => {
    this.props.handleShowAddMusic(false);
  }

  render() {
    const componentConfig = {
        iconFiletypes: ['.mp3'],
        allowedFiletypes: ['.mp3'],
        showFiletypeIcon: true,
        postUrl: '/uploadHandler',
    };
    const djsConfig = {
        maxFiles: 1,
        addRemoveLinks: true,
    };
    const eventHandlers = {
        init: (dropzone) => { this.dropzone = dropzone; },
        maxfilesexceeded: (file) => { this.dropzone.removeFile(file); },
    };

    return (
    <div className={ `addType addMusic` }>
        <div className={ `addTypeBack addMusicBack` }/>
        <div className={ `addTypeCard addMusicCard` }>
            {/* <span className='sectionLabels'> Add Photo: </span> */}
            <div className='music'>
                <div className="dropzone">
                    <DropzoneComponent
                        config={componentConfig}
                        djsConfig={djsConfig}
                        eventHandlers={eventHandlers}
                    />
                </div>
            </div>
            <span className='sectionLabels'> Music Title: </span>
            <input className='caption' placeholder='Title...' style={{marginBottom: '1em'}}/>
            <span className='sectionLabels'> Choose Playlist: </span>
            <Select choose={'Choose Playlist'} options={['Playlist 1', 'Playlist 2']} />
            <div className={ `actionButtons actionButtonsMusic` }>
                <OurButton
                    buttonText='Add'
                    buttonAction={() => {this.closeAddMusic()}}
                    buttonType='primary'
                />
                <OurButton
                    buttonText='Cancel'
                    buttonAction={() => {this.closeAddMusic()}}
                    buttonType='secondary'
                />
            </div>
        </div>
    </div>
    );
  };
}