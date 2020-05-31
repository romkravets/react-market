import React, {Component} from 'react';

import ProjectList from '../projects/ProjectList';
import Notifications from './Notification';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import Spinner from "../UI/Spinner/Spinner";

import { connect } from 'react-redux';

class Dashboard extends Component {
   render() {
      let projectsAdded = <Spinner />;
      const { projects, auth, notifications } = this.props;

      if (!auth.uid) return <Redirect to='/signin'/>

      return (
         <div className="container dashboard">
            <div className="row">
               <div className="col s12 m7">
                     <ProjectList projects={projects}/>
               </div>
               <div className="col s12 m4 offset-m1">
                  <Notifications notifications={notifications}/>
               </div>
            </div>
         </div>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      projects: state.firestore.ordered.projects,
      test: state.firestore,
      auth: state.firebase.auth,
      notifications: state.firestore.ordered.notifications
   }
}

export default compose(
   connect(mapStateToProps),
   firestoreConnect([
      { collection: 'projects', orderBy: ['createAt', 'desc'] },
      { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
   ])
)(Dashboard);