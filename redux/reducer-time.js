const INITIAL_STATE = {
  currentTime: null
  };
  
  const usertime = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'SET_CURRENT_TIME':
        return {
          ...state,
          currentTime: action.payload
        };
      default:
        return state;
    }
  };
  
  export default usertime;