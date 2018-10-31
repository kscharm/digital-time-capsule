import React, { Component } from 'react';
import OurButton from '../../OurButton';
import '../generic.css'

import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import editorStyles from 'draft-js-static-toolbar-plugin/lib/plugin.css';
import '../../../../node_modules/draft-js-counter-plugin/lib/plugin.css';
import createCounterPlugin from 'draft-js-counter-plugin';
import './style.css';

// Creates an Instance. At this step, a configuration object can be passed in
// as an argument.
const counterPlugin = createCounterPlugin();
// Extract a counter from the plugin.
const { CharCounter } = counterPlugin;

const text = '';
const MAX_LENGTH = 200;


export default class AddCapsule extends Component {
//   constructor(props) {
//     super(props);
//   }

  state = {
    capsuleName: '',
    editorState: createEditorStateWithText(text),
    selectedOption: 'public',
    tags: '',
  }

  handleOptionChange = (changeEvent) => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

    onChange = (editorState) => {
        this.setState({
            editorState,
        });
    };
    updateTags = (evt) => {
        this.setState({tags: evt.target.value})
    }
_getLengthOfSelectedText = () => {
    const currentSelection = this.state.editorState.getSelection();
    const isCollapsed = currentSelection.isCollapsed();

    let length = 0;

    if (!isCollapsed) {
      const currentContent = this.state.editorState.getCurrentContent();
      const startKey = currentSelection.getStartKey();
      const endKey = currentSelection.getEndKey();
      const startBlock = currentContent.getBlockForKey(startKey);
      const isStartAndEndBlockAreTheSame = startKey === endKey;
      const startBlockTextLength = startBlock.getLength();
      const startSelectedTextLength = startBlockTextLength - currentSelection.getStartOffset();
      const endSelectedTextLength = currentSelection.getEndOffset();
      const keyAfterEnd = currentContent.getKeyAfter(endKey);
      if (isStartAndEndBlockAreTheSame) {
        length += currentSelection.getEndOffset() - currentSelection.getStartOffset();
      } else {
        let currentKey = startKey;

        while (currentKey && currentKey !== keyAfterEnd) {
          if (currentKey === startKey) {
            length += startSelectedTextLength + 1;
          } else if (currentKey === endKey) {
            length += endSelectedTextLength;
          } else {
            length += currentContent.getBlockForKey(currentKey).getLength() + 1;
          }

          currentKey = currentContent.getKeyAfter(currentKey);
        };
      }
    }

    return length;
}
_handleBeforeInput = () => {
    const currentContent = this.state.editorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText('').length;
    const selectedTextLength = this._getLengthOfSelectedText();
    if (currentContentLength - selectedTextLength > MAX_LENGTH - 1) {
      alert('you can type max 200 characters');
      return 'handled';
    }
}

_handlePastedText = (pastedText) => {
    const currentContent = this.state.editorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText('').length;
    const selectedTextLength = this._getLengthOfSelectedText();
    if (currentContentLength + pastedText.length - selectedTextLength > MAX_LENGTH) {
        alert(`You can only type Max ${MAX_LENGTH} Characters`);
        return 'handled';
    }
}

focus = () => {
    this.editor.focus();
};

  saveCapsule = () => {
    console.log("this should save the capsule");
    this.closeAddCapsule();
  }

  closeAddCapsule = () => {
    this.props.handleShowAddCapsule(false);
  }

  updateCapsuleName = (evt) => {
      this.setState({capsuleName: evt.target.value})
  }

  render() {
    return (
    <div className={ `addType addCapsule` }>
        <div className={ `addTypeBack addCapsuleBack` }/>
        <div className={ `addTypeCard addCapsuleCard` }>
        {/* title*, description*, private/public check*, relevant majors tag (maybe separate each by comma)? */}
            <div>
            <span className='sectionLabels'> Capsule Name: </span>
            <input
                type='text'
                value={this.state.capsuleName}
                className='caption'
                placeholder='Name...'
                style={{marginBottom: '1em'}}
                onChange={evt => this.updateCapsuleName(evt)}
            />
            <span className='radiobtns'>Type of Capsule: </span>

            <form className='options'>
                <div className="radio1">
                <label>
                    <input type="radio" value="public" onChange={this.handleOptionChange} checked={this.state.selectedOption === 'public'} />
                    Public
                </label>
                </div>
                <div className="radio2">
                <label>
                    <input type="radio" value="private" onChange={this.handleOptionChange} checked={this.state.selectedOption === 'private'}/>
                    Private
                </label>
                </div>
            </form>
            
            <span className='sectionLabels'> Capsule Description: </span>
            <div className={editorStyles.editor} onClick={this.focus} style={{width: '350px'}}>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    ref={(element) => { this.editor = element; }}
                    plugins={[counterPlugin]}
                    handleBeforeInput={this._handleBeforeInput}
                    handlePastedText={this._handlePastedText}
                />
                <CharCounter editorState={this.state.editorState} limit={200} /> {/* yo this line is making a 0 appear in the quote modal what */}
            </div>
            <span className='sectionLabelTag'> Capsule Tags: </span>
            <span className='subtext'> Separate tags with commas.</span>
            <input 
                type='text'
                value={this.state.tags}
                className='caption'
                placeholder='Tag...'
                style={{marginBottom: '1em'}}
                onChange={evt => this.updateTags(evt)}
            />
            </div>
            <div className={ `actionButtons` }>
                <OurButton
                    buttonText='Add'
                    buttonAction={() => {this.saveCapsule()}}
                    buttonType='primary'
                />
                <OurButton
                    buttonText='Cancel'
                    buttonAction={() => {this.closeAddCapsule()}}
                    buttonType='secondary'
                />
            </div>
        </div>
    </div>
    );
  };
}