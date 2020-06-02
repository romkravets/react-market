import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {toast, ToastContainer} from 'react-toastify'

class Chat extends Component {

    render() {
        console.log(this.props.messages)
        return (
            <div className="container">
                 <h1>Chatty</h1>
                 <div className="row">
                     <div className="col s4">
                        users
                     </div>
                     <div className="s8">
                         messages
                     </div>
                 </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
       messages: state.firestore.data.messages
    }
 }
 
 const mapDispatchToProps = (dispatch) => {
    return {
      
    }
 }

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
       { collection: 'messages' }
    ])
 )(Chat);
