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
      data: [],
      loadData: false
   }

   componentDidMount() {
      this.props.updateUserInfo();
            const uid =  firebase.auth().currentUser.uid;
            const getFavoritsFunctions = firebase.functions().httpsCallable('getFavorites_v0');
            getFavoritsFunctions({uid: uid})
               .then((result) => {
                  this.setState({data: result});
                  this.setState({loadData: true});
            })
         }

   render() {
      const { profile } = this.props;
      let favorite = null;
      if (this.state.loadData === true && profile.favoritsList.length === 0) {
         console.log(this.state.data.data.length);
         favorite = <p>Favorite list is ampty</p>
         console.log('0');
      } else {
         favorite = ( this.state.data.data && this.state.data.data.map( project => {
            return (
               <Link to={'/project/' + project.id} key={project.id}>
                  <ProjectSummary  project={project}/>
               </Link>
            )
         })
         )
      }
       return (
         <div className="container project-list section">
            <div className="project-list section">
               {favorite}
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
      getFavorits: () => dispatch(getFavorits()),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteProject);