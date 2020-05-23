import React from 'react';

const ProjectDetails = (props) => {
   console.log(props);
   const id = props.match.params.id;
   return (
         <div className="container section project-details">
            <div className="card z-depth-0">
               <div className="card-content">
                  <span className="card-title">Product Title - {id}</span>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati sequi dolore odio, soluta pariatur voluptatum tempora corrupti non labore temporibus omnis placeat ipsum consequuntur velit repudiandae corporis eveniet error nihil?</p>
               </div>
               <div className="card-action gret lighten-4 grey-text">
                  <div>Ptosted user</div>
                  <div>02.12.2020</div>
               </div>
            </div>
         </div>
   )
}

export default ProjectDetails;