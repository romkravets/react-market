export const createProject = (project) => {
   return (dispatch, getState) => {
    //make async call db
    dispatch({type: 'CREATE_PROJECT', project });

   }
};