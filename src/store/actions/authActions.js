import firebase, { db } from '../../config/fb.config';

export const signIn = (credentials) => {
   return ( dispatch, getState) => {

      firebase.auth().signInWithEmailAndPassword(
         credentials.email,
         credentials.password
      ).then(() => {
         dispatch({type: 'LOGIN_SUCCESS'});
      }).catch((err) => {
         dispatch({type: 'LOGIN_ERROR', err});
      });
   }
}

export const signOut = () => {
   return (dispatch, getState) => {

      firebase.auth().signOut().then(() => {
         dispatch({type: 'SIGNOUT_SUCCESS'})
      });
   }
}

export const signUp = (newUser) => {
   return (dispatch, getState, {getFirebase, getFirestore}) => {

     firebase.auth().createUserWithEmailAndPassword(
       newUser.email,
       newUser.password
     ).then(resp => {
       return db.collection('users').doc(resp.user.uid).set({
         firstName: newUser.firstName,
         lastName: newUser.lastName,
         initials: newUser.firstName[0] + newUser.lastName[0],
         uid: resp.user.uid
       });
     }).then(() => {
       dispatch({ type: 'SIGNUP_SUCCESS' });
     }).catch((err) => {
       dispatch({ type: 'SIGNUP_ERROR', err});
     });
   }
 }

 export const editProfile = (editUser) => {
   return (dispatch, getState, {getFirebase, getFirestore}) => {
    const currentUser = firebase.auth().currentUser;
      let userFavorits = [];
      // console.log('You are' , currentUser.uid);
      const uid = currentUser.uid;
      const userDate = {
         firstName: editUser.firstName,
         lastName: editUser.lastName,
         initials: editUser.firstName[0] + editUser.lastName[0],
      };
      const updatePromiss = firebase.firestore().doc(`users/${uid}`).set(userDate, {merge: true});
      const getPromiss = firebase.firestore().doc(`users/${uid}`).onSnapshot((doc) => {
         const userData = doc.data();
         if (userData.favoritsList) {
            userFavorits = userData.favoritsList;
         }
      });
      return Promise.all([updatePromiss, getPromiss]);
   }
 }


 export const updateUserInfo = () => {
   return (dispatch, getState, {getFirebase, getFirestore}) => {
    const currentUser = firebase.auth().currentUser;
    let userFavorits = [];
      console.log('You are' , currentUser.uid);
      const uid = currentUser.uid;
      const userDate = {lastlogitTime: new Date()};
      const updatePromiss = firebase.firestore().doc(`users/${uid}`).set(userDate, {merge: true});
      const getPromiss = firebase.firestore().doc(`users/${uid}`).onSnapshot((doc) => {
         const userData = doc.data();
         if (userData.favoritsList) {
            userFavorits = userData.favoritsList;
            console.log('You favorite are' + userFavorits);
         }
      });
      return Promise.all([updatePromiss, getPromiss]);
   }
 }

 export const addToFavorites = (projectId) => {
   return (dispatch, getState, {getFirebase, getFirestore}) => {
      const currUserId = firebase.auth().currentUser.uid;
      const userDoc = firebase.firestore().collection('users').doc(currUserId);
      console.log('Adding ' + projectId + ' to favorite');
      userDoc.update({
         favoritsList: firebase.firestore.FieldValue.arrayUnion(projectId)
      });
   }
 }


 export const removeFromFavorites = (projectId) => {
   return (dispatch, getState, {getFirebase, getFirestore}) => {
      const currUserId = firebase.auth().currentUser.uid;
      const userDoc = firebase.firestore().collection('users').doc(currUserId);
      console.log('Remove ' + projectId + ' to favorite');
      userDoc.update({
         favoritsList: firebase.firestore.FieldValue.arrayRemove(projectId)
      });
   }
 }