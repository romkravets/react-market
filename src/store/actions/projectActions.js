export const createProject = (project) => {
   return (dispatch, getState, { getFirebase, getFirestore }) => {
     
      // const project = {
      //    title: title,
      //    content: content,
      //    image: image,
      // }
      console.log(project, 'projectprojectprojectproject');
    //make async call db
   const firestore = getFirestore();
   const firebase = getFirebase();

   const profile = getState().firebase.profile;
   const authorId = getState().firebase.auth.uid;

    firestore.collection('projects').add({
      ...project,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createAt: new Date()
      }).then(() => {
         dispatch({ type: 'CREATE_PROJECT', project });
      }).catch((err) => {
         dispatch({type: 'CREATE_PROJECT_ERROR', err})
      })
   }
};