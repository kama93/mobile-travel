import { combineReducers } from 'redux';

import userDirection from './reducer';
import userLocation from './reducer-location';
import userReducer from './reducer-user';

const rootReducer = combineReducers({
  user: userReducer,
  direction: userDirection,
  location: userLocation
});

export default rootReducer;