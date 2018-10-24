import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './style.css';

export default class Search extends Component {
  state = {
    redirectToReferrer2: false,
    searchTerm: '',
  }

  handleKeyPress = (e) => {
    const keyCode = e.keyCode || e.which;
    if(e.key === 'Enter' || keyCode==='13') {
      console.log('Searching! for ' + this.state.searchTerm);
      if (this.state.searchTerm === '') {
        this.setState({searchTerm: '_'});
      }
      this.props.getSearch(this.state.searchTerm);
      if (this.props.inSearch) {
        console.log('in here');
        //this.setState({redirectToReferrer2: false});
      } else {
        console.log('nope');
        this.setState({redirectToReferrer2: true});
      }
      //this.setState({redirectToReferrer2: true});
    }
  }
  updateSearch = (evt) => {
    this.setState({searchTerm: evt.target.value});
  }

  componentDidMount = () => {
    //console.log("componentDidMount, state: " + this.state.redirectToReferrer2);
    //this.setState({redirectToReferrer2: false});    
  }

  render() {
    const { from } = { from: { pathname: `/searchresult/${this.state.searchTerm}` } }
    const { redirectToReferrer2 } = this.state;

    if (redirectToReferrer2) {
      // this.componentDidMount();
      //this.setState({redirectToReferrer2: false});
      return (
        <Redirect to={from} /> 
      )
    }
    return (
    <div className='search'>
        <div className='search'>
          <input
            type="text"
            placeholder="Search.."
            onKeyPress={this.handleKeyPress}
            value={this.state.searchTerm}
            onChange={evt => this.updateSearch(evt)}
            />
        </div>
    </div>
    );
  }
};