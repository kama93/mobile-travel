const INITIAL_STATE = {
    currentDirection: null
  };
  
  const userDirection = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'SET_CURRENT_USER':
        return {
          ...state,
          currentDirection: action.payload
        };
      default:
        return state;
    }
  };
  
  export default userDirection;