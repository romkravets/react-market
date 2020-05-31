import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from  '../../store/actions/authActions';
import User from '../user/User';

import Aux  from '../../hoc/Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

class SignedInLinks extends Component {
   // console.log(profile.initials, 'profile.initials')
   state = {
      purchasing: false,
   }

   handleUserInfo = () => {
      this.setState(prevState => ({
         purchasing: !prevState.purchasing
       }));
      console.log(this.state);
   }

   handleUserInfoClose = () => {
      this.setState({purchasing: false});
    };
   render() {
      const { profile } = this.props;
   return (
      <Aux>
          <Modal show={this.state.purchasing} modalClosed={this.handleUserInfoClose}>
               <div className="lighten-4 grey-text">
                  <h4>Profile</h4>
                  <div className="btn btn-floating pink lighten-1" onClick={this.handleUserInfo}>
                     {profile.initials}
                  </div>
                  <span> {profile.firstName} {profile.lastName}</span>
                  <span>096 889 483 83</span>
                  <br/>
                  <NavLink to="/edit-profile" className="lighten-4 grey-text" to="">Edit profile</NavLink>
                  <hr/>
                  <div>
                     <a className="lighten-4 grey-text" onClick={this.props.signOut}>Log Out</a>
                  </div>
               </div>
            </Modal>
      <ul className="right">
         <li><NavLink to="/create">New Product</NavLink></li>
         <li><NavLink to="/favorite"><i class="material-icons">favorite</i></NavLink></li>
         <li><div className="btn btn-floating pink lighten-1" onClick={this.handleUserInfo}>
            {profile.initials}
         </div></li>
      </ul>
      </Aux>
   )
   }
}

const  mapStateToProps = (state) => {
   return {
      profile: state.firebase.profile,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      signOut: () => dispatch(signOut())
   }
}


export default connect(mapStateToProps, mapDispatchToProps) (SignedInLinks);