import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';
import ProjectSummary from './ProjectSummary';
import { createProject } from '../../store/actions/projectActions';
import { updateUserInfo } from '../../store/actions/authActions';
import { getFavorits } from '../../store/actions/authActions';
import Spinner from "../UI/Spinner/Spinner";
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
      let favoriteAded = <Spinner />;
      if (this.state.loadData) {
         favoriteAded = ( this.state.data.data && this.state.data.data.map( project => {
            return (
               <div class="col s12 m4">
               <Link to={'/project/' + project.id} key={project.id}>
                  <ProjectSummary  project={project}/>
               </Link>
               </div>
               )
            })
            )
         }
         if (this.state.loadData && !this.state.data.data.length) {
            console.log(this.state.data.data.length);
            favoriteAded = <p>Favorite list is ampty</p>
         }
       return (
         <div className="container project-list section">
            <div className="project-list section">
            <div className="row">
               {/* <div className="col s4"> */}
                  {favoriteAded}
                {/* </div> */}
               </div>
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