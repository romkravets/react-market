import React from 'react';
import moment from 'moment';

const ProjectSummary = ({project}) => {
   console.log(project);
   return (

      <div className="card z-depth-0 project-summary">
         <div class="card">
        <div class="card-image">
          <img src={project.imgUrl} alt={project.title}/>
          <span class="card-title white-text text-darken-3">{project.title}</span>
          <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons"></i></a>
        </div>
        <div class="card-content grey-text text-darken-3">
          <p>Posted by {project.authorFirstName} {project.lastName}</p>
          <p className="grey-text">{moment(project.createAt.toDate()).calendar()}</p>
        </div>
        {/* <div class="card-action">
          <a href="#">This is a link</a>
        </div> */}
      </div>
      </div>
   )
}

export default ProjectSummary;