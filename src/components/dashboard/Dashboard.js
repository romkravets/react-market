import React, {Component} from 'react';

import ProjectList from '../projects/ProjectList';
import Notifications from './Notification';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {Redirect} from 'react-router-dom';

import { connect } from 'react-redux';

class Dashboard extends Component {
   render() {
      //console.log(this.props);
      const { projects, auth } = this.props;

      if (!auth.uid) return <Redirect to='/signin'/>

      return (
         <div className="container dashboard">
            <div className="row">
               <div className="col s12 m6">
                  <ProjectList projects={projects}/>
               </div>
               <div className="col s12 m5 offset-m1">
                  <Notifications/>
               </div>
            </div>
         </div>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      projects: state.firestore.ordered.projects,
      auth: state.firebase.auth
   }
}

export default compose(
   connect(mapStateToProps),
   firestoreConnect([
      { collection: 'projects' }
   ])
)(Dashboard);