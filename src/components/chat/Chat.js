import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading'
import { firestoreConnect } from 'react-redux-firebase';
import ChatBoard from './chatBoard/ChatBoard';
import WelcomeBoard from './welcomeBoard/WelcomeBoard';
import firebase, { db } from '../../config/fb.config';

class Chat extends Component {
    state = {
        isLoading: true,
        currentPeerUser: null,
        listUser: []
    }
    // currentUserId = localStorage.getItem(.ID)
    // currentUserAvatar = localStorage.getItem(AppString.PHOTO_URL)
    // currentUserNickname = localStorage.getItem(AppString.NICKNAME)

    componentDidMount () {
            this.getListUser();
      }

      getListUser = async () => {
        const currentUser = firebase.auth().currentUser;
        const uid = currentUser.uid;
        const userDate = {lastlogitTime: new Date()};
        const updatePromiss = firebase.firestore().doc(`users/${uid}`).set(userDate, {merge: true});
        const getPromiss = firebase.firestore().doc(`users/${uid}`).onSnapshot((doc) => {
            const userData = doc.data();
            if (userData) {
                this.setState({
                    listUser: userData,
                  });
                  this.setState({ load: true})
                  console.log(this.state.listUser);
            }
        });
        return Promise.all([updatePromiss, getPromiss]);
    }

    render() {
        const { users, messages } = this.props;
        if (users) {
            return (
            <div className="container">
            <h1>Chatty</h1>
                <div className="row">
                    <div className="col s4">
                    <h2>Users</h2>
                        {users && users.map(user => {
                            return (
                                <Link to="">
                                    <h3>{user.firstName} {user.lastName}</h3>
                                    <div className="btn btn-floating pink lighten-1">
                                        {user.initials}
                                    </div>
                                 </Link>
                                )
                            })}
                    </div>
                    <div className="col s8">
                        {messages && messages.map(message => {
                            return (
                                <p>{message.message}</p>
                                )
                            })}
                        <ChatBoard
                            currentPeerUser={this.state.currentPeerUser}
                            showToast={this.props.showToast}/>
                        <WelcomeBoard
                            currentUserNickname={this.currentUserNickname}
                            currentUserAvatar={this.currentUserAvatar}
                        />
                    </div>
                </div>
            </div>
            )
        } else {
            return  (
                <div className="container">
                <ReactLoading
                    type={'spin'}
                    color={'#203152'}
                    height={'3%'}
                    width={'3%'}
                    />
                </div>
            )
        }

            }
    }

const mapStateToProps = (state) => {
    return {
       messages: state.firestore.ordered.messages,
       users: state.firestore.ordered.users
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {

    }
 }

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
       { collection: 'messages', orderBy: ['createAt'] },
       { collection: 'users' }
    ])
 )(Chat);
