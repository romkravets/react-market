import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {Redirect} from 'react-router-dom';
import { addToFavorites } from '../../store/actions/authActions';
import moment from 'moment';

const ProjectDetails = (props) => {

 const hendleFavorite = (project, id) => {
   // console.log('click');
   // console.log(props.id);
   // props.updateUserInfo();
   // props.getFavorits(project.id);
   props.addToFavorites(props.id);
 }

  const { project, auth } = props;
   if (!auth.uid) return <Redirect to='/signin'/>
   if (project) {
     return(
      <div className="container section project-details">
         <div className="card z-depth-0">
            <div className="card-content">
               <div class="card-image">
                  <img src={project.imgUrl} alt={project.title}/>
                  <a class="btn-floating halfway-fab waves-effect waves-light red" onClick={hendleFavorite}><i class="material-icons"></i></a>
               </div>
               <span className="card-title">{ project.title }</span>
               <p>{ project.content }</p>
            </div>
            <div className="card-action gret lighten-4 grey-text">
               <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
               <div>{moment(project.createAt.toDate()).calendar()}</div>
            </div>
         </div>
   </div>
   )
  } else {
   return (
     <div className="container center">
        <p>Loading project...</p>
     </div>
   )
  }
}

const mapStateToProps = (state, ownProps) => {
   const id = ownProps.match.params.id;
   const projects = state.firestore.data.projects;
   const project = projects ? projects[id] : null;
   return {
      project: project,
      auth: state.firebase.auth,
      id: ownProps.match.params.id
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      // updateUserInfo: () => dispatch(updateUserInfo()),
      // getFavorits: () => dispatch(getFavorits()),
      addToFavorites: (id) => dispatch(addToFavorites(id))
   }
}



export default compose(
   connect(mapStateToProps, mapDispatchToProps),
   firestoreConnect([
      { collection: 'projects' }
   ])
) (ProjectDetails);