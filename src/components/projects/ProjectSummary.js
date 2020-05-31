import React from 'react';
import moment from 'moment';

const ProjectSummary = ({project}) => {
   return (

      <div className="card z-depth-0 project-summary">
         <div class="card">
        <div class="card-image">
          <img src={project.imgUrl} alt={project.title}/>
          <span class="card-title white-text text-darken-3">{project.title}</span>
        </div>
        <div class="card-content grey-text text-darken-3">
          <p>Posted by {project.authorFirstName} {project.lastName}</p>
        </div>
      </div>
      </div>
   )
}

export default ProjectSummary;