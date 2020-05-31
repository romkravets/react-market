import React from "react";

import { connect } from 'react-redux';

const user = (props) => {
   const { project } = props;
   return (
     <div className="container section">
        <div className="text-center">
         <div className="btn btn-floating pink lighten-1">
            {project.authorFirstName[0] + project.authorLastName[0]}
         </div>
       <div><span>{project.authorFirstName} {project.authorLastName}</span></div>
       </div>
       <button class="btn waves-effect waves-light" type="submit" name="action">Chat with seller
         <i class="material-icons right">send</i>
      </button>
     </div>
   )
}

const  mapStateToProps = (state) => {
   return {
      profile: state.firebase.profile,
   }
}

export default connect(mapStateToProps)(user);