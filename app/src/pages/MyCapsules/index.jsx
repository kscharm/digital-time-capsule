import React, { Component } from 'react';
import Background from '../../images/cork.jpg';
import './style.css';

import {
  FaCamera,
} from 'react-icons/fa';

import NavBar from '../../components/NavBar';
import AddButton from '../../components/AddButton';

export default class Registration extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    addPop: false, 
  }

  handlePop = (pop) => {
    this.setState({addPop: pop});
  }


  render() {

    const Add = (props) => {
      let contents = [];
      let icon = '';
      let onClicks = () => {};
      if (props.options) {
        contents = props.options.map(option => {
          if (option==='Add Capsule') {
            icon = <FaCamera/>
            onClicks = () => {
              // this.handleShowAddPhoto(!this.state.showAddPhoto);
              console.log("MADE IT IN");
              this.handlePop(false);
            }
          }
          return (
            <div key={option}>
              <span onClick={onClicks} className="menuItem" key={option}>{icon} {option}</span>
            </div>
          );
        });
      }

      return (
        <div>
          {contents}
        </div>
    );
    }


    // if (redirectToReferrer) {
    //   return (
    //     <Redirect to={from} />
    //   )
    // }

    return (
      <div className='bgDiv' style={{background: `url(${Background})`, overflow:'auto'}} >
      <NavBar handlePop={this.handlePop} addPop={this.state.addPop} />
      <div className='addButton'>
            <AddButton
              buttonAction={() => { this.handlePop(!this.state.addPop) }}
              buttonType='add'
            />
            <div className='addPop'  style={this.state.addPop ? {display: 'block'} : {display: 'none'}}>
              {this.state.addPop ? <Add options={['Add Capsule']} /> : null }
            </div>
          </div>
        <div className='register'>
          <div>
            <h2>CAPSULES!</h2>
            <h5>It's the ugliest page you've ever seen</h5>
          </div>
        </div>
      </div>
    );
  };
}