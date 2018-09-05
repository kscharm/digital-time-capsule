import React, { Component } from 'react';
import './style.css';
import loader from './images/loader.gif';
import closeButtonIcon from './images/placeholder.svg'

export default class Spinner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.hasOwnProperty('isLoading')) {
      this.setState({isLoading: newProps.isLoading});
    }
  }

  render() {
    return (
        <div className="spinner" style={this.state.isLoading ? {visibility:'visible'} : {visibility:'hidden'}}>
          <img className="spinnerImg" src={loader} alt="" />
          <div className="closeDiv" >
            <button className="spinnerClose">
              <img className="closeButtonIcon" src={closeButtonIcon} alt="" onClick={() => { this.props.handleLoading(false); }} />
            </button>
          </div>
        </div>
    );
  };
}
