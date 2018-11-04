import React, { Component } from 'react';
import {
    FaTrash,
    FaPlus,
    FaMinus,
} from 'react-icons/fa';

import toBeCapsule from '../../images/addPhoto.png';
import './style.css';
import axios from 'axios';

export default class UserDisplay extends Component {

    state = {
        isOwner: false,
        isContributer: false,
    }

    requestAddFriend = (username) => {
        if (this.props.myUsername === username) {
            alert("Sorry, you can't be friends with yourself!");
        } else {
            axios.post('http://localhost:3001/sendFriendRequest', {
            myUsername: this.props.myUsername,
            friendUsername: username
            })
            .then((res) => {
                console.log(res.data);
                alert('Your friend request has been sent.');
            })
            .catch((err) => {
            alert('Error adding friend: ' + err.message);
            });
        }
    }

    requestAcceptFriend = (username) => {
        axios.post('http://localhost:3001/acceptFriend', {
           myUsername: this.props.myUsername,
           friendUsername: username
        })
        .then((res) => {
            console.log(res.data);
            const user = {
                username: this.props.title,
                _id: this.props.id,
                photo: this.props.photo,
                university: this.props.university,
            }
            this.props.handleAcceptFriend(user);
            alert('You have added a friend.');
        })
        .catch((err) => {
           alert('Error accepting friend request: ' + err.message);
        });
    }

    requestDeleteFriend = (username) => {
        axios.post('http://localhost:3001/deleteFriend', {
           myUsername: this.props.myUsername,
           friendUsername: username
        })
        .then((res) => {
            console.log(res.data);
            const user = {
                username: this.props.title,
                _id: this.props.id,
                photo: this.props.photo,
                university: this.props.university,
            }
            this.props.handleDeleteFriend(user);
            alert(`${username} has been removed from your friends.`);
        })
        .catch((err) => {
           alert('Error adding friend: ' + err.message);
        });
    }
    decideAddButton = () => {
        if (this.props.recrequest) {
            console.log("YEET");
            this.requestAcceptFriend(this.props.title);
        } else {
            this.requestAddFriend(this.props.title);
        }
    }

    render () {
        console.log(this.props.myUsername);
        const AddButtonUser = () => {
            return (
            <button
                onClick={() => {this.decideAddButton()}}
                className='addButtonsUser'
            >
                <FaPlus className='addIconsUser' size={20}/>
            </button>
            )}
        const DeleteButtonUser = () => {
            return (
            <button
                onClick={() => {this.requestDeleteFriend(this.props.title)}}
                className='deleteButtonsUser'
            >
                <FaMinus className='deleteIconsUser' size={20}/>
            </button>
            )}
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
                    <div className="intro">{this.props.university}</div>
                </div>
                <div>
                <img src={toBeCapsule} alt='placeholder' style={{zoom: '50%', padding: '20px 30px 0px 20px'}}></img>
                </div>
                <div>
                {(this.state.isOwner || this.state.isContributer) ? null : <AddButtonUser/>}
                {this.state.isOwner ? null : <DeleteButtonUser/>}
                </div>

                {this.props.showDelete ? <DeleteButton/> : null}
            </div>
            </div>
        );
    }
}