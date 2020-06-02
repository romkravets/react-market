import authReducer from './authReducer';
import projectReducer from './projectReducer';
import chatReducer from './chatReducer';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
   auth: authReducer,
   project: projectReducer,
   chat: chatReducer,
   firestore: firestoreReducer,
   firebase: firebaseReducer

})

export default rootReducer;