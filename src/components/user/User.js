import React, { Component } from "react";
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

import { connect } from 'react-redux';

class User extends Component {
   state = {
		purchasing: false,
   }
   handleUserInfoClose = () => {
		this.setState({ purchasing: false });
   };

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
               <h4>Profile</h4>
               <div className="btn btn-floating pink lighten-1" onClick={this.handleUserInfo}>
                 {project.authorFirstName[0] + project.authorLastName[0]}
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

const  mapStateToProps = (state) => {
   return {
      profile: state.firebase.profile,
   }
}

export default connect(mapStateToProps)(User);