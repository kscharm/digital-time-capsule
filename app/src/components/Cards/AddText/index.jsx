import React, { Component } from 'react';
import './style.css';
import '../generic.css'
import OurButton from '../../OurButton';
import addPhotoBase from '../../../images/addPhoto.png'

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

import axios from 'axios';
import uuidv4 from 'uuid/v4'

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
    // constructor(props) {
    //     super(props);
    // }

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

    addText = () => {
        var a = this.state.editorState.getCurrentContent();
        if (a.getPlainText('') !== '') {
            axios.post('http://localhost:3001/text', {
                _id: uuidv4(),
                username: "kenny",
                capsules: ["myCapsule"],
                text: a.getPlainText(''),
                settings: {
                    privacy: "public"
                },
                metadata: {
                    x: 0,
                    y: 0
                }
            })
            .then((res) => {
                this.closeAddText();
                const frame='notepaper';
                res.data["frame"] = frame;
                this.props.handleAddText(res.data);
            })
            .catch((err) => {
            alert('Error saving text: ' + err.message);
            });
        }
    }

    closeAddText = () => {
        this.props.handleShowAddText(false);
    }


  render() {
    return (
    <div className={ `addType addText` }>
      <div className={ `addTypeBack addTextBack` }/>
        <div className={ `addTypeCard addTextCard` }>
            <div className={`${editorStyles.editor} textBoxHeight`} onClick={this.focus}>
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
            <span className='sectionLabels'> Choose Frame: </span>
            <div>
                <img className="frameImg" src={addPhotoBase} alt="" />
                <img className="frameImg" src={addPhotoBase} alt="" />
                <img className="frameImg" src={addPhotoBase} alt="" />
            </div>
            <div className={ `actionButtons actionButtonsText` }>
                <OurButton
                    buttonText='Add'
                    buttonAction={() => {this.addText()}}
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