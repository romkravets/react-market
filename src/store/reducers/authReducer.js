const initState = {
   authError: null,
   userFavorits: []
}

const authReducer = (state = initState, action) => {
   switch (action.type) {
      case 'LOGIN_ERROR':
         console.log('login error');
         return {
            ...state,
            authError: 'Login failed'
         }
      case 'LOGIN_SUCCESS':
         console.log('login sucess');
         return {
            ...state,
            authError: null
         }
      case 'SIGNOUT_SUCCESS':
         console.log('signout successs');
         return state;
      case 'SIGNUP_SUCCESS':
         console.log('signup succes');
         return {
            ...state,
            authError: null
         }
      case 'SIGNUP_ERROR':
         console.log('signup error');
         return {
            ...state,
            authError: action.err.message
         }
      case 'UPDATE_SUCCESS':
         console.log('You are' + action.test);
         return {
            ...state
         }
      case 'EDIT_PROFILE_SUCCESS':
         console.log('You are' + action.state);
         return {
            ...state
         }
      case 'EDIT_PROFILE_ERROR':
         return {
            ...state,
            editError: action.error
         }
      default:
         return state;
   }
}

export default authReducer;