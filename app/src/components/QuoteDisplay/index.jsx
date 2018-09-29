import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './style.css';

export default class QuoteDisplay extends Component {
    // constructor(props) {
    //   super(props)
    // }

    render () {
        const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const actualText = this.props.text;
        const author = this.props.author;
        return (
            <Draggable
              bounds= {{left:0, right:(w), top:0}}
              defaultPosition={{x: 0, y: 100}}
              position={null}
              onStart={this.handleStart}
              onDrag={this.handleDrag}
              onStop={this.handleStop}
              >
              <div>
              <blockquote className="quoteSpace">
                <p className="quoteMark">“</p>
                <p className="quoteSpecial">{actualText}</p>
                <div className='blog-post-actions'>
                    <p className="blog-post-bottom pull-right">- {author}</p>
                </div>
              </blockquote>
              <div class="notepaper">
                <figure class="quote">
                    <blockquote class="curly-quotes">{actualText}</blockquote>
                    <figcaption class="quote-by">— {author}</figcaption>
                </figure>
            </div>
            <div className='raised'>
                <blockquote>
                    {actualText}
                    <span class="author"><i>{author}</i></span>
                </blockquote>
            </div>
            </div>
            </Draggable>
        );
    }
}