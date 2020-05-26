export const createProject = (project) => {
   return (dispatch, getState, { getFirebase, getFirestore }) => {
    //make async call db
   const firestore = getFirestore();
   const profile = getState().firebase.profile;
   const authorId = getState().firebase.auth.uid;
   console.log(authorId, 'authorId')

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