const INITIAL_STATE = {
    currentLocation: null
  };
  
  const userLocation = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'SET_CURRENT_LOCATION':
        return {
          ...state,
          currentLocation: action.payload
        };
      default:
        return state;
    }
  };
  
  export default userLocation;