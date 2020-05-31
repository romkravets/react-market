import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { addToFavorites, removeFromFavorites } from '../../store/actions/authActions';
import moment from 'moment';

const ProjectDetails = (props) => {

 const hendleFavorite = (project, id) => {
   props.addToFavorites(props.id);
 }

 const removeFavorits = () => {
   console.log('redirect');
   props.removeFromFavorites(props.id);
   // <Redirect to='/favorite'/>
   // console.log(props.history);
   props.history.push(`/favorite`);
 }

 const hendleBackToHome = () => {
   // console.log(props.history);
   if (props.history.push() === "/favorite") {
      props.history.push(`/favorite`);
   } else {
      props.history.push(`/`);
   }
 }

  const { project, auth } = props;
  console.log(props.history, 'page');
   if (!auth.uid) return <Redirect to='/signin'/>
   if (project) {
     return(
      <div className="container section project-details">
         <div onClick={hendleBackToHome}>Back</div>
         <div className="card z-depth-0">
            <div className="card-content">
               <div class="card-image">
                  <img src={project.imgUrl} alt={project.title}/>
                  <div>
                  <a class="btn-floating halfway-fab waves-effect waves-light red" onClick={hendleFavorite}>Add +<i class="material-icons"></i></a>
                  </div>
               </div>
               <a class="btn-floating halfway-fab waves-effect waves-light red" onClick={removeFavorits}>Rem -<i class="material-icons"></i></a>
               <span className="card-title">{ project.title }</span>
               <p>{ project.content }</p>
            </div>
            <div className="card-action grey lighten-4 grey-text">
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
      addToFavorites: (id) => dispatch(addToFavorites(id)),
      removeFromFavorites: (id) => dispatch(removeFromFavorites(id)),
   }
}



export default compose(
   connect(mapStateToProps, mapDispatchToProps),
   firestoreConnect([
      { collection: 'projects' }
   ])
) (ProjectDetails);