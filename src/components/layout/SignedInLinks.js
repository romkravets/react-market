import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from  '../../store/actions/authActions';

const SignedInLinks = (props) => {
   // console.log(profile.initials, 'profile.initials')
   return (
      <ul className="right">
         <li><NavLink to="/create">New Product</NavLink></li>
         <li><NavLink to="/favorite">Favorite</NavLink></li>
         <li><a onClick={props.signOut}>Log Out</a></li>
         <li><NavLink to="/profile" className="btn btn-floating pink lighten-1">
            {props.profile.initials}
         </NavLink></li>
      </ul>
   )
}

const mapDispatchToProps = (dispatch) => {
   return {
      signOut: () => dispatch(signOut())
   }
}


export default connect(null, mapDispatchToProps) (SignedInLinks);