import { combineReducers } from 'redux';

import fields from './fields/reducer';
import user from './user/reducer';


const rootReducer = combineReducers({
  user,
  fields,
});

export default rootReducer;


// public selectors
