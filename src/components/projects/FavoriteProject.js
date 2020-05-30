import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';
import ProjectSummary from './ProjectSummary';
import { createProject } from '../../store/actions/projectActions';
import { updateUserInfo } from '../../store/actions/authActions';
import { getFavorits } from '../../store/actions/authActions';
// import { Redirect } from 'react-router-dom';
// import { storage } from '../../config/fb.config';
import firebase, { db } from '../../config/fb.config';

export class FavoriteProject extends Component {
   state = {
      data: []
   }

   componentDidMount() {
      this.props.updateUserInfo();
            //   const getFavorits = () => {
         // return (dispatch, getState, {getFirebase, getFirestore}) => {
            const uid =  firebase.auth().currentUser.uid;
            const getFavoritsFunctions = firebase.functions().httpsCallable('getFavorites_v0');
            getFavoritsFunctions({uid: uid})
               .then((result) => {
               console.log(result);
               // result.data.forEach(project => {
                  // const test = JSON.stringify(result);
                  this.setState({data: result})
                  console.log(this.state.data, 'data state')
                  // dispatch({ type: 'UPDATE_SUCCESS', test });
               // })
            })
         // }
      //  }
   }

   render() {
      const { profile } = this.props;
      // const { date } = this.state.data.data;
      console.log(this.state.data.data, 'state');

       return (
         <div className="container project-list section">
            <div className="project-list section">
            {this.state.data.data && this.state.data.data.map( project => {
                  console.log(project.title, 'project');
               return (
                  <Link to={'/project/' + project.id} key={project.id}>
                     <ProjectSummary  project={project}/>
                  </Link>
               )
            })}
            </div>
         </div>
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
      createProject: (project) => dispatch(createProject(project)),
      updateUserInfo: () => dispatch(updateUserInfo()),
      getFavorits: () => dispatch(getFavorits())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteProject);