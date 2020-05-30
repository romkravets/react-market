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
       });
     }).then(() => {
       dispatch({ type: 'SIGNUP_SUCCESS' });
     }).catch((err) => {
       dispatch({ type: 'SIGNUP_ERROR', err});
     });
   }
 }

 export const updateUserInfo = () => {
   return (dispatch, getState, {getFirebase, getFirestore}) => {
    const currentUser = firebase.auth().currentUser;
   //  .then(() => {
      // dispatch({ type: 'UPDATE_SUCCESS' });
      console.log('You are' , currentUser.uid);
      const uid = currentUser.uid;
      const userDate = {
         lastlogitTime: new Date(),
         // favoritsList: ['kKsFSkOdHKfJBr8hCMBf', 'WrIwkObWAgTlJonLnQEB', 'Qedua3XamHxkK8IqPG0j']
      };
      return firebase.firestore().doc(`users/${uid}`).set(userDate, {merge: true});
   //  });

   }
 }

 export const getFavorits = () => {
   return (dispatch, getState, {getFirebase, getFirestore}) => {
      const uid =  firebase.auth().currentUser.uid;
      const getFavoritsFunctions = firebase.functions().httpsCallable('getFavorites_v0');
      getFavoritsFunctions({uid: uid})
         .then((result) => {
         console.log(result);
         result.data.forEach(project => {
            const test = JSON.stringify(result);
            dispatch({ type: 'UPDATE_SUCCESS', test });
         })
      })
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