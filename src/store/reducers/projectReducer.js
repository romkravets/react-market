const initState = {
   messages: [],
}

const chatReducer = (state = initState, action) => {
   switch (action.type) {
      case 'CREATE_MESSAGE':
         console.log('created project', action.message);
         return  state;
      case 'CREATE_MESSAGET_ERROR':
         console.log('create project error', action.err);
         return state;
      default:
         return state;
   }
}

export default chatReducer;