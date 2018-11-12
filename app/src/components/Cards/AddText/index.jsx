import React, { Component } from 'react';
import './style.css';
import '../generic.css';
import OurButton from '../../OurButton';
import textFrame1 from '../../../images/textFrame1.jpg';
import textFrame2 from '../../../images/textFrame2.jpg';
import textFrame3 from '../../../images/textFrame3.jpg';
import { convertToRaw } from 'draft-js'

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
        frame: 'notepaper',
        selected_A: false,
        selected_B: false,
        selected_C: false,
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
        var editor = this.state.editorState.getCurrentContent();
        var raw = convertToRaw(editor);
        var text = '';
        var styles = [];
        for (var i = 0; i < raw.blocks.length; i++) {
            var block = raw.blocks[i].inlineStyleRanges;
            for (var k = 0; k < block.length; k++) {
                var offset = block[k].offset + text.length;
                var lengthy = block[k].length + text.length;
                var style = block[k].style;
                var obj = {
                    offset: offset,
                    length: lengthy,
                    style: style
                }
                if (!styles.includes(obj)) {
                    styles.push(obj);
                }
            }
            if (i !== 0) {
                text += '\n' + raw.blocks[i].text;
            } else {
                text += raw.blocks[i].text;
            }
        }

        if (text !== '') {
            axios.post('http://localhost:3001/addText', {
                _id: uuidv4(),
                username: this.props.user,
                capsules: [this.props.capsule],
                frame: this.state.frame,
                text: text,
                styles: styles,
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
                this.props.handleAddText(res.data);
            })
            .catch((err) => {
            alert('Error saving text: ' + err.response.data);
            });
        }
    }

    closeAddText = () => {
        this.props.handleShowAddText(false);
    }
    updateFrame = (frame) => {
        this.setState({frame: frame});
        this.changeColor(frame);
        console.log(frame);
    }

    changeColor(frame) {
        if (frame === 'notepaper') {
          this.setState(this.setState({selected_A: !this.state.selected_A}));
          this.setState(this.setState({selected_B: false}));
          this.setState(this.setState({selected_C: false}));
        } else if (frame === 'notepad') {
          this.setState(this.setState({selected_B: !this.state.selected_B}));
          this.setState(this.setState({selected_A: false}));
          this.setState(this.setState({selected_C: false}));
        } else if (frame === 'postit') {
          this.setState(this.setState({selected_C: !this.state.selected_C}));
          this.setState(this.setState({selected_B: false}));
          this.setState(this.setState({selected_A: false}));
        }
    }


  render() {

    let text_frame_class_A = this.state.selected_A ? "text_selected" : "text_notSelected";
    let text_frame_class_B = this.state.selected_B ? "text_selected" : "text_notSelected";
    let text_frame_class_C = this.state.selected_C ? "text_selected" : "text_notSelected";

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
                <img className={text_frame_class_A} src={textFrame1} border="5" alt="" onClick={() => this.updateFrame('notepaper')}/>
                <img className={text_frame_class_B} src={textFrame2} border="5" alt="" onClick={() => this.updateFrame('notepad')}/>
                <img className={text_frame_class_C} src={textFrame3} border="5" alt="" onClick={() => this.updateFrame('postit')}/>
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