import React, { Component } from 'react';
import './style.css';
import '../../OurButton';
import addPhotoBase from '../../../images/addPhoto.png'
import OurButton from '../../OurButton';
import {Editor, EditorState, RichUtils} from 'draft-js';

export default class AddText extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        editorState: EditorState.createEmpty()
    }

    closeAddText = () => {
        this.props.handleShowAddText(false);
    }

    // The following methods are for The text editor
    onChange = editorState => {this.setState({editorState})};
    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
        this.onChange(newState);
        return 'handled';
        }
        return 'not-handled';
    }
    // When a user clicks a button, Change the style
    _onClick = (e) => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, e.target.name));
    }


  render() {
    // A list of possible styles that conforms with RichUtils abilities
    const styles = ['BOLD', 'ITALIC', 'UNDERLINE', 'CODE'];
    const buttons = styles.map(style => {
      return <button key={style} onClick={this._onClick} name={style}>{style}</button>
    })
    return (
    <div className='addText'>
        <div className='addTextBack'/>
        <div className='addTextCard'>
            {/* <span className='sectionLabels'> Add Photo: </span> */}
            <div className='textDiv'>
                <div className='toolbar'>
                    {buttons}
                </div>
                <Editor 
                    editorState={this.state.editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onChange}
                />
            </div>
            <div className='actionButtons'>
                <OurButton
                    buttonText='Add'
                    buttonAction={() => {this.closeAddText()}}
                    buttonType='primary'
                />
                <OurButton
                    buttonText='Cancel'
                    buttonAction={() => {this.closeAddText()}}
                    buttonType='secondary'
                />
            </div>
        </div>
    </div>
    );
  };
}