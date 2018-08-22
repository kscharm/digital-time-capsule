import React, { Component } from 'react';
import './App.css';
import OurButton from './components/OurButton';
import Spinner from './components/Spinner';

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentPage: 'personalCapsule',
    isLoading: false,
    forceRefresh: false,
  }

  handlePageChange = (page, forceRefresh) => {
    this.setSate({
      currentPage: page,
      forceRefresh: forceRefresh,
    });
  }
  handleLoading = (isLoading) => {
    this.setState({isLoading: isLoading});
  }

  resetForceRefresh = () => {
    this.setState({
      forceRefresh: false,
    });
  }

  hello = () => {
    console.log('hello');
    this.setState({isLoading: true});
  }

  render() {
    let personalCapsule = null;
    if (this.state.currentPage === 'personalCapsule') {
      personalCapsule = 
        <div id='capsulePage'>
          <OurButton 
            buttonAction={() => { this.hello() }} 
            buttonText='CLICK ME' >
          </OurButton>
          <Spinner isLoading={this.state.isLoading} handleLoading={this.handleLoading} />
        </div>
    }

    return (
      <div className="App">
        {personalCapsule}
      </div>
    );
  }
}

export default App;
