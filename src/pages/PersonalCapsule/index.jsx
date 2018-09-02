import React, { Component } from 'react';
import AddButton from '../../components/AddButton';
import Spinner from '../../components/Spinner';
import Background from '../../images/cork.jpg';
import './style.css';

export default class PersonalCapsule extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isLoading: false,
  }

  handleLoading = (isLoading) => {
    this.setState({isLoading: isLoading});
  }

  hello = () => {
    console.log('hello');
    this.setState({isLoading: true});
  }

  render() {

    return (
        <div id='capsulePage'>
          <div className='capsuleDiv' style={{background: `url(${Background})`, backgroundSize:'cover'}} >
            <div className='addButton'>
              <AddButton
                buttonAction={() => { this.hello() }}
                buttonType='add'
              />
            </div>
          </div>
          <Spinner isLoading={this.state.isLoading} handleLoading={this.handleLoading} />
        </div>
    );
  };
}