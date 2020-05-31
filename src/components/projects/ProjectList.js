import React from 'react';
import ProjectSummary from './ProjectSummary';
import { Link }  from 'react-router-dom';

const ProjectList = ({projects}) => {
   return (
      <div className="project-list section">
        {projects && projects.map( project => {
           return (
            <div class="col s12 m6">
              <Link to={'/project/' + project.id} key={project.id}>
               <ProjectSummary project={project}/>
              </Link>
            </div>
           )
        })}
      </div>
   )
}

export default ProjectList;