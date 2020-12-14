import { combineReducers } from 'redux';

import userDirection from './reducer';

const rootReducer = combineReducers({
  direction: userDirection
});

export default rootReducer;