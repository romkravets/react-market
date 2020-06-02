import React, { Component } from "react";
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import {createMessage} from '../../store/actions/chatAction';

import { connect } from 'react-redux';
class User extends Component {
   state = {
      purchasing: false,
      message: '',
      uidTo: ''
   }
   handleUserInfoClose = () => {
		this.setState({ purchasing: false });
   };

   handleChange = (e) => {
      this.setState({
         [e.target.id]: e.target.value
      })
      this.setState({
         uidTo: this.props.project.authorId
      })
      console.log(this.state.message);
   }

   handleUpload = (e) => {
      e.preventDefault();
      this.props.createMessage(this.state);
      console.log(this.state, 'this.state.message');
   }

   handleUserInfo = () => {
		this.setState(prevState => ({
			purchasing: !prevState.purchasing
      }));
		console.log(this.state);
   }

   render() {
      const { project, profile } = this.props;
      return (
         <Aux>
         <Modal show={this.state.purchasing} modalClosed={this.handleUserInfoClose}>
            <div className="lighten-4 grey-text">
               <div className="row">
                  <div className="col s6"><h4>Profile</h4></div>
                  <div className="col s6"><CloseBtn click={this.state.purchasing} clicked={this.handleUserInfoClose}/></div>
               </div>
               <div className="btn btn-floating pink lighten-1">
                  {project.authorFirstName[0] + project.authorLastName[0]}
               </div>
               <div><span>{project.authorFirstName} {project.authorLastName}</span></div>
               <div class="row">
                  <form class="col s12" onSubmit={this.handleUpload}>
                     <div class="row">
                     <div class="input-field col s12">
                        <i class="material-icons prefix">mode_edit</i>
                        <textarea id="message" class="materialize-textarea" onChange={this.handleChange}></textarea>
                        <label for="message">Message</label>
                     </div>
                     </div>
                     <button class="btn waves-effect waves-light">Submit<i class="material-icons right">send</i>
                     </button>
                  </form>
               </div>
            </div>
         </Modal>
      <div className="section">
         <div className="text-center">
            <div className="btn btn-floating pink lighten-1">
               {project.authorFirstName[0] + project.authorLastName[0]}
            </div>
         <div><span>{project.authorFirstName} {project.authorLastName}</span></div>
         </div>
         <button class="btn waves-effect waves-light" onClick={this.handleUserInfo}>Chat with seller<i class="material-icons right">send</i>
         </button>
      </div>
      </Aux>
      )
   }
}

// const  mapStateToProps = (state) => {
//    return {
//       profile: state.firebase.profile,
//    }
// }

const mapDispatchToProps = (dispatch) => {
   return {
      createMessage: (message) => dispatch(createMessage(message))
   }
}

export default connect(null, mapDispatchToProps)(User);