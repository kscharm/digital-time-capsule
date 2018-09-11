import React, { Component } from 'react';
import './style.css';
import OurButton from '../../OurButton';

import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';
import editorStyles from 'draft-js-static-toolbar-plugin/lib/plugin.css';

const toolbarPlugin = createToolbarPlugin({
    structure: [
      BoldButton,
      ItalicButton,
      UnderlineButton,
      CodeButton,
      Separator,
      HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton,
      Separator,
      UnorderedListButton,
      OrderedListButton,
      BlockquoteButton,
      CodeBlockButton
    ]
  });
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin];
const text = '';

export default class AddText extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        editorState: createEditorStateWithText(text),
    };

    onChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    focus = () => {
        this.editor.focus();
    };

    closeAddText = () => {
        this.props.handleShowAddText(false);
    }


  render() {
    return (
    <div className='addText'>
        <div className='addTextBack'/>
        <div className='addTextCard'>
            {/* <span className='sectionLabels'> Add Photo: </span> */}
            <div className={editorStyles.editor} onClick={this.focus}>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    plugins={plugins}
                    ref={(element) => { this.editor = element; }}
                />
                <div  className='toolbar'>
                    <Toolbar />
                </div>
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