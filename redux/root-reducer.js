import { combineReducers } from 'redux';

import userDirection from './reducer';
import userLocation from './reducer-location';
import userReducer from './reducer-user';
import userTime from './reducer-time'

const rootReducer = combineReducers({
  user: userReducer,
  direction: userDirection,
  location: userLocation,
  time: userTime
});

export default rootReducer;