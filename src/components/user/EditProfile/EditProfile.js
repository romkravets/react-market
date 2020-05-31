import React from "react";

import { connect } from 'react-redux';

const EditProfile = (props) => {
   const { profile } = this.props;
   return (
     <div className="container section">
         <div className="lighten-4 grey-text">
            <h4>Profile</h4>
            <div className="btn btn-floating pink lighten-1" onClick={this.handleUserInfo}>
               {profile.initials}
               </div>
               <span> {profile.firstName} {profile.lastName}</span>
               <span>096 889 483 83</span>
               <br/>
               <hr/>
                <div>
                  <a className="lighten-4 grey-text" onClick={this.props.signOut}>Log Out</a>
                  </div>
               </div>
     </div>
   )
}

const  mapStateToProps = (state) => {
   return {
      profile: state.firebase.profile,
   }
}

export default connect(mapStateToProps)(EditProfile);