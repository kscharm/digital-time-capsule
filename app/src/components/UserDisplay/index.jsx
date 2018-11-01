import React, { Component } from 'react';
import {
    FaTrash
} from 'react-icons/fa';

import toBeCapsule from '../../images/addPhoto.png';
import AddButton from '../../components/AddButton';
import './style.css';

export default class UserDisplay extends Component {
    // constructor(props) {
    //   super(props)
    // }

    render () {
        const DeleteButton = () => {
            return (
            <button
                onClick={() => {console.log('We click a delete.')}}
                className='deleteButton'
            >
                <FaTrash className='deleteIcon' size={20}/>
            </button>
            )}
        return (
            <div className='userDisplayGroup'>
            <div className='userPiny'></div>
            <div className={`userDisplay`}>
                {/* <div className='userPin'></div> */}
                <div className="title-content">
                    <h3>{this.props.title}</h3>
                    <hr />
                    {/* <div className="intro">{this.props.id}</div> */}
                </div>
                <div className='friendAddButton' style={{position: 'absolute', marginLeft: '19%'}}>
                    <AddButton
                        buttonAction={() => {console.log("add friend button clicked!")}}
                        buttonType='add'
                        style={{position: 'absolute;', marginLeft: '19%;'}}
                    />
                    </div>
                {/* <div className="card-info">{this.props.description}</div> */}
                <div>
                <img src={toBeCapsule} alt='placeholder' style={{zoom: '50%', padding: '20px 30px 0px 20px'}}></img>
                </div>

                {this.props.showDelete ? <DeleteButton/> : null}
            </div>
            </div>
        );
    }
}