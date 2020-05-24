const initState = {
   projects: [
      {id: '1', title: 'fefea scas cwfwef', content: 'efewf wefwe fwefw'},
      {id: '2', title: 'fefeas cscwfwef', content: 'efe wfwes qwwgerht rjtyfwefwe fw'},
      {id: '3', title: 'fe fewf casca scwef', content: 'efewfwe rerefwe fwe fw'},
   ]
}

const projectReducer = (state = initState, action) => {
   switch (action.type) {
      case 'CREATE_PROJECT':
         //console.log('created project', action.project);
         return state;
      case 'CREATE_PROJECT_ERROR':
         console.log('create project error', action.err);
         return state;
      default:
         return state;
   }
}

export default projectReducer;