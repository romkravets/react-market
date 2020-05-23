import React, {Component} from 'react';

import ProjectList from '../projects/ProjectList';
import Notifications from './Notification';

import { connect } from 'react-redux';

class Dashboard extends Component {
   render() {
      //console.log(this.props);
      const { projects } = this.props;
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
      projects: state.project.projects
   }
}

export default connect(mapStateToProps)(Dashboard);