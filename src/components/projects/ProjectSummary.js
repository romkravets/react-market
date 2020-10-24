import React from 'react';
import moment from 'moment';

const ProjectSummary = ({project}) => {
   return (

      <div className="card z-depth-0 project-summary">
         <div className="card">
        <div className="card-image overlay">
          <img src={project.imgUrl} alt={project.title}/>
          <span className="card-title white-text text-darken-3">{project.title}</span>
        </div>
        <div className="card-content grey-text text-darken-3">
          <p>Posted by {project.authorFirstName} {project.lastName}</p>
        </div>
      </div>
      </div>
   )
}

export default ProjectSummary;