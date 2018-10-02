import React, { Component } from 'react';
import './style.css';
import '../generic.css'
import OurButton from '../../OurButton';

import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import editorStyles from 'draft-js-static-toolbar-plugin/lib/plugin.css';
import '../../../../node_modules/draft-js-counter-plugin/lib/plugin.css';
import createCounterPlugin from 'draft-js-counter-plugin';
import axios from 'axios';

// Creates an Instance. At this step, a configuration object can be passed in
// as an argument.
const counterPlugin = createCounterPlugin();
// Extract a counter from the plugin.
const { CharCounter } = counterPlugin;

const text = '';
const MAX_LENGTH = 200;

export default class AddQuote extends Component {
    // constructor(props) {
    //     super(props);
    // }

    state = {
        editorState: createEditorStateWithText(text),
        quoteAuthor: '',
    };

    onChange = (editorState) => {
        this.setState({
            editorState,
        });
    };
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

    addQuote = () => {
        var editor = this.state.editorState.getCurrentContent();
        if (editor.getPlainText('') !== '') {
            axios.post('http://localhost:3001/text', {
                username: "madison",
                mediaId: "42069",
                capsules: ["myCapsule"],
                text: editor.getPlainText(''),
                author: this.state.quoteAuthor,
                settings: {
                    privacy: "public"
                },
                quote: true,
                metadata: {
                    x: null,
                    y: null
                }
            })
            .then((res) => {
                this.closeAddQuote();
                this.props.handleAddQuote(res.data);
            })
            .catch((err) => {
                alert('Error saving quote: ', err.message);
            });
        }
    }

    closeAddQuote = () => {
        this.props.handleShowAddQuote(false);
    }
    updateQuoteAuthor = (evt) => {
        this.setState({quoteAuthor: evt.target.value})
    }


  render() {
    return (
    <div className={ `addType addQuote` }>
      <div className={ `addTypeBack addQuoteBack` }/>
        <div className={ `addTypeCard addQuoteCard` }>
            {/* <span className='sectionLabels'> Add Photo: </span> */}
            <div className={editorStyles.editor} onClick={this.focus}>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    ref={(element) => { this.editor = element; }}
                    plugins={[counterPlugin]}
                    placeholder='Quote...'
                    handleBeforeInput={this._handleBeforeInput}
                    handlePastedText={this._handlePastedText}
                />
                <CharCounter editorState={this.state.editorState} limit={200} />
            </div>
            <span className='sectionLabels' style={{marginTop: '.5em'}}> Quote Author: </span>
            <input
                className='caption'
                placeholder='Author...'
                style={{marginBottom: '1em'}}
                value={this.state.quoteAuthor}
                onChange={evt => this.updateQuoteAuthor(evt)}
            />
            <div className={ `actionButtons actionButtonsQuote` }>
                <OurButton
                    buttonText='Add'
                    buttonAction={() => {this.addQuote()}}
                    buttonType='primary'
                />
                <OurButton
                    buttonText='Cancel'
                    buttonAction={() => {this.closeAddQuote()}}
                    buttonType='secondary'
                />
            </div>
        </div>
    </div>
    );
  };
}