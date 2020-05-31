import React from "react";

import { connect } from 'react-redux';

const user = () => {
   return (
     <div className="container section">
        <h2>User</h2>
     </div>
   )
}

const  mapStateToProps = (state) => {
   return {
      profile: state.firebase.profile,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      // createProject: (project) => dispatch(createProject(project)),
      // updateUserInfo: () => dispatch(updateUserInfo()),
      // getFavorits: () => dispatch(getFavorits()),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(user);