export const createMessage = (message) => {
   return (dispatch, getState, { getFirebase, getFirestore }) => {

      console.log(message, 'message');
    //make async call db
   const firestore = getFirestore();

   const profile = getState().firebase.profile;
   const authorId = getState().firebase.auth.uid;

    firestore.collection('messages').add({
      ...message,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createAt: new Date()
      }).then(() => {
         dispatch({ type: 'CREATE_MESSAGE', message });
      }).catch((err) => {
         dispatch({type: 'CREATE_MESSAGE_ERROR', err})
      })
   }
};