import React from 'react';
import User from '../user/User';
import Spinner from "../UI/Spinner/Spinner";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { addToFavorites, removeFromFavorites } from '../../store/actions/authActions';
import moment from 'moment';

const ProjectDetails = (props) => {

   const hendleFavorite = () => {
      props.addToFavorites(props.id);
   }

   const removeFavorits = () => {
      props.removeFromFavorites(props.id);
      //<Redirect to='/favorite'/>
      // console.log(props.history);
      // props.history.push(`/favorite`);
   }

   const hendleBackToHome = () => {
      // console.log(props.history);
      if (props.history.push() === "/favorite") {
         props.history.push(`/favorite`);
      } else {
         props.history.push(`/`);
      }
   }

   const { project, auth, profile } = props;

   let addFavorit = ''
      if (profile.isLoaded === true && profile.favoritsList.indexOf(props.id) != -1) {
         addFavorit = <a class="btn-floating halfway-fab waves-effect waves-light red" onClick={removeFavorits}><i class="material-icons">favorite</i></a>;
      } else {
         addFavorit = <a class="btn-floating halfway-fab waves-effect waves-light red" onClick={hendleFavorite}><i class="material-icons">favorite_border</i></a>;
      }
   if (!auth.uid) return <Redirect to='/signin' />
   if (project) {
      return (
         <div className="container section project-details">
            <div className="row">
               <div className="col s12 m6">
                  <div onClick={hendleBackToHome}>
                     <span class="material-icons">clear</span>
                  </div>
                  <div className="card z-depth-0">
                     <div className="card-content">
                        <div class="card-image">
                           <img src={project.imgUrl} alt={project.title} />
                           <div>
                              {addFavorit}
                           </div>
                        </div>
                        <span className="card-title">{project.title}</span>
                        <p>{project.content}</p>
                     </div>
                     <div className="card-action grey lighten-4 grey-text">
                        <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
                        <div>{moment(project.createAt.toDate()).calendar()}</div>
                     </div>
                  </div>
               </div>
               <div className="col s12 m5 offset-m1">
                  <User project={project} />
               </div>
            </div>
         </div>
      )
   } else {
      return (
         <div className="container center">
            <Spinner />
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
      id: ownProps.match.params.id,
      profile: state.firebase.profile,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      addToFavorites: (id) => dispatch(addToFavorites(id)),
      removeFromFavorites: (id) => dispatch(removeFromFavorites(id)),
   }
}



export default compose(
   connect(mapStateToProps, mapDispatchToProps),
   firestoreConnect([
      { collection: 'projects' }
   ])
)(ProjectDetails);